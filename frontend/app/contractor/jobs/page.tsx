"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Job } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS, jobRelevanceScore } from "@/lib/types";

export default function ContractorJobsPage() {
  const router = useRouter();
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [contractorId, setContractorId] = useState<string | null>(null);
  const [contractorName, setContractorName] = useState("");
  const [myTrades, setMyTrades] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [tab, setTab] = useState<"available" | "mine">("available");
  const [lastPoll, setLastPoll] = useState<Date>(new Date());

  const load = useCallback(async () => {
    const data = (await api.getJobs()) as Job[];
    setAllJobs(data);
    setLoading(false);
    setLastPoll(new Date());
  }, []);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "contractor" || !session.contractorId) {
      router.push("/contractor/login");
      return;
    }
    setContractorId(session.contractorId);
    setContractorName(session.contractorName || "");
    setMyTrades(session.trades || []);
    load();
  }, []);

  useEffect(() => {
    if (!contractorId) return;
    const timer = setInterval(load, 8000);
    return () => clearInterval(timer);
  }, [contractorId, load]);

  async function handleAccept(jobId: string) {
    if (!contractorId) return;
    setActionLoading(jobId + "_accept");
    try {
      await api.acceptJob(jobId, contractorId);
      setTab("mine");
      await load();
    } catch (e: any) {
      alert(
        e.message === "job already taken by another contractor"
          ? "Another contractor just accepted this — check for other available jobs."
          : e.message || "Could not accept job"
      );
    } finally { setActionLoading(null); }
  }

  async function handleComplete(jobId: string) {
    if (!contractorId) return;
    setActionLoading(jobId + "_complete");
    try {
      await api.completeJob(jobId);
      await load();
    } finally { setActionLoading(null); }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm animate-pulse">Loading job feed...</div>
      </main>
    );
  }

  // All open jobs — sorted by relevance (matching trades first)
  const availableJobs = allJobs
    .filter(j => ["priced", "assigned", "manual_dispatch_required"].includes(j.status) && !j.contractorId)
    .sort((a, b) => jobRelevanceScore(b, myTrades) - jobRelevanceScore(a, myTrades));

  const myJobs = allJobs.filter(j => j.contractorId === contractorId);
  const activeCount = myJobs.filter(j => !["reviewed", "cancelled"].includes(j.status)).length;

  const relevantCount = availableJobs.filter(j => jobRelevanceScore(j, myTrades) > 0).length;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Job feed</h1>
            <p className="mt-1 text-sm text-slate-500">
              {availableJobs.length > 0
                ? <>{relevantCount > 0 && <span className="text-emerald-600 font-medium">{relevantCount} relevant</span>}{relevantCount > 0 && availableJobs.length > relevantCount && <span className="text-slate-400">, </span>}{availableJobs.length > relevantCount && <span>{availableJobs.length - relevantCount} other</span>} job{availableJobs.length !== 1 ? "s" : ""} available</>
                : "No new jobs right now — checking every 8s"}
            </p>
            {myTrades.length > 0 && (
              <div className="mt-1.5 flex flex-wrap gap-1">
                {myTrades.map(t => (
                  <span key={t} className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700 capitalize font-medium">{t}</span>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <span className="text-xs text-slate-300">{lastPoll.toLocaleTimeString()}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 gap-1 mb-6 shadow-sm">
          {[
            { key: "available", label: "Available jobs", count: availableJobs.length },
            { key: "mine", label: "My accepted jobs", count: activeCount },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as any)}
              className={`flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors ${tab === t.key ? "bg-slate-900 text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            >
              {t.label}
              {t.count > 0 && (
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-xs ${tab === t.key ? "bg-white/20 text-white" : t.key === "available" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── AVAILABLE JOBS ── */}
        {tab === "available" && (
          <div className="space-y-3">
            {availableJobs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <div className="text-3xl mb-3">👀</div>
                <div className="text-sm font-medium text-slate-700">No open jobs right now</div>
                <p className="mt-1 text-xs text-slate-400">New jobs appear here automatically. Keep this page open.</p>
              </div>
            )}

            {/* Relevant jobs first */}
            {availableJobs.filter(j => jobRelevanceScore(j, myTrades) > 0).length > 0 && (
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-600 px-1 pb-1">
                ⭐ Matches your trades
              </div>
            )}
            {availableJobs.filter(j => jobRelevanceScore(j, myTrades) > 0).map(job => (
              <JobCard key={job.id} job={job} isRelevant onAccept={handleAccept} actionLoading={actionLoading} />
            ))}

            {availableJobs.filter(j => jobRelevanceScore(j, myTrades) === 0).length > 0 && (
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-400 px-1 pt-2 pb-1">
                Other categories
              </div>
            )}
            {availableJobs.filter(j => jobRelevanceScore(j, myTrades) === 0).map(job => (
              <JobCard key={job.id} job={job} isRelevant={false} onAccept={handleAccept} actionLoading={actionLoading} />
            ))}
          </div>
        )}

        {/* ── MY JOBS ── */}
        {tab === "mine" && (
          <div className="space-y-3">
            {myJobs.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-12 text-center">
                <div className="text-sm text-slate-400">No accepted jobs yet</div>
                <button onClick={() => setTab("available")} className="mt-3 text-sm text-emerald-600 hover:underline">
                  Browse available jobs →
                </button>
              </div>
            )}
            {myJobs.map(job => (
              <MyJobCard key={job.id} job={job} onComplete={handleComplete} actionLoading={actionLoading} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function JobCard({ job, isRelevant, onAccept, actionLoading }: {
  job: Job; isRelevant: boolean;
  onAccept: (id: string) => void;
  actionLoading: string | null;
}) {
  return (
    <div className={`rounded-2xl border-2 bg-white p-5 shadow-sm transition-all hover:shadow-md ${isRelevant ? "border-emerald-200 hover:border-emerald-300" : "border-slate-100 hover:border-slate-200"}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${isRelevant ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
              {job.category}
            </span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${job.urgency === "urgent now" ? "bg-red-100 text-red-600" : job.urgency === "today" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-500"}`}>
              {job.urgency}
            </span>
          </div>
          <p className="font-medium text-slate-950 leading-snug">{job.description}</p>
          <p className="mt-1 text-sm text-slate-500">{job.location}</p>
          <div className="mt-2 flex gap-3 text-xs text-slate-400">
            <span>~{job.estimatedTimeMinutes} min</span>
            <span className="capitalize">{job.severity} severity</span>
            {job.partsRequired && <span className="text-amber-600">Parts needed</span>}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className={`text-2xl font-bold ${isRelevant ? "text-emerald-700" : "text-slate-700"}`}>${job.quotedPrice}</div>
          <div className="text-xs text-slate-400 mt-0.5">${job.quotedPriceMin}–${job.quotedPriceMax}</div>
        </div>
      </div>
      <button
        onClick={() => onAccept(job.id)}
        disabled={actionLoading === job.id + "_accept"}
        className={`mt-4 w-full rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-50 ${isRelevant ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-700 hover:bg-slate-800"}`}
      >
        {actionLoading === job.id + "_accept" ? "Accepting..." : "Accept job →"}
      </button>
    </div>
  );
}

function MyJobCard({ job, onComplete, actionLoading }: {
  job: Job;
  onComplete: (id: string) => void;
  actionLoading: string | null;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 capitalize">{job.category}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[job.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
              {STATUS_LABELS[job.status] || job.status}
            </span>
          </div>
          <p className="font-medium text-slate-950">{job.description}</p>
          <p className="mt-0.5 text-sm text-slate-500">{job.location} · {job.urgency}</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-lg font-bold text-slate-950">${job.quotedPrice}</span>
          <p className="text-xs text-slate-400 mt-0.5">{new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {["assigned", "awaiting_customer_confirmation"].includes(job.status) && (
        <div className="mt-4 rounded-xl bg-blue-50 border border-blue-100 p-4">
          <p className="text-sm font-medium text-blue-900 mb-1">
            {job.status === "assigned" ? "Head to the customer's location" : "Work accepted — complete the job"}
          </p>
          <p className="text-xs text-blue-600 mb-3">
            Once you've finished, mark it complete below. The customer will confirm and you'll get paid.
          </p>
          <button
            onClick={() => onComplete(job.id)}
            disabled={actionLoading === job.id + "_complete"}
            className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {actionLoading === job.id + "_complete" ? "Updating..." : "Mark job as complete ✓"}
          </button>
        </div>
      )}

      {job.status === "completed" && (
        <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-3">
          <p className="text-sm text-amber-800 font-medium">Waiting for customer to confirm</p>
          <p className="text-xs text-amber-600 mt-0.5">They'll receive a prompt to confirm the work is done.</p>
        </div>
      )}

      {job.status === "reviewed" && (
        <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-3 flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-sm font-medium text-emerald-800">Job complete & reviewed</p>
            {job.reviews?.[0] && (
              <p className="text-xs text-emerald-600 mt-0.5">
                Rated {job.reviews[0].rating}/5{job.reviews[0].comment ? ` · "${job.reviews[0].comment}"` : ""}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
