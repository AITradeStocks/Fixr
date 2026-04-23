import { Router } from "express";

import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.js";
import { signToken, requireAuth, optionalAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { sendVerificationEmail } from "../lib/email.js";
import crypto from "crypto";

export const contractorAuthRouter = Router();

// POST /contractor/register — create professional account
contractorAuthRouter.post("/register", async (req, res, next) => {
  try {
    const { emails, phones, password, name, trade, businessType, zipCodes, ...otherDetails } = req.body;

    // Support legacy and multi-contact registration
    const emailList = Array.isArray(emails) ? emails : [{ email: req.body.email, type: "Personal", isVerified: false }];
    const phoneList = Array.isArray(phones) ? phones : (req.body.telephone ? [{ number: req.body.telephone, type: "Personal", isVerified: false }] : []);

    if (!emailList[0]?.email || !password || !name) {
      res.status(400).json({ error: "Email, password, and name are required" });
      return;
    }

    const primaryEmail = emailList[0].email.toLowerCase().trim();
    const existing = await prisma.contractorEmail.findUnique({ where: { email: primaryEmail } });
    if (existing) {
      res.status(409).json({ error: "A professional account with this email already exists" });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const contractor = await prisma.contractor.create({
      data: {
        passwordHash,
        name: name.trim(),
        trade: trade || "General",
        businessType: businessType || "Independent",
        zipCodes: Array.isArray(zipCodes) ? zipCodes : (zipCodes ? zipCodes.split(",").map((s: string) => s.trim()) : []),
        status: "onboarded",
        isVerified: false,
        isLicensed: !!otherDetails.isLicensed,
        insuranceUploaded: !!otherDetails.insuranceUploaded,
        isContactVerified: emailList.some((e: any) => e.isVerified) || (phoneList && phoneList.some((p: any) => p.isVerified)),
        
        // Profile mapping
        headline: otherDetails.headline || null,
        location: otherDetails.location || null,
        website: otherDetails.website || null,
        about: otherDetails.about || null,
        owner: otherDetails.owner || null,
        abn: otherDetails.abn || null,
        postcode: otherDetails.postcode || null,
        logo_url: otherDetails.logo_url || null,
        address: otherDetails.address || null,
        licenses: Array.isArray(otherDetails.licenses) ? otherDetails.licenses : (otherDetails.licenses ? [otherDetails.licenses] : []),

        emails: {
          create: emailList.map((e: any) => ({
            email: e.email.toLowerCase().trim(),
            type: e.type || "Personal",
            isVerified: !!e.isVerified
          }))
        },
        phones: {
          create: phoneList.map((p: any) => ({
            number: p.number.trim(),
            type: p.type || "Personal",
            isVerified: !!p.isVerified
          }))
        },
      },
    });

    const token = signToken(contractor.id, primaryEmail, "contractor");
    res.status(201).json({
      token,
      contractor: { id: contractor.id, email: primaryEmail, name: contractor.name, trade: contractor.trade },
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

    const contactEmail = await prisma.contractorEmail.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: { contractor: true }
    });

    if (!contactEmail || !contactEmail.contractor) {
      res.status(401).json({ error: "No contractor account found with this email" });
      return;
    }

    const contractor = contactEmail.contractor;
    const valid = await bcrypt.compare(password, contractor.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = signToken(contractor.id, contactEmail.email, "contractor");
    
    // Fetch full contact list for the response
    const fullContractor = await prisma.contractor.findUnique({
      where: { id: contractor.id },
      include: { emails: true, phones: true }
    });

    res.json({
      token,
      contractor: fullContractor,
    });
  } catch (error) { next(error); }
});

// POST /contractor/verify/request — Send real OTP (Unauthenticated for onboarding)
contractorAuthRouter.post("/verify/request", optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { type, target } = req.body; // type: 'email' | 'phone', target: email address or phone number
    
    if (!target) {
      res.status(400).json({ error: "Verification target is required" });
      return;
    }

    // Generate 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

    // Store in DB (upsert-like behavior: delete old codes for this target if they exist to keep it clean)
    await prisma.verificationCode.deleteMany({ where: { target } });
    await prisma.verificationCode.create({
      data: { target, code, type, expiresAt }
    });

    if (type === "email") {
      await sendVerificationEmail(target, code);
    } else {
      // SMS logic would go here if needed, but for now we focus on email as requested
      console.log(`[Mock SMS] Sending code ${code} to ${target}`);
    }

    res.json({ success: true, message: "Verification code sent" });
  } catch (error) { next(error); }
});

// POST /contractor/verify/submit — Verify real OTP (Unauthenticated for onboarding)
contractorAuthRouter.post("/verify/submit", optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const { type, id, code, target } = req.body; // type, contact item id (optional), the code, and the target address/number
    
    if (!code || !target) {
      res.status(400).json({ error: "Code and target are required" });
      return;
    }

    // Find the code in DB
    const verification = await prisma.verificationCode.findFirst({
      where: { target, code, type }
    });

    if (!verification) {
      res.status(400).json({ error: "Invalid verification code" });
      return;
    }

    if (new Date() > verification.expiresAt) {
      res.status(400).json({ error: "Verification code has expired" });
      return;
    }

    // If id is provided, mark as verified in the respective table (for already registered contractors)
    if (id) {
        if (type === "email") {
        await prisma.contractorEmail.update({ where: { id }, data: { isVerified: true } });
        } else {
        await prisma.contractorPhone.update({ where: { id }, data: { isVerified: true } });
        }
    }

    // Delete the used code
    await prisma.verificationCode.delete({ where: { id: verification.id } });

    // Update main contractor flag if we have a session
    if (req.userId) {
      await prisma.contractor.update({
          where: { id: req.userId },
          data: { isContactVerified: true }
      });
    }

    res.json({ success: true, message: "Contact verified successfully" });
  } catch (error) { next(error); }
});

contractorAuthRouter.get("/me", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    if (req.role !== "contractor") {
        res.status(403).json({ error: "Access denied" });
        return;
    }
    if (!req.userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }
    const contractor = await prisma.contractor.findUnique({
      where: { id: req.userId },
      include: { emails: true, phones: true }
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

    const allowedFields = [
      "name", "trade", "businessType", "headline", "location", 
      "website", "about", "owner", "abn", "postcode", 
      "logo_url", "address", "isLicensed", "insuranceUploaded"
    ];

    const updateData: any = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    if (req.body.password) {
      updateData.passwordHash = await bcrypt.hash(req.body.password, 10);
    }
    
    // Convert arrays if needed
    if (req.body.zipCodes) {
      updateData.zipCodes = Array.isArray(req.body.zipCodes) ? req.body.zipCodes : req.body.zipCodes.split(",").map((s: any) => s.trim());
    }
    if (req.body.licenses) {
      updateData.licenses = Array.isArray(req.body.licenses) ? req.body.licenses : [req.body.licenses];
    }

    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const updated = await prisma.contractor.update({
      where: { id: req.userId },
      data: updateData,
      include: { emails: true, phones: true }
    });
    res.json(updated);
  } catch (error) { next(error); }
});


