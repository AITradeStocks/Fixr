"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setCustomerSession, getSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session?.role === "customer") router.push("/dashboard");
    if (session?.role === "contractor") router.push("/contractor/jobs");
    if (session?.role === "admin") router.push("/admin/jobs");
  }, []);

  function update(f: string, v: string) { setForm(p => ({ ...p, [f]: v })); setError(""); }

  async function handleLogin() {
    if (!form.email || !form.password) { setError("Email and password required"); return; }
    setLoading(true);
    try {
      const result = await api.login({ email: form.email, password: form.password }) as any;
      setCustomerSession(result.token, result.user);
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Log in to track your jobs</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input type="email" value={form.email} onChange={e => update("email", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="you@example.com"
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-colors" />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input type="password" value={form.password} onChange={e => update("password", e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="Your password"
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-colors" />
          </div>

          {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

          <button onClick={handleLogin} disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
            {loading ? "Logging in..." : "Log in →"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          No account?{" "}
          <a href="/register" className="text-emerald-600 hover:underline font-medium">Create one free</a>
        </p>
        <p className="mt-1 text-center text-sm">
          <a href="/" className="text-slate-400 text-xs hover:text-slate-600">← Back to home</a>
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <p className="text-center text-xs text-slate-400 mb-3">Other ways to access</p>
          <div className="flex gap-2">
            <a href="/contractor/login" className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs text-slate-600 hover:bg-slate-50 transition-colors">
              Contractor login
            </a>
            <a href="/admin" className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center text-xs text-slate-500 hover:bg-slate-50 transition-colors">
              Admin panel
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
