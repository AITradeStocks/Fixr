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

// GET /admin/contractors — full contractor list
adminRouter.get("/admin/contractors", async (_req, res) => {
  const contractors = await prisma.contractor.findMany({
    orderBy: { createdAt: "desc" },
    include: { 
      jobs: { select: { id: true, status: true } },
      emails: true,
      phones: true
    },
  });
  res.json(contractors);
});

// GET /admin/contractors/:id — full contractor detail
adminRouter.get("/admin/contractors/:id", async (req, res) => {
  const contractor = await prisma.contractor.findUnique({
    where: { id: req.params.id },
    include: { 
      jobs: { orderBy: { createdAt: "desc" } },
      emails: true,
      phones: true
    },
  });
  if (!contractor) { res.status(404).json({ error: "contractor not found" }); return; }
  res.json(contractor);
});

// DELETE /admin/contractors/:id — remove contractor
adminRouter.delete("/admin/contractors/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    // Unlink jobs before deleting
    await prisma.job.updateMany({
      where: { contractorId: id },
      data: { contractorId: null, status: "priced" },
    });
    await prisma.contractor.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) { next(error); }
});
