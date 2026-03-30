import { getAuthHeader } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

async function request<T>(path: string, init?: RequestInit, auth = false): Promise<T> {
  const authHeaders = auth ? getAuthHeader() : {};
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...authHeaders,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

// Authenticated request helper
function authReq<T>(path: string, init?: RequestInit): Promise<T> {
  return request<T>(path, init, true);
}

export const api = {
  // ── Auth ──
  register: (body: { email: string; password: string; name: string; phone?: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  me: () => authReq("/auth/me"),

  // ── Pricing ──
  estimatePricing: (body: { description: string; location: string; urgency: string }) =>
    request("/pricing/estimate", { method: "POST", body: JSON.stringify(body) }),

  // ── Jobs ──
  createJob: (body: { description: string; location: string; urgency: string }) =>
    authReq("/jobs", { method: "POST", body: JSON.stringify(body) }),
  getMyJobs: () => authReq("/jobs/mine"),           // authenticated — own jobs only
  getJobs: () => request("/jobs"),                   // unauthenticated — all jobs (contractor feed)
  getJob: (id: string) => request(`/jobs/${id}`),
  acceptJob: (id: string, contractorId: string) =>
    request(`/jobs/${id}/accept`, { method: "POST", body: JSON.stringify({ contractorId }) }),
  completeJob: (id: string) =>
    request(`/jobs/${id}/complete`, { method: "POST", body: JSON.stringify({}) }),
  confirmCompletion: (id: string) =>
    authReq(`/jobs/${id}/confirm-completion`, { method: "POST", body: JSON.stringify({}) }),
  reviewJob: (id: string, rating: number, comment: string) =>
    authReq(`/jobs/${id}/review`, { method: "POST", body: JSON.stringify({ rating, comment }) }),

  // ── Contractors ──
  getContractors: () => request("/contractors"),
  getContractor: (id: string) => request(`/contractors/${id}`),
  createContractor: (body: unknown) =>
    request("/contractors", { method: "POST", body: JSON.stringify(body) }),
  updateContractor: (id: string, body: unknown) =>
    request(`/contractors/${id}`, { method: "PATCH", body: JSON.stringify(body) }),

  // ── Admin ──
  getAdminJobs: () => request("/admin/jobs"),
  adminAssign: (jobId: string, contractorId: string) =>
    request("/admin/assign-tradie", { method: "POST", body: JSON.stringify({ jobId, contractorId }) }),
  adminForceStatus: (jobId: string, status: string, note?: string) =>
    request("/admin/update-status", { method: "POST", body: JSON.stringify({ jobId, status, note }) }),
  adminUnstick: () =>
    request("/admin/unstick", { method: "POST", body: JSON.stringify({}) }),
  getAdminActions: () => request("/admin/actions"),
  getPricingEvents: () => request("/admin/pricing-events"),

  // ── Analytics ──
  getSupplyAnalytics: () => request("/analytics/supply"),
  getFunnelAnalytics: () => request("/analytics/funnel"),
  getRetentionAnalytics: () => request("/analytics/retention"),

  // ── CRM / Leads ──
  createLead: (body: unknown) =>
    request("/tradie-leads", { method: "POST", body: JSON.stringify(body) }),
  getLeads: () => request("/tradie-leads"),
  updateLead: (id: string, body: unknown) =>
    request(`/tradie-leads/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  moveLead: (id: string, status: string, notes?: string) =>
    request(`/tradie-leads/${id}/move`, { method: "POST", body: JSON.stringify({ status, notes }) }),
};
