import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma.js";
import { signToken, requireAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";

export const authRouter = Router();

// POST /auth/register — create customer account
authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ error: "email, password and name are required" });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ error: "password must be at least 6 characters" });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      res.status(409).json({ error: "An account with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        passwordHash,
        name: name.trim(),
        phone: phone?.trim() || null,
      },
    });

    const token = signToken(user.id, user.email);
    res.status(201).json({
      token,
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone, cookieConsent: user.cookieConsent },
    });
  } catch (error) { next(error); }
});

// POST /auth/login — email + password login
authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "email and password required" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) {
      res.status(401).json({ error: "No account found with this email" });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Incorrect password" });
      return;
    }

    const token = signToken(user.id, user.email);
    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name, phone: user.phone, cookieConsent: user.cookieConsent },
    });
  } catch (error) { next(error); }
});

// GET /auth/me — verify token + return user profile
authRouter.get("/me", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, phone: true, createdAt: true, cookieConsent: true },
    });
    if (!user) { res.status(404).json({ error: "user not found" }); return; }
    res.json(user);
  } catch (error) { next(error); }
});

// POST /auth/cookie-consent — save cookie consent preferences in database for authenticated User or Contractor
authRouter.post("/cookie-consent", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { consent } = req.body;
    if (!consent) {
      res.status(400).json({ error: "Consent details are required" });
      return;
    }

    if (req.role === "contractor") {
      const updated = await prisma.contractor.update({
        where: { id: req.userId },
        data: { cookieConsent: consent },
      });
      res.json({ success: true, role: "contractor", consent: updated.cookieConsent });
    } else {
      const updated = await prisma.user.update({
        where: { id: req.userId },
        data: { cookieConsent: consent },
      });
      res.json({ success: true, role: "customer", consent: updated.cookieConsent });
    }
  } catch (error) { next(error); }
});
