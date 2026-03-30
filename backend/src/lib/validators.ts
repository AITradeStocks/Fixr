import { HttpError } from "./errors.js";

export function assertNonEmptyString(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new HttpError(400, `${field} must be a non-empty string`);
  }
}

export function assertUrgency(value: unknown): asserts value is "urgent now" | "today" | "flexible" {
  if (!["urgent now", "today", "flexible"].includes(String(value))) {
    throw new HttpError(400, "urgency must be one of: urgent now, today, flexible");
  }
}
