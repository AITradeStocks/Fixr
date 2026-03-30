"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setContractorSession } from "@/lib/auth";
import { getContractorTrades } from "@/lib/types";
import type { Contractor } from "@/lib/types";

export default function ContractorLoginPage() {
  const router = useRouter();
  const [contractorId, setContractorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!contractorId.trim()) { setError("Please enter your contractor ID"); return; }
    setLoading(true);
    setError("");
    try {
      const contractor = await api.getContractor(contractorId.trim()) as Contractor;
      if (!contractor) { setError("Contractor not found"); return; }
      const trades = getContractorTrades(contractor);
      setContractorSession(contractor.id, contractor.name, trades);
      router.push("/contractor/jobs");
    } catch {
      setError("Contractor ID not found. Check your ID and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href="/" className="mb-8 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to home
        </a>

        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Contractor login</h1>
          <p className="mt-2 text-sm text-slate-500">Enter your contractor ID to access your job feed</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Contractor ID</label>
            <input
              value={contractorId}
              onChange={e => setContractorId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="e.g. a1b2c3d4-..."
              className="mt-1.5 w-full h-12 rounded-xl border border-slate-200 px-4 text-sm font-mono outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-colors"
            />
            <p className="mt-1.5 text-xs text-slate-400">
              You received this when you registered. Check your email or the welcome screen.
            </p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors"
          >
            {loading ? "Verifying..." : "Log in →"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Not registered yet?{" "}
          <a href="/contractor/onboarding" className="text-emerald-600 hover:underline font-medium">Apply to join →</a>
        </p>
      </div>
    </main>
  );
}
