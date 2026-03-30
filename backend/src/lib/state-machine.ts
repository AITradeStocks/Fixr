import { HttpError } from "./errors.js";

const allowedTransitions: Record<string, string[]> = {
  pending: ["priced"],
  priced: ["paid", "cancelled"],
  paid: ["assigned", "manual_dispatch_required", "cancelled"],
  assigned: ["awaiting_customer_confirmation", "cancelled"],
  awaiting_customer_confirmation: ["completed"],
  completed: ["reviewed"],
  reviewed: [],
  cancelled: [],
  manual_dispatch_required: ["assigned", "cancelled"]
};

export function assertValidTransition(current: string, next: string) {
  const valid = allowedTransitions[current] || [];
  if (!valid.includes(next)) {
    throw new HttpError(400, `invalid status transition: ${current} -> ${next}`);
  }
}
