"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Contractor } from "@/lib/types";

const STATUS_OPTIONS = ["onboarded", "activated", "retained", "inactive"];

export default function AdminContractorsPage() {
  const router = useRouter();
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") router.push("/admin");
  }, []);

  const load = useCallback(async () => {
    const data = await api.getContractors();
    setContractors(data as Contractor[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleStatusChange(id: string, status: string) {
    setUpdating(id);
    try {
      await api.updateContractor(id, { status });
      showToast(`Contractor status updated to "${status}"`);
      await load();
    } finally { setUpdating(null); }
  }

  const filtered = contractors
    .filter(c => filterStatus === "all" || c.status === filterStatus)
    .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.trade.toLowerCase().includes(search.toLowerCase()));

  const counts = {
    all: contractors.length,
    onboarded: contractors.filter(c => c.status === "onboarded").length,
    activated: contractors.filter(c => c.status === "activated").length,
    retained: contractors.filter(c => c.status === "retained").length,
    inactive: contractors.filter(c => c.status === "inactive").length,
  };

  if (loading) return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-white">Contractor Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">Activate, retain, or deactivate contractors</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Onboarded", value: counts.onboarded, color: "text-blue-400" },
            { label: "Activated", value: counts.activated, color: "text-emerald-400" },
            { label: "Retained", value: counts.retained, color: "text-purple-400" },
            { label: "Inactive", value: counts.inactive, color: "text-slate-500" },
          ].map(k => (
            <div key={k.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2 mb-5">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or trade..."
            className="flex-1 h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500 placeholder:text-slate-500" />
          <div className="flex gap-1">
            {["all", ...STATUS_OPTIONS].map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${filterStatus === s ? "bg-emerald-600 text-white" : "border border-slate-700 text-slate-400 hover:bg-slate-800"}`}>
                {s} {s !== "all" && counts[s as keyof typeof counts] > 0 && `(${counts[s as keyof typeof counts]})`}
              </button>
            ))}
          </div>
        </div>

        {/* Contractors */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
              No contractors match this filter
            </div>
          )}
          {filtered.map(c => (
            <div key={c.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-sm font-bold text-emerald-400">
                    {c.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{c.name}</p>
                    <p className="text-xs text-slate-400 capitalize mt-0.5">{c.trade.split(",").join(", ")}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{c.phone}{c.email ? ` · ${c.email}` : ""}</p>
                    <p className="text-xs text-slate-600 mt-0.5">Zips: {c.zipCodes.join(", ")}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {c.rating && <p className="text-sm text-amber-400 font-medium">⭐ {c.rating}</p>}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[
                        { s: "onboarded", color: "bg-blue-600" },
                        { s: "activated", color: "bg-emerald-600" },
                        { s: "retained", color: "bg-purple-600" },
                        { s: "inactive", color: "bg-slate-600" },
                      ].map(({ s, color }) => (
                        <button key={s} onClick={() => handleStatusChange(c.id, s)}
                          disabled={c.status === s || updating === c.id}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium capitalize transition-colors disabled:opacity-50 ${c.status === s ? `${color} text-white` : "border border-slate-700 text-slate-400 hover:bg-slate-800"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.insuranceUploaded ? "bg-emerald-900/50 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                      {c.insuranceUploaded ? "✓" : "✗"} Insurance
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.licenseUploaded ? "bg-emerald-900/50 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                      {c.licenseUploaded ? "✓" : "✗"} License
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${c.identityUploaded ? "bg-emerald-900/50 text-emerald-400" : "bg-slate-800 text-slate-500"}`}>
                      {c.identityUploaded ? "✓" : "✗"} ID
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
