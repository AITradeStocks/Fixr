import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { adminRouter } from "./routes/admin.js";
import { analyticsRouter } from "./routes/analytics.js";
import { authRouter } from "./routes/auth.js";
import { contractorAuthRouter } from "./routes/contractorAuth.js";
import { contractorsRouter } from "./routes/contractors.js";
import { healthRouter } from "./routes/health.js";
import { jobsRouter } from "./routes/jobs.js";
import { leadsRouter } from "./routes/leads.js";
import { pricingRouter } from "./routes/pricing.js";
import { HttpError } from "./lib/errors.js";

dotenv.config();

export function createApp() {
  const app = express();
  app.use(cors({ origin: process.env.FRONTEND_URL || true }));
  app.use(express.json());


  app.use("/api", healthRouter);
  app.use("/api/auth", authRouter);       // NEW: customer auth
  app.use("/api/contractor", contractorAuthRouter); // NEW: contractor auth
  app.use("/api", pricingRouter);
  app.use("/api", jobsRouter);
  app.use("/api", contractorsRouter);
  app.use("/api", adminRouter);
  app.use("/api", analyticsRouter);
  app.use("/api", leadsRouter);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
      return;
    }
    console.error(error);
    res.status(500).json({ error: "internal_server_error" });
  });

  return app;
}
