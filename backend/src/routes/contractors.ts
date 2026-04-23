import { Router } from "express";
import { prisma } from "../db/prisma.js";
import { createContractor, listContractors } from "../services/contractors.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";

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
      "name", "trade", "businessType", "zipCodes",
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

// POST /contractors/:id/verify-email/:emailId — admin force verify email
contractorsRouter.post("/contractors/:id/verify-email/:emailId", requireAuth, async (req, res, next) => {
  try {
    // Only admins should do this
    if ((req as any).role !== "admin") return res.status(403).json({ error: "Admin access required" });

    await prisma.contractorEmail.update({
      where: { id: req.params.emailId },
      data: { isVerified: true }
    });
    // Check if total contact should be marked verified
    await prisma.contractor.update({
      where: { id: req.params.id },
      data: { isContactVerified: true }
    });
    res.json({ success: true });
  } catch (error) { next(error); }
});

// POST /contractors/:id/verify-phone/:phoneId — admin force verify phone
contractorsRouter.post("/contractors/:id/verify-phone/:phoneId", requireAuth, async (req, res, next) => {
  try {
    // Only admins should do this
    if ((req as any).role !== "admin") return res.status(403).json({ error: "Admin access required" });

    await prisma.contractorPhone.update({
      where: { id: req.params.phoneId },
      data: { isVerified: true }
    });
    // Check if total contact should be marked verified
    await prisma.contractor.update({
      where: { id: req.params.id },
      data: { isContactVerified: true }
    });
    res.json({ success: true });
  } catch (error) { next(error); }
});
