import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const adminRouter = Router();

// GET /admin/jobs — full job list with contractor
adminRouter.get("/admin/jobs", async (_req, res) => {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    include: { contractor: true, reviews: true },
  });
  res.json(jobs);
});

// POST /admin/assign-tradie — manual assignment, logs admin action
adminRouter.post("/admin/assign-tradie", async (req, res) => {
  const { jobId, contractorId } = req.body;
  const current = await prisma.job.findUnique({ where: { id: jobId } });

  const job = await prisma.job.update({
    where: { id: jobId },
    data: { contractorId, status: "awaiting_customer_confirmation" },
    include: { contractor: true },
  });

  await prisma.adminAction.create({
    data: {
      jobId,
      actionType: "manual-assign",
      previousStatus: current?.status,
      newStatus: "awaiting_customer_confirmation",
      note: `Manually assigned contractor ${contractorId}`,
    },
  });

  res.json(job);
});

// POST /admin/update-status — force status update with audit log
adminRouter.post("/admin/update-status", async (req, res) => {
  const { jobId, status, note } = req.body;
  const current = await prisma.job.findUnique({ where: { id: jobId } });

  const job = await prisma.job.update({
    where: { id: jobId },
    data: { status },
  });

  await prisma.adminAction.create({
    data: {
      jobId,
      actionType: "force-status",
      previousStatus: current?.status,
      newStatus: status,
      note: note || `Admin forced status to ${status}`,
    },
  });

  res.json(job);
});

// POST /admin/unstick — reset manual_dispatch_required -> priced
adminRouter.post("/admin/unstick", async (_req, res) => {
  const updated = await prisma.job.updateMany({
    where: { status: "manual_dispatch_required" },
    data: { status: "priced" },
  });
  res.json({ unstuck: updated.count });
});

// GET /admin/actions — audit log
adminRouter.get("/admin/actions", async (_req, res) => {
  const actions = await prisma.adminAction.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  res.json(actions);
});

// GET /admin/pricing-events — all pricing data
adminRouter.get("/admin/pricing-events", async (_req, res) => {
  const events = await prisma.pricingEvent.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  res.json(events);
});
