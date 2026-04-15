"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Job } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Star, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Wrench,
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  Sparkles,
  MessageCircle,
  Mail
} from "lucide-react";
import { SupportOverlay } from "@/components/SupportOverlay";

export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<Record<string, { rating: number; comment: string }>>({});
  const [showReview, setShowReview] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const data = (await api.getMyJobs()) as Job[];
      setJobs(data);
    } catch (e: any) {
      if (e.message?.includes("401") || e.message?.includes("Unauthorized")) {
        router.push("/login");
      }
    } finally { setLoading(false); }
  }, [router]);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "customer" || !session.token) {
      router.push("/login");
      return;
    }
    setUserName(session.user?.name || "Member");
    load();
  }, [router, load]);

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
    <main className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Securing Connection...</p>
      </div>
    </main>
  );

  const activeJobs = jobs.filter(j => !["reviewed", "cancelled"].includes(j.status));
  const doneJobs = jobs.filter(j => j.status === "reviewed");
  const stats = [
    { label: "Active Requests", value: activeJobs.length, icon: <Activity size={18} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Completed Jobs", value: doneJobs.length, icon: <CheckCircle2 size={18} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Account Status", value: "Verified", icon: <ShieldCheck size={18} />, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <SupportOverlay isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
           
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              Welcome, {userName.split(" ")[0]}
            </h1>
            <p className="mt-2 text-slate-500 font-medium max-w-md">
              Oversee your property maintenance, track active contractors, and manage your service history in real-time.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Link 
              href="/dashboard/analysis" 
              className="p-3 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              title="View Insights"
            >
              <Activity size={20} />
            </Link>
            <Link 
              href="/booking" 
              className="flex items-center gap-2 rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
            >
              <Plus size={18} />
              Post New Request
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-[2rem] border border-white/50 shadow-sm flex items-center justify-between group hover:border-white transition-all"
            >
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-950">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Jobs Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-12">
            {/* Active Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity size={18} className="text-emerald-500" />
                  Active Service Requests
                </h2>
                {activeJobs.length > 0 && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />}
              </div>

              {activeJobs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-[2.5rem] border border-dashed border-slate-300 bg-white/50 p-16 text-center"
                >
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-100 text-slate-400">
                    <Wrench size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-950">System Idle</h3>
                  <p className="mt-2 text-sm text-slate-400 font-medium max-w-xs mx-auto">You don't have any active maintenance requests. Ready to fix something?</p>
                  <Link href="/booking" className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-8 py-3.5 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                    Dispatch Pro
                    <ChevronRight size={16} />
                  </Link>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {activeJobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1) }}
                    >
                      <JobCard 
                        job={job} 
                        actionLoading={actionLoading} 
                        showReview={showReview}
                        reviewData={reviewData} 
                        onConfirm={handleConfirm} 
                        onReview={handleReview}
                        onSetReview={(id, d) => setReviewData(r => ({ ...r, [id]: d }))} 
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed History */}
            {doneJobs.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                  <CheckCircle2 size={18} className="text-blue-500" />
                  Service History
                </h2>
                <div className="space-y-4">
                  {doneJobs.map(job => (
                    <JobCard 
                      key={job.id} 
                      job={job} 
                      actionLoading={actionLoading} 
                      showReview={showReview}
                      reviewData={reviewData} 
                      onConfirm={handleConfirm} 
                      onReview={handleReview}
                      onSetReview={(id, d) => setReviewData(r => ({ ...r, [id]: d }))} 
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar / Activities */}
          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Support Center</h3>
              <div className="space-y-4">
                <Link href="/help#safety" className="flex gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-colors border border-transparent hover:border-emerald-100 cursor-pointer group">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">Safety Standard</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">All pros are verified through 5-point check.</p>
                  </div>
                </Link>
                <Link href="/help#scheduling" className="flex gap-4 p-4 rounded-2xl bg-white/40 hover:bg-white/60 transition-colors border border-transparent hover:border-blue-100 cursor-pointer group">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Fast Scheduling</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1">Next-day availability on all major trades.</p>
                  </div>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => setIsSupportOpen(true)}
                  className="p-4 rounded-2xl bg-emerald-600 text-white flex flex-col gap-2 hover:bg-emerald-700 transition-all active:scale-[0.98]"
                >
                  <MessageCircle size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-left">Live Chat</span>
                </button>
                <a 
                  href="mailto:support@fixr.io"
                  className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]"
                >
                  <Mail size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-left">Email Support</span>
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100">
                <Link href="/help" className="w-full py-4 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Documentation & FAQs
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {activeJobs.length > 0 && (
              <div className="p-6 rounded-[2rem] bg-slate-950 text-white shadow-xl shadow-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={16} className="text-emerald-400" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">System Insights</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  Your requests are being handled by our AI coordinator. Pros typically respond within <span className="text-emerald-400 font-bold underline">12 minutes</span>.
                </p>
              </div>
            )}
          </div>
        </div>
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
  const isDone = job.status === "reviewed" || job.status === "cancelled";
  
  return (
    <div className={`glass rounded-[2rem] border transition-all duration-300 overflow-hidden ${
      isDone ? "border-slate-100 opacity-80" : "border-white/50 shadow-md shadow-slate-900/5"
    }`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                STATUS_COLORS[job.status] || "bg-slate-50 text-slate-600 border-slate-200"
              }`}>
                {STATUS_LABELS[job.status] || job.status}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">#{job.id.slice(-6)}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-950 leading-tight mb-2">{job.description}</h3>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {job.location}</div>
              <div className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {job.urgency}</div>
              <div className="flex items-center gap-1.5"><Wrench size={14} className="text-slate-400" /> <span className="capitalize">{job.category}</span></div>
            </div>
          </div>
          
          <div className="flex flex-col md:items-end gap-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Investment</p>
            <p className="text-3xl font-black text-slate-950">${job.quotedPrice}</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 mb-6 bg-white/30 rounded-2xl p-6 border border-white/40 shadow-inner">
          <StatusTimeline status={job.status} />
        </div>

        {/* Contractor Section */}
        {job.contractor && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-6 border-t border-slate-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  {job.contractor.logo_url ? (
                    <img src={job.contractor.logo_url} alt={job.contractor.name} className="h-full w-full rounded-2xl object-cover" />
                  ) : (
                    <span className="text-xl font-black">{job.contractor.name.charAt(0)}</span>
                  )}
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm">
                    <ShieldCheck size={12} fill="currentColor" className="text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-slate-950 leading-none">{job.contractor.name}</p>
                    {job.contractor.isVerified && (
                      <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded-md border border-blue-100">Verified Pro</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight mt-1.5">
                    {job.contractor.trade} • {job.contractor.businessType}
                    {job.contractor.rating ? ` • ⭐ ${job.contractor.rating}` : ""}
                  </p>
                </div>
              </div>
              <a 
                href={`tel:${job.contractor.telephone}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-200 px-6 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                <Phone size={16} />
                Contact Pro
              </a>
            </div>
          </motion.div>
        )}

        {/* Action Footers */}
        {["priced", "manual_dispatch_required"].includes(job.status) && (
          <div className="mt-6 flex items-center gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <p className="text-xs font-bold text-blue-700 uppercase tracking-widest">Contractor Match in Progress...</p>
          </div>
        )}

        {job.status === "completed" && showReview !== job.id && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-100"
          >
            <div className="flex items-start gap-3 mb-4">
              <Sparkles size={18} className="text-emerald-600" />
              <div>
                <p className="text-sm font-bold text-emerald-950">Maintenance Completed Successfully</p>
                <p className="text-xs text-emerald-700 font-medium mt-1">Review the work quality to release payment and finalize the record.</p>
              </div>
            </div>
            <button 
              onClick={() => onConfirm(job.id)} 
              disabled={actionLoading === job.id + "_confirm"}
              className="w-full py-4 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
            >
              {actionLoading === job.id + "_confirm" ? "Confirming..." : "Finalize & Leave Review"}
              <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        {showReview === job.id && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-8 rounded-3xl bg-slate-900 text-white">
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Star size={20} className="text-amber-400" strokeWidth={3} />
              Quality Assessment
            </h4>
            <div className="flex gap-4 mb-8">
              {[1, 2, 3, 4, 5].map(n => (
                <button 
                  key={n} 
                  onClick={() => onSetReview(job.id, { ...reviewData[job.id], rating: n })}
                  className={`h-14 flex-1 rounded-2xl flex items-center justify-center text-2xl transition-all border-2 ${
                    reviewData[job.id]?.rating >= n ? "bg-amber-400 border-amber-300 scale-105" : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <Star fill={reviewData[job.id]?.rating >= n ? "white" : "none"} size={24} className={reviewData[job.id]?.rating >= n ? "text-white" : "text-white/20"} />
                </button>
              ))}
            </div>
            <textarea 
              placeholder="Provide professional feedback (optional)..." 
              rows={3}
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-4 text-sm outline-none focus:border-amber-400 focus:bg-white/10 transition-all resize-none mb-6 placeholder:text-white/20"
              onChange={e => onSetReview(job.id, { ...reviewData[job.id], comment: e.target.value })} 
            />
            <button 
              onClick={() => onReview(job.id)} 
              disabled={!reviewData[job.id]?.rating || actionLoading === job.id + "_review"}
              className="w-full py-4 rounded-xl bg-white text-slate-900 font-black hover:bg-slate-100 disabled:opacity-20 transition-all active:scale-[0.98]"
            >
              {actionLoading === job.id + "_review" ? "Submitting..." : "Submit Formal Review"}
            </button>
          </motion.div>
        )}

        {isDone && showReview !== job.id && (
          <div className="mt-6 flex items-center gap-2 p-4 rounded-2xl bg-white/50 border border-slate-100">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Service Archieved • {job.reviews?.[0] ? `Rated ${job.reviews[0].rating}/5` : "Payment Released"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusTimeline({ status }: { status: string }) {
  const steps = [
    { key: "priced", label: "Requested" }, 
    { key: "awaiting_customer_confirmation", label: "Matching" }, 
    { key: "completed", label: "In Progress" }, 
    { key: "reviewed", label: "Finalized" }
  ];
  
  const idx = status === "manual_dispatch_required" ? 0 : Math.max(0, steps.findIndex(s => s.key === status));
  
  return (
    <div className="flex items-center w-full px-2">
      {steps.map((s, i) => {
        const isCompleted = i < idx;
        const isActive = i === idx;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative z-10">
              <motion.div 
                initial={false}
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                  isActive ? "bg-emerald-600 border-emerald-400 shadow-lg shadow-emerald-200" : 
                  isCompleted ? "bg-emerald-500 border-emerald-500" : 
                  "bg-white border-slate-200"
                }`}
              >
                {isCompleted && <CheckCircle2 size={12} className="text-white" />}
                {isActive && <div className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />}
              </motion.div>
              <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-tight whitespace-nowrap transition-colors duration-500 ${
                isActive ? "text-emerald-600" : isCompleted ? "text-slate-500" : "text-slate-300"
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1.5 mx-0 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: i < idx ? "100%" : i === idx ? "50%" : "0%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full bg-emerald-500"
                />
              </div>
            )}
          </div>
        );
      })}
      <div className="mb-4" /> {/* Spacer for labels */}
    </div>
  );
}
