import { Router } from "express";
import { prisma } from "../db/prisma.js";

export const leadsRouter = Router();

// POST /tradie-leads
leadsRouter.post("/tradie-leads", async (req, res, next) => {
  try {
    const lead = await prisma.contractorLead.create({
      data: {
        name: req.body.name,
        phone: req.body.phone,
        tradeType: req.body.tradeType,
        suburbOrZip: req.body.suburbOrZip,
        source: req.body.source || "direct",
        status: "new_lead",
        notes: req.body.notes,
      },
    });
    res.status(201).json(lead);
  } catch (error) { next(error); }
});

// GET /tradie-leads
leadsRouter.get("/tradie-leads", async (_req, res) => {
  const leads = await prisma.contractorLead.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(leads);
});

// PATCH /tradie-leads/:id
leadsRouter.patch("/tradie-leads/:id", async (req, res, next) => {
  try {
    const lead = await prisma.contractorLead.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(lead);
  } catch (error) { next(error); }
});

// POST /tradie-leads/:id/move — advance pipeline stage
leadsRouter.post("/tradie-leads/:id/move", async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const lead = await prisma.contractorLead.update({
      where: { id: req.params.id },
      data: { status, notes },
    });
    res.json(lead);
  } catch (error) { next(error); }
});
