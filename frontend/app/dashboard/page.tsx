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
  Mail,
  CreditCard

} from "lucide-react";
import { SupportOverlay } from "@/components/SupportOverlay";
import { ReviewModal } from "@/components/ReviewModal";
import dynamic from "next/dynamic";

const LiveTrackingMap = dynamic(() => import("@/components/LiveTrackingMap").then(mod => mod.LiveTrackingMap), { 
  ssr: false,
  loading: () => <div className="h-[450px] bg-slate-50 rounded-[2.5rem] animate-pulse" />
});



export default function DashboardPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
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
    try { 
      await api.confirmCompletion(id); 
      setShowReview(id); 
      await load(); 
    } finally { setActionLoading(null); }
  }

  async function handleReview(id: string, rating: number, comment: string) {
    setActionLoading(id + "_review");
    try { 
      await api.reviewJob(id, rating, comment); 
      setShowReview(null); 
      await load(); 
    } finally { setActionLoading(null); }
  }

  async function handleApprovePart(jobId: string, partId: string) {
    setActionLoading(jobId + "_" + partId + "_approve");
    try {
      await api.approveJobPart(jobId, partId);
      await load();
    } finally { setActionLoading(null); }
  }

  async function handleRejectPart(jobId: string, partId: string) {
    setActionLoading(jobId + "_" + partId + "_reject");
    try {
      await api.rejectJobPart(jobId, partId);
      await load();
    } finally { setActionLoading(null); }
  }
  async function handlePayment(jobId: string) {
    setActionLoading(jobId + "_payment");
    try {
      const { url } = await api.createCheckoutSession(jobId) as { url: string };
      window.location.href = url;
    } catch (e: any) { alert(e.message); }
    finally { setActionLoading(null); }
  }

  if (loading) return (
    <main className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-16 w-16 border-4 border-emerald-600/10 border-t-emerald-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={24} className="text-emerald-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Synchronizing Portfolio</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 px-6 py-1 bg-white border border-slate-100 rounded-full">Fixr Verified Registry v3.1</p>
        </div>
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
    <main className="min-h-screen bg-mesh pb-24 pt-10 font-sans antialiased">
      <SupportOverlay isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      
      {/* Dynamic Review Modal */}
      {showReview && (() => {
        const currentJob = jobs.find(j => j.id === showReview);
        return (
          <ReviewModal 
            isOpen={!!showReview}
            onClose={() => setShowReview(null)}
            onSubmit={(r, c) => handleReview(showReview, r, c)}
            jobTitle={currentJob?.description || "Service Job"}
            contractorName={currentJob?.contractor?.name || "Professional"}
            paymentStatus={currentJob?.paymentStatus}
            quotedPrice={currentJob?.quotedPrice}
            onPay={() => handlePayment(showReview)}
          />
        );
      })()}

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Property Command</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-950 leading-[0.9]">
              Greetings, {userName.split(" ")[0]}
            </h1>
            <p className="mt-4 text-slate-500 font-medium max-w-sm leading-relaxed">
              Your real-time nexus for property integrity, maintenance intelligence, and service optimization.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <Link 
              href="/dashboard/analysis" 
              className="h-14 w-14 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-100 transition-all shadow-sm flex items-center justify-center active:scale-95 group"
              title="System Analytics"
            >
              <Activity size={20} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link 
              href="/booking" 
              className="flex items-center justify-center gap-3 rounded-2xl bg-white border border-slate-200 px-8 h-14 text-sm font-black text-slate-900 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm active:scale-95 uppercase tracking-widest"
            >
              <Plus size={20} />
              New Objective
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
              className="glass p-6 rounded-[2rem] border border-white/50 shadow-sm flex items-center justify-between group hover:border-white transition-all bg-white/40"
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
          <div className="lg:col-span-2 space-y-12">
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
                  <Link href="/booking" className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-8 py-4 text-sm font-black text-white hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
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
                        onConfirm={handleConfirm} 
                        onApprovePart={handleApprovePart}
                        onRejectPart={handleRejectPart}
                        onPay={handlePayment}
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {doneJobs.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
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
                      onConfirm={handleConfirm} 
                      onApprovePart={handleApprovePart}
                      onRejectPart={handleRejectPart}
                      onPay={handlePayment}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm bg-white/40">
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
                <button onClick={() => setIsSupportOpen(true)} className="p-4 rounded-2xl bg-emerald-600 text-white flex flex-col gap-2 hover:bg-emerald-700 transition-all active:scale-[0.98]">
                  <MessageCircle size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-left">Live Chat</span>
                </button>
                <a href="mailto:support@fixr.io" className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]">
                  <Mail size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-left">Email Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function JobCard({ job, actionLoading, showReview, onConfirm, onApprovePart, onRejectPart, onPay }: {
  job: Job; actionLoading: string | null; showReview: string | null;
  onConfirm: (id: string) => void;
  onApprovePart: (jobId: string, partId: string) => void;
  onRejectPart: (jobId: string, partId: string) => void;
  onPay: (jobId: string) => void;
}) {
  const isDone = job.status === "reviewed" || job.status === "cancelled";
  
  return (
    <div className={`glass rounded-[2rem] border transition-all duration-300 overflow-hidden ${
      isDone ? "border-slate-100 opacity-80" : "border-white/50 shadow-md shadow-slate-900/5 bg-white/80"
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
            <div className="flex flex-col items-end gap-2">
              {job.parts && job.parts.length > 0 && (
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">
                  Incl. ${job.parts.filter(p => p.status === 'APPROVED').reduce((s, p) => s + p.price, 0)} Parts
                </p>
              )}
              {job.paymentStatus === "paid" ? (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck size={10} /> Fully Paid
                </span>
              ) : (
                <button 
                  onClick={() => onPay(job.id)}
                  disabled={!!actionLoading}
                  className="mt-2 px-6 py-2.5 bg-slate-950 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.15em] hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  <CreditCard size={14} /> 
                  {actionLoading === job.id + "_payment" ? "Redirecting..." : "Settle Balance"}
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 mb-6 bg-white/30 rounded-2xl p-6 border border-white/40 shadow-inner">
          <StatusTimeline status={job.status} />
        </div>

        {/* Parts Approval Section */}
        {job.parts && job.parts.length > 0 && (
          <div className="mt-8 p-6 rounded-[2rem] bg-slate-50 border border-slate-200">
             <div className="flex items-center justify-between mb-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Mission Logistics: Parts</h4>
                <div className="h-6 w-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-[10px] font-black text-slate-900">{job.parts.length}</div>
             </div>
             
             <div className="space-y-4">
                {job.parts.map(part => (
                   <div key={part.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group transition-all hover:border-emerald-200">
                      <div>
                         <p className="font-bold text-slate-950 text-sm">{part.name}</p>
                         <p className="text-[10px] font-black text-emerald-600 italic mt-0.5">${part.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                         {part.status === 'PENDING' ? (
                            <>
                               <button 
                                  onClick={() => onRejectPart(job.id, part.id)}
                                  disabled={!!actionLoading}
                                  className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                               >
                                  {actionLoading === job.id + "_" + part.id + "_reject" ? "..." : "Reject"}
                               </button>
                               <button 
                                  onClick={() => onApprovePart(job.id, part.id)}
                                  disabled={!!actionLoading}
                                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50"
                               >
                                  {actionLoading === job.id + "_" + part.id + "_approve" ? "..." : "Approve"}
                                </button>
                            </>
                         ) : (
                            <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                               part.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                            }`}>
                               {part.status === 'APPROVED' ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                               {part.status}
                            </div>
                         )}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        )}

        {job.contractor && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm">
                  <span className="text-xl font-black">{job.contractor.name.charAt(0)}</span>
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
            </div>
          </motion.div>
        )}

        {["assigned", "awaiting_customer_confirmation"].includes(job.status) && job.customerLocation && (
          <div className="mt-8">
            <LiveTrackingMap 
              jobId={job.id} 
              destination={job.customerLocation}
              contractorName={job.contractor?.name || "Pro"}
              contractorPhone={job.contractor?.phones?.[0]?.number}
            />
          </div>
        )}


        {job.status === "completed" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
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

        {isDone && (
          <div className="mt-6 flex items-center gap-2 p-4 rounded-2xl bg-white/50 border border-slate-100">
            <CheckCircle2 size={16} className="text-emerald-500" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Service Archived • {job.reviews?.[0] ? `Rated ${job.reviews[0].rating}/5` : "Payment Released"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusTimeline({ status }: { status: string }) {
  const steps = [
    { key: "requested", label: "Requested" }, 
    { key: "matching", label: "Matching" }, 
    { key: "in_progress", label: "In Progress" }, 
    { key: "finalized", label: "Finalized" }
  ];
  
  // Map internal status to timeline index
  const statusToIdx: Record<string, number> = {
    "priced": 1,
    "manual_dispatch_required": 1,
    "assigned": 2,
    "awaiting_customer_confirmation": 2.5,
    "completed": 3,
    "reviewed": 3,
  };

  const currentProgress = statusToIdx[status] ?? 0;
  
  return (
    <div className="flex items-center w-full px-2">
      {steps.map((s, i) => {
        const isCompleted = i < Math.floor(currentProgress);
        const isActive = i === Math.floor(currentProgress);
        const isPast = i < currentProgress;
        
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center relative z-10">
              <motion.div 
                initial={false}
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                className={`h-5 w-5 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                  isActive ? "bg-emerald-600 border-emerald-400 shadow-lg shadow-emerald-200" : 
                  isPast ? "bg-emerald-500 border-emerald-500" : 
                  "bg-white border-slate-200"
                }`}
              >
                {isPast && !isActive && <CheckCircle2 size={12} className="text-white" />}
                {isActive && <div className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />}
              </motion.div>
              <span className={`absolute -bottom-8 text-[10px] font-bold uppercase tracking-tight whitespace-nowrap transition-colors duration-500 ${
                isActive ? "text-emerald-600" : isPast ? "text-slate-500" : "text-slate-300"
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-1.5 mx-0 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ 
                    width: currentProgress > i + 1 ? "100%" : 
                           currentProgress > i ? `${(currentProgress - i) * 100}%` : "0%" 
                  }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="h-full bg-emerald-500"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
