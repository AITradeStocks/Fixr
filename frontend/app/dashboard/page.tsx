"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Job } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/types";

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<Record<string, { rating: number; comment: string }>>({});
  const [showReview, setShowReview] = useState<string | null>(null);
  const [userName, setUserName] = useState("");

  const load = useCallback(async () => {
    try {
      // Fetch ONLY this user's jobs via /jobs/mine (requires JWT)
      const data = (await api.getMyJobs()) as Job[];
      setJobs(data);
    } catch (e: any) {
      if (e.message?.includes("401") || e.message?.includes("Unauthorized")) {
        router.push("/login");
      }
    } finally { setLoading(false); }
  }, []);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "customer" || !session.token) {
      router.push("/login");
      return;
    }
    setUserName(session.user?.name || "");
    load();
  }, []);

  // Auto-refresh every 5s while jobs are open
  useEffect(() => {
    const hasOpen = jobs.some(j => ["priced", "assigned", "manual_dispatch_required", "awaiting_customer_confirmation"].includes(j.status));
    if (!hasOpen) return;
    const timer = setInterval(load, 5000);
    return () => clearInterval(timer);
  }, [jobs, load]);

  async function handleConfirm(id: string) {
    setActionLoading(id + "_confirm");
    try { await api.confirmCompletion(id); setShowReview(id); await load(); }
    finally { setActionLoading(null); }
  }

  async function handleReview(id: string) {
    const r = reviewData[id];
    if (!r?.rating) return;
    setActionLoading(id + "_review");
    try { await api.reviewJob(id, r.rating, r.comment || ""); setShowReview(null); await load(); }
    finally { setActionLoading(null); }
  }

  if (loading) return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        Loading your jobs...
      </div>
    </main>
  );

  const activeJobs = jobs.filter(j => !["reviewed", "cancelled"].includes(j.status));
  const doneJobs = jobs.filter(j => j.status === "reviewed");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
              {userName ? `${userName}'s jobs` : "My Jobs"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {jobs.length === 0 ? "No jobs yet" : `${activeJobs.length} active · ${doneJobs.length} completed`}
            </p>
          </div>
          <a href="/" className="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
            + New job
          </a>
        </div>

        {jobs.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-16 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">🔧</div>
            <h3 className="font-semibold text-slate-950">No jobs yet</h3>
            <p className="mt-2 text-sm text-slate-400">Book your first job and a contractor will be on the way.</p>
            <a href="/" className="mt-5 inline-block rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
              Book a job →
            </a>
          </div>
        )}

        {activeJobs.length > 0 && (
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Active</p>
            <div className="space-y-4">
              {activeJobs.map(job => (
                <JobCard key={job.id} job={job} actionLoading={actionLoading} showReview={showReview}
                  reviewData={reviewData} onConfirm={handleConfirm} onReview={handleReview}
                  onSetReview={(id, d) => setReviewData(r => ({ ...r, [id]: d }))} />
              ))}
            </div>
          </div>
        )}

        {doneJobs.length > 0 && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Completed</p>
            <div className="space-y-3">
              {doneJobs.map(job => (
                <JobCard key={job.id} job={job} actionLoading={actionLoading} showReview={showReview}
                  reviewData={reviewData} onConfirm={handleConfirm} onReview={handleReview}
                  onSetReview={(id, d) => setReviewData(r => ({ ...r, [id]: d }))} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function JobCard({ job, actionLoading, showReview, reviewData, onConfirm, onReview, onSetReview }: {
  job: Job; actionLoading: string | null; showReview: string | null;
  reviewData: Record<string, { rating: number; comment: string }>;
  onConfirm: (id: string) => void; onReview: (id: string) => void;
  onSetReview: (id: string, d: { rating: number; comment: string }) => void;
}) {
  const done = job.status === "reviewed";
  return (
    <div className={`rounded-3xl border bg-white shadow-sm overflow-hidden ${done ? "border-slate-100 opacity-75" : "border-slate-200"}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-950 leading-snug">{job.description}</p>
            <p className="mt-1 text-xs text-slate-400">{job.location} · {job.urgency} · <span className="capitalize">{job.category}</span></p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className="text-xl font-bold text-slate-950">${job.quotedPrice}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[job.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
              {STATUS_LABELS[job.status] || job.status}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-5"><StatusTimeline status={job.status} /></div>

        {/* Contractor card */}
        {job.contractor && (
          <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">Your contractor</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {job.contractor.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-950">{job.contractor.name}</p>
                  <p className="text-xs text-slate-500 capitalize mt-0.5">
                    {job.contractor.trade.split(",")[0]} · {job.contractor.businessType}
                    {job.contractor.rating ? ` · ⭐ ${job.contractor.rating}` : ""}
                  </p>
                </div>
              </div>
              <a href={`tel:${job.contractor.phone}`}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>
            </div>
          </div>
        )}
      </div>

      {["priced", "manual_dispatch_required"].includes(job.status) && (
        <div className="border-t border-slate-100 bg-blue-50 px-5 py-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
          <p className="text-xs text-blue-700">Finding a contractor — page refreshes every 5s</p>
        </div>
      )}

      {job.status === "completed" && showReview !== job.id && (
        <div className="border-t border-slate-100 bg-emerald-50 p-5">
          <p className="text-sm font-semibold text-emerald-900 mb-1">Work completed!</p>
          <p className="text-xs text-emerald-700 mb-4">Confirm to release payment to your contractor.</p>
          <button onClick={() => onConfirm(job.id)} disabled={actionLoading === job.id + "_confirm"}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
            {actionLoading === job.id + "_confirm" ? "Confirming..." : "Confirm & leave a review →"}
          </button>
        </div>
      )}

      {showReview === job.id && (
        <div className="border-t border-slate-100 p-5">
          <p className="text-sm font-semibold text-slate-950 mb-4">How was the service?</p>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => onSetReview(job.id, { ...reviewData[job.id], rating: n })}
                className={`h-12 w-12 rounded-xl border text-xl transition-all ${reviewData[job.id]?.rating >= n ? "border-yellow-300 bg-yellow-50 scale-105" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                ⭐
              </button>
            ))}
          </div>
          <textarea placeholder="Any comments? (optional)" rows={2}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 resize-none transition-colors"
            onChange={e => onSetReview(job.id, { ...reviewData[job.id], comment: e.target.value })} />
          <button onClick={() => onReview(job.id)} disabled={!reviewData[job.id]?.rating || actionLoading === job.id + "_review"}
            className="mt-3 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-40 transition-colors">
            {actionLoading === job.id + "_review" ? "Submitting..." : "Submit review"}
          </button>
        </div>
      )}

      {done && showReview !== job.id && (
        <div className="border-t border-slate-100 px-5 py-3 flex items-center gap-2">
          <svg className="h-4 w-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-sm text-slate-500">
            Complete · {job.reviews?.[0] ? `Rated ${job.reviews[0].rating}/5` : "Thank you!"}
          </p>
        </div>
      )}
    </div>
  );
}

function StatusTimeline({ status }: { status: string }) {
  const steps = [{ key: "priced", label: "Booked" }, { key: "awaiting_customer_confirmation", label: "Accepted" }, { key: "completed", label: "Done" }, { key: "reviewed", label: "Confirmed" }];
  const idx = status === "manual_dispatch_required" ? 0 : Math.max(0, steps.findIndex(s => s.key === status));
  return (
    <div className="flex items-center">
      {steps.map((s, i) => {
        const done = i <= idx; const active = i === idx;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div className={`h-2.5 w-2.5 rounded-full transition-all ${active ? "bg-emerald-500 ring-4 ring-emerald-100" : done ? "bg-emerald-400" : "bg-slate-200"}`} />
              <span className={`mt-1.5 text-[10px] whitespace-nowrap ${active ? "text-emerald-600 font-semibold" : done ? "text-slate-500" : "text-slate-300"}`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px mx-1.5 mb-4 ${i < idx ? "bg-emerald-300" : "bg-slate-100"}`} />}
          </div>
        );
      })}
    </div>
  );
}
