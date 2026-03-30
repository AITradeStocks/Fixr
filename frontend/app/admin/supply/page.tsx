"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";

interface SupplyData {
  totalLeads: number; onboarded: number; activated: number; retained: number;
  totalContractors: number; fillRate: number;
  jobs: { total: number; completed: number; pending: number };
  contractors: Array<{ id: string; name: string; trade: string; status: string; rating?: number; createdAt: string }>;
  needsFirstJob: Array<{ id: string; name: string; trade: string; phone: string; joinedAt: string }>;
}
interface FunnelData { stages: Array<{ label: string; count: number }>; cancelled: number; totalUsers: number; }
interface RetentionItem {
  id: string; name: string; trade: string; status: string;
  totalJobs: number; completedJobs: number; week1Jobs: number; week4Jobs: number;
  daysSinceJoin: number; hasJobIn48h: boolean; rating?: number; joinedAt: string;
}
interface PricingEvent {
  id: string; jobId?: string; inputDescription: string; location: string;
  urgency: string; predictedPrice: number; predictedMin: number; predictedMax: number;
  confidence: string; modelVersion: string; createdAt: string;
}

type Tab = "funnel" | "48h" | "retention" | "pricing";

export default function AdminSupplyPage() {
  const router = useRouter();
  const [supply, setSupply] = useState<SupplyData | null>(null);
  const [funnel, setFunnel] = useState<FunnelData | null>(null);
  const [retention, setRetention] = useState<RetentionItem[]>([]);
  const [pricingEvents, setPricingEvents] = useState<PricingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("funnel");

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") router.push("/admin");
  }, []);

  const load = useCallback(async () => {
    const [s, f, r, p] = await Promise.all([
      api.getSupplyAnalytics() as Promise<SupplyData>,
      api.getFunnelAnalytics() as Promise<FunnelData>,
      api.getRetentionAnalytics() as Promise<RetentionItem[]>,
      api.getPricingEvents() as Promise<PricingEvent[]>,
    ]);
    setSupply(s); setFunnel(f); setRetention(r); setPricingEvents(p);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Loading analytics...</p>
    </main>
  );

  const maxFunnelCount = funnel ? Math.max(...funnel.stages.map(s => s.count), 1) : 1;
  const avgPrice = pricingEvents.length > 0 ? Math.round(pricingEvents.reduce((s, e) => s + e.predictedPrice, 0) / pricingEvents.length) : 0;
  const openaiCount = pricingEvents.filter(e => e.modelVersion.includes("openai")).length;
  const highConfCount = pricingEvents.filter(e => e.confidence === "high").length;
  const stuck48h = supply?.needsFirstJob || [];

  // Retention cohorts
  const activated = retention.filter(c => c.status === "activated" || c.status === "retained");
  const got48hJob = activated.filter(c => c.hasJobIn48h).length;
  const got7dJob = activated.filter(c => c.week1Jobs > 0).length;
  const got28dJob = activated.filter(c => c.week4Jobs > 0).length;

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Analytics</h1>
            <p className="text-xs text-slate-500 mt-0.5">Supply pipeline, job funnel, retention, pricing data</p>
          </div>
          <button onClick={load} className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 transition-colors">
            Refresh
          </button>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Registered users", value: funnel?.totalUsers || 0, color: "text-white" },
            { label: "Activated contractors", value: supply?.activated || 0, color: "text-emerald-400" },
            { label: "Fill rate", value: `${supply?.fillRate || 0}%`, color: (supply?.fillRate || 0) >= 80 ? "text-emerald-400" : "text-amber-400" },
            { label: "Pricing events", value: pricingEvents.length, color: "text-blue-400" },
            { label: "48h alert", value: stuck48h.length, color: stuck48h.length > 0 ? "text-red-400" : "text-slate-500" },
          ].map(k => (
            <div key={k.label} className={`rounded-xl border p-4 ${k.label === "48h alert" && stuck48h.length > 0 ? "border-red-800 bg-red-950/30" : "border-slate-800 bg-slate-900"}`}>
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Pipeline progress */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: "Leads", value: supply?.totalLeads || 0, color: "bg-slate-700" },
            { label: "Onboarded", value: supply?.onboarded || 0, color: "bg-blue-700" },
            { label: "Activated", value: supply?.activated || 0, color: "bg-emerald-700" },
            { label: "Retained", value: supply?.retained || 0, color: "bg-purple-700" },
          ].map((s, i, arr) => {
            const pct = arr[0].value > 0 ? Math.round((s.value / arr[0].value) * 100) : 0;
            return (
              <div key={s.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all`} style={{ width: `${pct}%` }} />
                </div>
                {i > 0 && <p className="text-xs text-slate-600 mt-1">{pct}% of leads</p>}
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-slate-800 mb-5">
          {([
            { key: "funnel", label: "Job funnel" },
            { key: "48h", label: `48h ops alert${stuck48h.length > 0 ? ` (${stuck48h.length})` : ""}` },
            { key: "retention", label: "Retention cohorts" },
            { key: "pricing", label: "Pricing events" },
          ] as const).map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t.key ? "border-emerald-500 text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-300"} ${t.key === "48h" && stuck48h.length > 0 ? "text-red-400 hover:text-red-300" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Job funnel ── */}
        {tab === "funnel" && funnel && (
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-sm font-semibold text-white mb-5">Job conversion funnel</h3>
            <div className="space-y-3">
              {funnel.stages.map((stage, i) => {
                const pct = Math.max(4, (stage.count / maxFunnelCount) * 100);
                const convPct = i > 0 && funnel.stages[0].count > 0 ? Math.round((stage.count / funnel.stages[0].count) * 100) : 100;
                return (
                  <div key={stage.label} className="flex items-center gap-4">
                    <div className="w-28 text-xs text-slate-500 text-right shrink-0">{stage.label}</div>
                    <div className="flex-1 h-7 rounded-lg bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-lg bg-emerald-600 transition-all duration-500 flex items-center justify-end pr-3"
                        style={{ width: `${pct}%` }}>
                        {stage.count > 0 && <span className="text-xs font-semibold text-white">{stage.count}</span>}
                      </div>
                    </div>
                    <div className="w-12 text-xs text-slate-500 shrink-0 text-right">{convPct}%</div>
                  </div>
                );
              })}
            </div>
            {funnel.cancelled > 0 && <p className="mt-4 text-xs text-red-500">{funnel.cancelled} job{funnel.cancelled > 1 ? "s" : ""} cancelled</p>}
          </div>
        )}

        {/* ── 48h ops alert ── */}
        {tab === "48h" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-semibold text-white mb-2">48-hour first-job rule</h3>
              <p className="text-xs text-slate-500 mb-5">Every activated contractor must receive a job within 48 hours. These contractors have been active for 48h+ with zero jobs.</p>
              {stuck48h.length === 0 ? (
                <div className="rounded-lg bg-emerald-900/30 border border-emerald-800 px-4 py-6 text-center">
                  <p className="text-emerald-400 font-semibold text-sm">✓ All contractors are receiving jobs</p>
                  <p className="text-emerald-600 text-xs mt-1">No 48h violations right now</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stuck48h.map(c => (
                    <div key={c.id} className="rounded-lg border border-red-800 bg-red-950/20 p-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white text-sm">{c.name}</p>
                        <p className="text-xs text-slate-400 capitalize mt-0.5">{c.trade.split(",")[0]} · {c.phone}</p>
                        <p className="text-xs text-red-400 mt-0.5">Joined {new Date(c.joinedAt).toLocaleDateString()} — no jobs yet</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a href={`tel:${c.phone}`} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 transition-colors">
                          Call
                        </a>
                        <a href="/admin/jobs" className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-500 transition-colors">
                          Assign job
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Retention cohorts ── */}
        {tab === "retention" && (
          <div className="space-y-4">
            {/* Cohort summary cards */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Got job in 48h", value: got48hJob, total: activated.length, color: "text-emerald-400" },
                { label: "Active in week 1", value: got7dJob, total: activated.length, color: "text-blue-400" },
                { label: "Active in week 4", value: got28dJob, total: activated.length, color: "text-purple-400" },
              ].map(c => (
                <div key={c.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className={`text-2xl font-bold ${c.color}`}>{c.value}<span className="text-sm text-slate-500 font-normal">/{c.total}</span></p>
                  <p className="text-xs text-slate-500 mt-0.5">{c.label}</p>
                  <div className="mt-2 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full rounded-full bg-current ${c.color} opacity-60`}
                      style={{ width: c.total > 0 ? `${(c.value / c.total) * 100}%` : "0%" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Per-contractor retention table */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 flex justify-between items-center">
                <h3 className="text-sm font-semibold text-white">Contractor cohort detail</h3>
                <p className="text-xs text-slate-500">{retention.length} contractors</p>
              </div>
              <div className="divide-y divide-slate-800 max-h-96 overflow-y-auto">
                {retention.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No contractor data yet</p>}
                {retention.map(c => (
                  <div key={c.id} className="flex items-center justify-between px-5 py-3 hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-slate-500 capitalize mt-0.5">{c.trade.split(",").join(", ")}</p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs rounded-full px-2 py-0.5 ${c.hasJobIn48h ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/30 text-red-500"}`}>
                          {c.hasJobIn48h ? "✓ 48h" : "✗ 48h"}
                        </span>
                        <span className="text-xs text-slate-600">{c.daysSinceJoin}d since join</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm font-semibold text-white">{c.completedJobs}/{c.totalJobs}</p>
                        <p className="text-xs text-slate-500">done/total</p>
                      </div>
                      {c.rating && <p className="text-sm font-semibold text-amber-400">⭐ {c.rating}</p>}
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === "activated" ? "bg-emerald-900/50 text-emerald-400" : c.status === "retained" ? "bg-purple-900/50 text-purple-400" : c.status === "onboarded" ? "bg-blue-900/50 text-blue-400" : "bg-slate-800 text-slate-500"}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Pricing events ── */}
        {tab === "pricing" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Total estimates", value: pricingEvents.length, color: "text-white" },
                { label: "Avg estimate", value: `$${avgPrice}`, color: "text-emerald-400" },
                { label: "High confidence", value: `${pricingEvents.length > 0 ? Math.round((highConfCount / pricingEvents.length) * 100) : 0}%`, color: "text-blue-400" },
                { label: "OpenAI powered", value: openaiCount, color: "text-purple-400" },
              ].map(k => (
                <div key={k.label} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-800 flex justify-between">
                <h3 className="text-sm font-semibold text-white">Pricing event log</h3>
                <p className="text-xs text-slate-500">Most recent first</p>
              </div>
              <div className="divide-y divide-slate-800 max-h-[480px] overflow-y-auto">
                {pricingEvents.length === 0 && <p className="text-xs text-slate-500 text-center py-6">No events yet</p>}
                {pricingEvents.map(e => (
                  <div key={e.id} className="px-5 py-3 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{e.inputDescription}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{e.location} · {e.urgency} · {new Date(e.createdAt).toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs rounded-full px-2 py-0.5 ${e.confidence === "high" ? "bg-emerald-900/50 text-emerald-400" : "bg-amber-900/50 text-amber-400"}`}>{e.confidence}</span>
                          <span className="text-xs text-slate-600">{e.modelVersion}</span>
                          {e.jobId && <span className="text-xs text-blue-500">→ booked</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-base font-bold text-white">${e.predictedPrice}</p>
                        <p className="text-xs text-slate-600">${e.predictedMin}–${e.predictedMax}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
