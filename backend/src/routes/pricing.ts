import { Router } from "express";
import { estimatePricing, logPricingEvent } from "../services/pricing.service.js";
import { assertNonEmptyString, assertUrgency } from "../lib/validators.js";

export const pricingRouter = Router();

pricingRouter.post("/pricing/estimate", async (req, res, next) => {
  try {
    const { description, location, urgency } = req.body;
    assertNonEmptyString(description, "description");
    assertNonEmptyString(location, "location");
    assertUrgency(urgency);

    const result = await estimatePricing({ description, location, urgency });

    // Log every estimate — even those that don't become jobs
    // jobId is null until/unless customer books
    await logPricingEvent(result, { description, location, urgency });

    res.json(result);
  } catch (error) {
    next(error);
  }
});
