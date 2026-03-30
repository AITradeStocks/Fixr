export type UserRole = "customer" | "contractor" | "admin";

export interface CustomerUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface Session {
  role: UserRole;
  // Customer
  token?: string;
  user?: CustomerUser;
  // Contractor
  contractorId?: string;
  contractorName?: string;
  trades?: string[];
}

const KEY = "fixr_session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setSession(s: Session) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}

export function setCustomerSession(token: string, user: CustomerUser) {
  setSession({ role: "customer", token, user });
}

export function setContractorSession(id: string, name: string, trades: string[]) {
  setSession({ role: "contractor", contractorId: id, contractorName: name, trades });
}

export function setAdminSession() {
  setSession({ role: "admin" });
}

export function getAuthHeader(): Record<string, string> {
  const session = getSession();
  if (session?.token) return { Authorization: `Bearer ${session.token}` };
  return {};
}
