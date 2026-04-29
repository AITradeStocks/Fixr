import { prisma } from "../db/prisma.js";
import { HttpError } from "../lib/errors.js";
import { assertValidTransition } from "../lib/state-machine.js";
import { estimatePricing, logPricingEvent } from "./pricing.service.js";

export async function createJob(
  input: { description: string; location: string; address?: string; postcode?: string; urgency: "urgent now" | "today" | "flexible"; customerLocation?: any },
  userId?: string
) {
  const estimate = await estimatePricing(input);

  const job = await prisma.job.create({
    data: {
      description: input.description,
      location: input.location,
      address: input.address,
      postcode: input.postcode,
      urgency: input.urgency,
      customerLocation: input.customerLocation || null,
      category: estimate.category,
      problemType: estimate.problemType,
      severity: estimate.severity,
      estimatedTimeMinutes: estimate.estimatedTimeMinutes,
      partsRequired: estimate.partsRequired,
      quotedPrice: estimate.price,
      serviceCharge: estimate.price,
      quotedPriceMin: estimate.priceRange[0],
      quotedPriceMax: estimate.priceRange[1],
      confidence: estimate.confidence,
      status: "priced",
      userId: userId ?? null,

    },
  });

  await logPricingEvent(estimate, input, job.id, userId);
  return job;
}

export async function updateJobStatus(jobId: string, nextStatus: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) throw new HttpError(404, "job not found");
  assertValidTransition(job.status, nextStatus);
  return prisma.job.update({ where: { id: jobId }, data: { status: nextStatus } });
}
