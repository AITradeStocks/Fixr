import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { autoAssignJob } from "../services/assignment.service.js";
import { createJob, updateJobStatus } from "../services/jobs.service.js";
import { requireAuth, optionalAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const jobsRouter = Router();

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
    res.json(jobs);
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
  res.json(job);
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
jobsRouter.post("/jobs/:id/review", async (req, res, next) => {
  try {
    const review = await prisma.review.create({
      data: { jobId: req.params.id, rating: req.body.rating, comment: req.body.comment },
    });
    await prisma.job.update({ where: { id: req.params.id }, data: { status: "reviewed" } });
    const job = await prisma.job.findUnique({ where: { id: req.params.id } });
    if (job?.contractorId) {
      const reviews = await prisma.review.findMany({ where: { job: { contractorId: job.contractorId } } });
      const avg = reviews.reduce((s: number, r: any) => s + r.rating, 0) / reviews.length;
      await prisma.contractor.update({
        where: { id: job.contractorId },
        data: { rating: Math.round(avg * 10) / 10 },
      });
    }
    res.status(201).json(review);
  } catch (error) { next(error); }
});
