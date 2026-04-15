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

// PATCH /contractors/:id — update profile fields, status, etc.
contractorsRouter.patch("/contractors/:id", async (req, res, next) => {
  try {
    const allowedFields = [
      "name", "telephone", "email", "trade", "businessType", "zipCodes",
      "status", "rating", "insuranceUploaded", "isLicensed", "isVerified",
      "headline", "location", "website", "owner", "abn", "licenses",
      "postcode", "about", "logo_url", "address"
    ];
    const data: Record<string, unknown> = {};
    for (const key of allowedFields) {
      if (key in req.body) data[key] = req.body[key];
    }
    const contractor = await prisma.contractor.update({
      where: { id: req.params.id },
      data,
    });
    res.json(contractor);
  } catch (error) { next(error); }
});
