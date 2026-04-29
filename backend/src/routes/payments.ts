import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { createCheckoutSession, verifyPayment } from "../services/payment.service.js";

export const paymentsRouter = Router();

paymentsRouter.post("/create-checkout-session", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { jobId } = req.body;
    if (!jobId) return res.status(400).json({ error: "jobId is required" });
    
    const session = await createCheckoutSession(jobId, req.userId!);
    res.json({ id: session.id, url: session.url });
  } catch (err) {
    next(err);
  }
});

paymentsRouter.get("/verify", requireAuth, async (req: AuthRequest, res, next) => {
  try {
    const { sessionId } = req.query;
    if (!sessionId) return res.status(400).json({ error: "sessionId is required" });
    
    const success = await verifyPayment(sessionId as string);
    res.json({ success });
  } catch (err) {
    next(err);
  }
});
