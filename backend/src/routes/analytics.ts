import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { requireAuth, AuthRequest } from "../middleware/auth.middleware.js";

export const analyticsRouter = Router();

analyticsRouter.get("/analytics/user", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const userId = req.userId;
    const jobs = await prisma.job.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });

    if (jobs.length === 0) {
      return res.json({
        totalInvestment: 0,
        avgResolutionTime: 0,
        prosDispatched: 0,
        facilityUpTime: 100,
        categoryMix: [],
        investmentHistory: []
      });
    }

    const reviewedJobs = jobs.filter(j => j.status === 'reviewed');
    
    // 1. Total Investment
    const totalInvestment = jobs.reduce((sum, j) => sum + j.quotedPrice, 0);

    // 2. Avg Resolution Time (in hours)
    let avgResolutionTime = 0;
    if (reviewedJobs.length > 0) {
      const totalTime = reviewedJobs.reduce((sum, j) => {
        return sum + (j.updatedAt.getTime() - j.createdAt.getTime());
      }, 0);
      avgResolutionTime = Math.round((totalTime / reviewedJobs.length) / 3600000 * 10) / 10;
    }

    // 3. Pros Dispatched
    const prosDispatched = new Set(jobs.map(j => j.contractorId).filter(Boolean)).size;

    // 4. Category Mix
    const catMap: Record<string, number> = {};
    jobs.forEach(j => {
      const cat = j.category.charAt(0).toUpperCase() + j.category.slice(1);
      catMap[cat] = (catMap[cat] || 0) + 1;
    });
    const categoryMix = Object.entries(catMap).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / jobs.length) * 100)
    })).sort((a, b) => b.count - a.count);

    // 5. Investment History (last 6 months)
    const history: { month: string, amount: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthName = d.toLocaleString('en-US', { month: 'short' });
        const monthJobs = jobs.filter(j => 
            j.createdAt.getMonth() === d.getMonth() && 
            j.createdAt.getFullYear() === d.getFullYear()
        );
        const amount = monthJobs.reduce((sum, j) => sum + j.quotedPrice, 0);
        history.push({ month: monthName, amount });
    }

    res.json({
      totalInvestment,
      avgResolutionTime,
      prosDispatched,
      facilityUpTime: 99.8,
      categoryMix,
      investmentHistory: history
    });
  } catch (error) { next(error); }
});

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
      needsFirstJob: needsFirstJob.map(c => ({ id: c.id, name: c.name, trade: c.trade, telephone: c.telephone, joinedAt: c.createdAt })),
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
