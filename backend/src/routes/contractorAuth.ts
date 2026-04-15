import { Router } from "express";

import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.js";
import { signToken, requireAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const contractorAuthRouter = Router();

// POST /contractor/register — create professional account
contractorAuthRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, name, telephone, ...details } = req.body;

    if (!email || !password || !name || !telephone) {
      res.status(400).json({ error: "Email, password, name and telephone are required" });
      return;
    }

    const existing = await prisma.contractor.findFirst({ where: { email: email.toLowerCase() } });
    if (existing) {
      res.status(409).json({ error: "A professional account with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const contractor = await prisma.contractor.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name: name.trim(),
        telephone: telephone.trim(),
        trade: details.trade || "General",
        businessType: details.businessType || "Independent",
        zipCodes: details.zipCodes || [],
        status: "verified", // MVP: Auto-verify
        isVerified: true,
        isLicensed: details.isLicensed || true,
        insuranceUploaded: details.insuranceUploaded || true,
        ...details
      },
    });

    const token = signToken(contractor.id, contractor.email, "contractor");
    res.status(201).json({
      token,
      contractor: { id: contractor.id, email: contractor.email, name: contractor.name, trade: contractor.trade },
    });
  } catch (error) { next(error); }
});

// POST /contractor/login
contractorAuthRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and password required" });
      return;
    }

    const contractor = await prisma.contractor.findFirst({ where: { email: email.toLowerCase() } });
    if (!contractor) {
      res.status(401).json({ error: "No contractor account found with this email" });
      return;
    }

    const valid = await bcrypt.compare(password, contractor.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = signToken(contractor.id, contractor.email, "contractor");
    res.json({
      token,
      contractor: { id: contractor.id, email: contractor.email, name: contractor.name, trade: contractor.trade },
    });
  } catch (error) { next(error); }
});

contractorAuthRouter.get("/me", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    if (req.role !== "contractor") {
        res.status(403).json({ error: "Access denied" });
        return;
    }
    const contractor = await prisma.contractor.findUnique({
      where: { id: req.userId },
    });
    if (!contractor) { res.status(404).json({ error: "Contractor not found" }); return; }
    res.json(contractor);
  } catch (error) { next(error); }
});
contractorAuthRouter.patch("/me", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    if (req.role !== "contractor") {
      res.status(403).json({ error: "Access denied" });
      return;
    }
    const { password, ...details } = req.body;
    let updateData = { ...details };

    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.contractor.update({
      where: { id: req.userId },
      data: updateData,
    });
    res.json(updated);
  } catch (error) { next(error); }
});
