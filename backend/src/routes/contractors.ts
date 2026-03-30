import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { createContractor, listContractors } from "../services/contractors.service.js";

export const contractorsRouter = Router();

contractorsRouter.post("/contractors", async (req, res, next) => {
  try {
    const contractor = await createContractor(req.body);
    res.status(201).json(contractor);
  } catch (error) { next(error); }
});

contractorsRouter.get("/contractors", async (_req, res) => {
  const contractors = await listContractors();
  res.json(contractors);
});

contractorsRouter.get("/contractors/:id", async (req, res) => {
  const contractor = await prisma.contractor.findUnique({
    where: { id: req.params.id },
  });
  if (!contractor) { res.status(404).json({ error: "contractor not found" }); return; }
  res.json(contractor);
});

// PATCH /contractors/:id — update status (activate, retain, etc.)
contractorsRouter.patch("/contractors/:id", async (req, res, next) => {
  try {
    const contractor = await prisma.contractor.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(contractor);
  } catch (error) { next(error); }
});
