import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const analyticsRouter = Router();

analyticsRouter.get("/analytics/supply", async (_req, res, next) => {
  try {
    const [totalLeads, onboarded, activated, retained, allContractors] = await Promise.all([
      prisma.contractorLead.count(),
      prisma.contractor.count({ where: { status: "onboarded" } }),
      prisma.contractor.count({ where: { status: "activated" } }),
      prisma.contractor.count({ where: { status: "retained" } }),
      prisma.contractor.findMany({ orderBy: { createdAt: "desc" } }),
    ]);
    const totalJobs = await prisma.job.count();
    const completedJobs = await prisma.job.count({ where: { status: { in: ["completed", "reviewed"] } } });
    const pendingJobs = await prisma.job.count({ where: { status: { in: ["priced", "manual_dispatch_required"] } } });

    // 48h ops alert: activated contractors with zero jobs in last 48h
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
    const activatedContractors = await prisma.contractor.findMany({ where: { status: "activated" } });
    const needsFirstJob: typeof activatedContractors = [];
    for (const c of activatedContractors) {
      const jobCount = await prisma.job.count({ where: { contractorId: c.id } });
      if (jobCount === 0 && c.createdAt < cutoff) {
        needsFirstJob.push(c);
      }
    }

    res.json({
      totalLeads, onboarded, activated, retained,
      totalContractors: allContractors.length,
      contractors: allContractors,
      jobs: { total: totalJobs, completed: completedJobs, pending: pendingJobs },
      fillRate: totalJobs > 0 ? Math.round((completedJobs / totalJobs) * 100) : 0,
      needsFirstJob: needsFirstJob.map(c => ({ id: c.id, name: c.name, trade: c.trade, phone: c.phone, joinedAt: c.createdAt })),
    });
  } catch (error) { next(error); }
});

analyticsRouter.get("/analytics/funnel", async (_req, res, next) => {
  try {
    const [priced, assigned, inProgress, completed, reviewed, cancelled, pricingEvents, totalUsers] = await Promise.all([
      prisma.job.count({ where: { status: "priced" } }),
      prisma.job.count({ where: { status: "assigned" } }),
      prisma.job.count({ where: { status: "awaiting_customer_confirmation" } }),
      prisma.job.count({ where: { status: "completed" } }),
      prisma.job.count({ where: { status: "reviewed" } }),
      prisma.job.count({ where: { status: "cancelled" } }),
      prisma.pricingEvent.count(),
      prisma.user.count(),
    ]);
    res.json({
      totalUsers,
      stages: [
        { label: "Estimates", count: pricingEvents },
        { label: "Jobs created", count: priced + assigned + inProgress + completed + reviewed + cancelled },
        { label: "Assigned", count: assigned + inProgress + completed + reviewed },
        { label: "In progress", count: inProgress + completed + reviewed },
        { label: "Completed", count: completed + reviewed },
        { label: "Reviewed", count: reviewed },
      ],
      cancelled,
    });
  } catch (error) { next(error); }
});

analyticsRouter.get("/analytics/retention", async (_req, res, next) => {
  try {
    const contractors = await prisma.contractor.findMany({
      include: { jobs: { select: { id: true, status: true, createdAt: true } } },
      orderBy: { createdAt: "desc" },
    });

    // Retention cohorts: week 1, week 2, week 4
    const now = Date.now();
    const data = contractors.map(c => {
      const joinedMs = c.createdAt.getTime();
      const daysSinceJoin = Math.floor((now - joinedMs) / 86400000);
      const completedJobs = c.jobs.filter(j => ["completed", "reviewed"].includes(j.status)).length;
      const week1Jobs = c.jobs.filter(j => j.createdAt.getTime() - joinedMs < 7 * 86400000).length;
      const week4Jobs = c.jobs.filter(j => j.createdAt.getTime() - joinedMs < 28 * 86400000).length;
      return {
        id: c.id, name: c.name, status: c.status, trade: c.trade,
        totalJobs: c.jobs.length, completedJobs,
        week1Jobs, week4Jobs, daysSinceJoin,
        rating: c.rating, joinedAt: c.createdAt,
        hasJobIn48h: c.jobs.some(j => j.createdAt.getTime() - joinedMs < 48 * 3600000),
      };
    });
    res.json(data);
  } catch (error) { next(error); }
});
