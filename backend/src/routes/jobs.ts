import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { autoAssignJob } from "../services/assignment.service.js";
import { createJob, updateJobStatus } from "../services/jobs.service.js";
import { requireAuth, optionalAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const jobsRouter = Router();

// Helper to mask contractor details for customer view
function maskContractor(contractor: any) {
  if (!contractor) return null;
  const allowedFields = [
    "id", "name", "trade", "businessType", "zipCodes",
    "status", "rating", "insuranceUploaded", "isLicensed", "isVerified",
    "headline", "location", "website", "owner", "abn", "licenses",
    "postcode", "about", "logo_url", "address"
  ];
  return Object.fromEntries(
    Object.entries(contractor).filter(([key]) => allowedFields.includes(key))
  );
}

// POST /jobs — create job (authenticated customer, links userId)
jobsRouter.post("/jobs", optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const job = await createJob(req.body, req.userId);
    const result = await autoAssignJob(job.id);
    res.status(201).json(result ?? job);
  } catch (error) { next(error); }
});

// GET /jobs/mine — only the logged-in customer's own jobs
jobsRouter.get("/jobs/mine", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      include: { contractor: true, reviews: true },
    });
    
    // Mask contractor details for customer
    const maskedJobs = jobs.map(job => ({
      ...job,
      contractor: maskContractor(job.contractor)
    }));

    res.json(maskedJobs);
  } catch (error) { next(error); }
});

// GET /jobs — all jobs (admin/contractor use; supports postcode filtering)
jobsRouter.get("/jobs", async (req, res) => {
  const { postcode } = req.query;
  const where: any = {};
  
  if (postcode) {
    where.postcode = postcode;
  }

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { contractor: true, reviews: true },
  });
  res.json(jobs);
});

// GET /jobs/:id
jobsRouter.get("/jobs/:id", async (req, res) => {
  const job = await prisma.job.findUnique({
    where: { id: req.params.id },
    include: { contractor: true, reviews: true, user: { select: { id: true, name: true, email: true, phone: true } } },
  });
  if (!job) { res.status(404).json({ error: "job not found" }); return; }
  
  // Mask if it's the customer's own job or a public view
  const maskedJob = {
    ...job,
    contractor: maskContractor(job.contractor)
  };

  res.json(maskedJob);
});

// PATCH /jobs/:id/status
jobsRouter.patch("/jobs/:id/status", async (req, res, next) => {
  try {
    const job = await updateJobStatus(req.params.id, req.body.status);
    res.json(job);
  } catch (error) { next(error); }
});

// POST /jobs/:id/assign
jobsRouter.post("/jobs/:id/assign", async (req, res, next) => {
  try {
    const job = await autoAssignJob(req.params.id);
    res.json(job);
  } catch (error) { next(error); }
});

// POST /jobs/:id/accept — contractor accepts (atomic first-wins)
jobsRouter.post("/jobs/:id/accept", async (req, res, next) => {
  try {
    const { contractorId } = req.body;
    if (!contractorId) { res.status(400).json({ error: "contractorId required" }); return; }

    const updated = await prisma.job.updateMany({
      where: {
        id: req.params.id,
        status: { in: ["priced", "assigned", "manual_dispatch_required"] },
        contractorId: null,
      },
      data: { contractorId, status: "awaiting_customer_confirmation" },
    });

    if (updated.count === 0) {
      res.status(409).json({ error: "job already taken by another contractor" });
      return;
    }

    const result = await prisma.job.findUnique({
      where: { id: req.params.id },
      include: { contractor: true },
    });

    if (result) {
      result.contractor = maskContractor(result.contractor) as any;
    }

    res.json(result);
  } catch (error) { next(error); }
});

// POST /jobs/:id/complete — contractor marks done
jobsRouter.post("/jobs/:id/complete", async (req, res, next) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) { res.status(404).json({ error: "job not found" }); return; }
    if (!["assigned", "awaiting_customer_confirmation"].includes(job.status)) {
      res.status(400).json({ error: `cannot complete job in status: ${job.status}` });
      return;
    }
    res.json(await prisma.job.update({ where: { id: req.params.id }, data: { status: "completed" } }));
  } catch (error) { next(error); }
});

// POST /jobs/:id/confirm-completion — customer confirms
jobsRouter.post("/jobs/:id/confirm-completion", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (!job) { res.status(404).json({ error: "job not found" }); return; }
    if (job.status !== "completed") {
      res.status(400).json({ error: `cannot confirm job in status: ${job.status}` });
      return;
    }
    // Only the job owner can confirm (if userId is set)
    if (job.userId && job.userId !== req.userId) {
      res.status(403).json({ error: "not your job" });
      return;
    }
    res.json(await prisma.job.update({ where: { id: req.params.id }, data: { status: "reviewed" } }));
  } catch (error) { next(error); }
});

// POST /jobs/:id/review — submit rating + update contractor avg
jobsRouter.post("/jobs/:id/review", optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const jobId = req.params.id;
    const { rating, comment } = req.body;

    if (!rating) {
      res.status(400).json({ error: "Rating is required" });
      return;
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: { contractor: true }
    });

    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    if (!job.contractorId) {
      res.status(400).json({ error: "Cannot review a job without an assigned contractor" });
      return;
    }

    // Use job owner (User) as customerId. Falls back to authenticated requester if available.
    const customerId = job.userId || req.userId;
    if (!customerId) {
      res.status(403).json({ error: "Customer association required for review" });
      return;
    }

    // Upsert review to prevent duplicates (since jobId is now unique)
    const review = await prisma.review.upsert({
      where: { jobId },
      update: { rating, comment, customerId, contractorId: job.contractorId },
      create: { 
        jobId, 
        rating, 
        comment, 
        customerId, 
        contractorId: job.contractorId 
      },
    });

    // Mark job as reviewed
    await prisma.job.update({ where: { id: jobId }, data: { status: "reviewed" } });

    // Recalculate contractor average rating
    const reviews = await prisma.review.findMany({ 
      where: { contractorId: job.contractorId } 
    });

    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await prisma.contractor.update({
        where: { id: job.contractorId },
        data: { rating: Math.round(avg * 10) / 10 },
      });
    }

    res.status(201).json(review);
  } catch (error) { next(error); }
});

