import { prisma } from "../db/prisma.js";
import { parseJob } from "./parser.service.js";

export interface PricingRequest {
  description: string;
  location: string;
  postcode?: string;
  urgency: "urgent now" | "today" | "flexible";
}

export interface PricingResult {
  category: string;
  problemType: string;
  severity: string;
  estimatedTimeMinutes: number;
  partsRequired: boolean;
  price: number;
  priceRange: [number, number];
  confidence: string;
  modelVersion: string;
  features: Record<string, unknown>;
}

async function parseWithAI(description: string): Promise<Awaited<ReturnType<typeof parseJob>> | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  try {
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0,
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content: `You are a home services job parser. Given a job description, return ONLY valid JSON:
{"category":"plumbing|electrical|handyman|general|hvac|carpentry|painting|roofing|landscaping|cleaning","problemType":"leak|install|repair|blocked_drain|damage|unknown","severity":"low|medium|high","estimatedTimeMinutes":<int 30-480>,"partsRequired":<bool>}`,
          },
          { role: "user", content: description },
        ],
      }),
    });
    if (!resp.ok) return null;
    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content?.trim();
    if (!raw) return null;
    return JSON.parse(raw.replace(/```json|```/g, "").trim());
  } catch { return null; }
}

export async function estimatePricing(input: PricingRequest): Promise<PricingResult> {
  const aiParsed = await parseWithAI(input.description);
  const parsed = aiParsed ?? (await parseJob(input.description));
  const modelVersion = aiParsed ? "pricing-openai-v1" : "pricing-hybrid-v1";

  const basePrices: Record<string, number> = {
    plumbing: 120, electrical: 140, handyman: 100, general: 110,
    hvac: 150, carpentry: 115, painting: 95, roofing: 200, landscaping: 90, cleaning: 80,
  };

  const severityScore = { low: 1, medium: 2, high: 3 }[parsed.severity] ?? 1;
  const urgencyMultiplier = { "urgent now": 1.5, today: 1.2, flexible: 1.0 }[input.urgency] ?? 1.0;
  const locationFactor = input.location.toLowerCase().includes("austin") ? 1.1 : 1.0;
  const base = basePrices[parsed.category] ?? 110;

  let price = base + parsed.estimatedTimeMinutes * 1.2 + severityScore * 20;
  price = Math.round(price * urgencyMultiplier * locationFactor);

  return {
    category: parsed.category,
    problemType: parsed.problemType,
    severity: parsed.severity,
    estimatedTimeMinutes: parsed.estimatedTimeMinutes,
    partsRequired: parsed.partsRequired,
    price,
    priceRange: [Math.round(price * 0.9), Math.round(price * 1.15)],
    confidence: parsed.problemType === "unknown" ? "medium" : "high",
    modelVersion,
    features: { severityScore, urgencyMultiplier, locationFactor, base, estimatedTimeMinutes: parsed.estimatedTimeMinutes, partsRequired: parsed.partsRequired, modelUsed: aiParsed ? "openai" : "rule-based" },
  };
}

export async function logPricingEvent(
  result: PricingResult,
  input: PricingRequest,
  jobId?: string,
  userId?: string
): Promise<void> {
  try {
    await prisma.pricingEvent.create({
      data: {
        jobId: jobId ?? null,
        userId: userId ?? null,
        inputDescription: input.description,
        location: input.location,
        urgency: input.urgency,
        predictedPrice: result.price,
        predictedMin: result.priceRange[0],
        predictedMax: result.priceRange[1],
        confidence: result.confidence,
        modelVersion: result.modelVersion,
        featuresJson: result.features as any,
      },
    });
  } catch (err) {
    console.error("[PricingEvent] Failed to log:", err);
  }
}
