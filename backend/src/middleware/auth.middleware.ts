import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fixr-jwt-secret-change-in-production";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
  role?: "customer" | "contractor" | "admin";
}

// Middleware: require valid JWT
export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized — token required" });
    return;
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role?: string };
    req.userId = payload.userId;
    req.userEmail = payload.email;
    req.role = payload.role as any;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized — invalid or expired token" });
  }
}

// Middleware: attach user if token present but don't require it
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) {
    const token = header.slice(7);
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string; role?: string };
      req.userId = payload.userId;
      req.userEmail = payload.email;
      req.role = payload.role as any;
    } catch { /* ignore */ }
  }
  next();
}

export function signToken(userId: string, email: string, role: string = "customer"): string {
  return jwt.sign({ userId, email, role }, JWT_SECRET, { expiresIn: "30d" });
}
