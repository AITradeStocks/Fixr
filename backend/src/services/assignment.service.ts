import { prisma } from "../db/prisma.js";

export async function autoAssignJob(jobId: string) {
  const job = await prisma.job.findUnique({ where: { id: jobId } });
  if (!job) return null;

  // Always set to "priced" — all contractors race to accept
  // No hard-assign. If no contractors exist at all, mark manual.
  const anyContractor = await prisma.contractor.findFirst({ where: { status: "activated" } });

  if (!anyContractor) {
    return prisma.job.update({
      where: { id: jobId },
      data: { status: "manual_dispatch_required" }
    });
  }

  return prisma.job.update({
    where: { id: jobId },
    data: { status: "priced" },
    include: { contractor: true }
  });
}
