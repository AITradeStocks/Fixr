"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Job, Contractor } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/types";

const JOB_FILTERS = [
  { key: "all", label: "All" },
  { key: "priced", label: "Open" },
  { key: "manual_dispatch_required", label: "Stuck" },
  { key: "awaiting_customer_confirmation", label: "In progress" },
  { key: "completed", label: "Done" },
  { key: "reviewed", label: "Reviewed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function AdminJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [selectedContractor, setSelectedContractor] = useState<Record<string, string>>({});
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [unsticking, setUnsticking] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") {
      router.push("/admin");
    }
  }, []);

  const load = useCallback(async () => {
    const [j, c] = await Promise.all([api.getAdminJobs(), api.getContractors()]);
    setJobs(j as Job[]);
    setContractors(c as Contractor[]);
    setLoading(false);
    setLastRefresh(new Date());
  }, []);

  useEffect(() => { load(); }, [load]);
  useEffect(() => {
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [load]);

  function log(msg: string) {
    setActionLog(l => [`${new Date().toLocaleTimeString()} — ${msg}`, ...l.slice(0, 19)]);
  }

  async function handleAssign(jobId: string) {
    const contractorId = selectedContractor[jobId];
    if (!contractorId) return;
    setAssigning(jobId);
    try {
      await api.adminAssign(jobId, contractorId);
      const c = contractors.find(c => c.id === contractorId);
      log(`Assigned job to ${c?.name || contractorId}`);
      await load();
    } finally { setAssigning(null); }
  }

  async function handleUnstick() {
    setUnsticking(true);
    try {
      const result = await api.adminUnstick() as any;
      log(`Unstuck ${result.unstuck} job(s) → set to priced`);
      await load();
    } finally { setUnsticking(false); }
  }

  async function handleForceStatus(jobId: string, status: string) {
    try {
      await api.adminForceStatus(jobId, status, `Admin forced to ${status}`);
      log(`Job ${jobId.slice(0, 8)}… forced to "${status}"`);
      await load();
    } catch (e: any) {
      log(`Error: ${e.message}`);
    }
  }

  const filtered = jobs
    .filter(j => filter === "all" || j.status === filter)
    .filter(j => !search || j.description.toLowerCase().includes(search.toLowerCase()) || j.location.toLowerCase().includes(search.toLowerCase()));

  const counts: Record<string, number> = {};
  JOB_FILTERS.forEach(f => {
    counts[f.key] = f.key === "all" ? jobs.length : jobs.filter(j => j.status === f.key).length;
  });

  const revenue = jobs.filter(j => ["completed", "reviewed"].includes(j.status)).reduce((s, j) => s + j.quotedPrice, 0);
  const stuck = counts["manual_dispatch_required"] || 0;

  if (loading) return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Job Queue</h1>
            <p className="text-xs text-slate-500 mt-0.5">Auto-refreshes every 15s · last: {lastRefresh.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center gap-2">
            {stuck > 0 && (
              <button onClick={handleUnstick} disabled={unsticking}
                className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500 disabled:opacity-50 transition-colors">
                {unsticking ? "Unsticking..." : `Unstick ${stuck} stuck job${stuck > 1 ? "s" : ""}`}
              </button>
            )}
            <button onClick={load} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 transition-colors">
              Refresh
            </button>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total", value: counts.all, color: "text-white" },
            { label: "Stuck", value: stuck, color: stuck > 0 ? "text-orange-400" : "text-slate-400" },
            { label: "In progress", value: counts["awaiting_customer_confirmation"] || 0, color: "text-blue-400" },
            { label: "Completed", value: (counts["completed"] || 0) + (counts["reviewed"] || 0), color: "text-emerald-400" },
            { label: "Revenue", value: `$${revenue.toLocaleString()}`, color: "text-emerald-400" },
          ].map(k => (
            <div key={k.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs list — 2/3 width */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search + filter */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..."
                className="flex-1 h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500 placeholder:text-slate-500 transition-colors" />
              <div className="flex gap-1 overflow-x-auto">
                {JOB_FILTERS.map(f => (
                  <button key={f.key} onClick={() => setFilter(f.key)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${filter === f.key ? "bg-emerald-600 text-white" : "border border-slate-700 text-slate-400 hover:bg-slate-800"}`}>
                    {f.label}
                    {counts[f.key] > 0 && f.key !== "all" && (
                      <span className={`ml-1 ${filter === f.key ? "opacity-70" : "text-slate-500"}`}>({counts[f.key]})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
                No jobs match this filter
              </div>
            )}

            {filtered.map(job => (
              <div key={job.id}
                className={`rounded-xl border bg-slate-900 p-4 ${job.status === "manual_dispatch_required" ? "border-orange-800" : "border-slate-800"}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className={`rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[job.status] || "bg-slate-800 text-slate-400 border-slate-700"}`}>
                        {STATUS_LABELS[job.status] || job.status}
                      </span>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400 capitalize">{job.category}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${job.urgency === "urgent now" ? "bg-red-900/50 text-red-400" : job.urgency === "today" ? "bg-amber-900/50 text-amber-400" : "bg-slate-800 text-slate-500"}`}>
                        {job.urgency}
                      </span>
                    </div>
                    <p className="font-medium text-white text-sm">{job.description}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{job.location} · {new Date(job.createdAt).toLocaleDateString()}</p>
                    {job.contractor && (
                      <p className="text-xs text-slate-400 mt-1">
                        Contractor: <span className="text-slate-300 font-medium">{job.contractor.name}</span> · {job.contractor.phone}
                      </p>
                    )}
                    <p className="text-xs text-slate-700 font-mono mt-1">{job.id}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-lg font-bold text-white">${job.quotedPrice}</p>
                    <p className="text-xs text-slate-600">${job.quotedPriceMin}–${job.quotedPriceMax}</p>
                  </div>
                </div>

                {/* Manual assign */}
                {["priced", "manual_dispatch_required", "assigned"].includes(job.status) && (
                  <div className="mt-3 border-t border-slate-800 pt-3">
                    <p className="text-xs text-slate-500 mb-2 font-medium">Manual assign contractor</p>
                    <div className="flex gap-2">
                      <select value={selectedContractor[job.id] || ""} onChange={e => setSelectedContractor(s => ({ ...s, [job.id]: e.target.value }))}
                        className="flex-1 h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500">
                        <option value="">Select contractor...</option>
                        {contractors.filter(c => c.status === "activated").map(c => (
                          <option key={c.id} value={c.id}>{c.name} · {c.trade.split(",")[0]} · ⭐{c.rating || "—"}</option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(job.id)} disabled={!selectedContractor[job.id] || assigning === job.id}
                        className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-40 transition-colors">
                        {assigning === job.id ? "..." : "Assign"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Force status */}
                <div className="mt-2 flex gap-1.5 flex-wrap">
                  {["priced", "cancelled"].filter(s => s !== job.status).map(s => (
                    <button key={s} onClick={() => handleForceStatus(job.id, s)}
                      className="rounded-lg border border-slate-700 px-2.5 py-1 text-xs text-slate-400 hover:bg-slate-800 transition-colors">
                      Force → {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action log — 1/3 width */}
          <div className="space-y-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-800">
                <h3 className="text-sm font-semibold text-white">Action log</h3>
                <p className="text-xs text-slate-500 mt-0.5">This session only</p>
              </div>
              <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                {actionLog.length === 0 && (
                  <p className="text-xs text-slate-600 text-center py-4">No actions yet this session</p>
                )}
                {actionLog.map((entry, i) => (
                  <div key={i} className="rounded-lg bg-slate-800 px-3 py-2 text-xs text-slate-400">{entry}</div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Quick breakdown</h3>
              <div className="space-y-2">
                {JOB_FILTERS.filter(f => f.key !== "all").map(f => {
                  const count = counts[f.key] || 0;
                  const pct = counts.all > 0 ? Math.round((count / counts.all) * 100) : 0;
                  return (
                    <div key={f.key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">{f.label}</span>
                        <span className="text-slate-500">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-600 transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
