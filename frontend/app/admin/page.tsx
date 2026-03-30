"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminSession, getSession } from "@/lib/auth";

// Simple passcode-based admin entry for MVP
// Replace with real auth in production
const ADMIN_PASSCODE = "fixr-admin-2024";

export default function AdminEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session?.role === "admin") {
      router.push("/admin/jobs");
    }
  }, []);

  function handleEnter() {
    if (code === ADMIN_PASSCODE) {
      setAdminSession();
      router.push("/admin/jobs");
    } else {
      setError("Incorrect passcode");
      setCode("");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-semibold text-white">Admin access</h1>
          <p className="mt-2 text-sm text-slate-400">Enter your admin passcode to continue</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Passcode</label>
            <input
              type="password"
              value={code}
              onChange={e => { setCode(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && handleEnter()}
              placeholder="Enter passcode"
              className="mt-1.5 w-full h-12 rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm text-white outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-500"
            />
            <p className="mt-1.5 text-xs text-slate-500">Default: <span className="font-mono text-slate-400">fixr-admin-2024</span></p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-900/30 border border-red-800 px-4 py-3 text-sm text-red-400">{error}</div>
          )}

          <button
            onClick={handleEnter}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
          >
            Enter admin panel →
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-slate-600">
          <a href="/" className="hover:text-slate-400 transition-colors">← Back to Fixr</a>
        </p>
      </div>
    </main>
  );
}
