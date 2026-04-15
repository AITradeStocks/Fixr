"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  AlertCircle, 
  RefreshCcw, 
  Clock, 
  Award, 
  DollarSign, 
  Cpu,
  ChevronRight,
  Filter,
  Layers,
  Activity,
  Calendar,
  Phone,
  Layout,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  }, [router]);

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
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Compiling Intelligence...</p>
      </div>
    </div>
  );

  const maxFunnelCount = funnel ? Math.max(...funnel.stages.map(s => s.count), 1) : 1;
  const avgPrice = pricingEvents.length > 0 ? Math.round(pricingEvents.reduce((s, e) => s + e.predictedPrice, 0) / pricingEvents.length) : 0;
  const openaiCount = pricingEvents.filter(e => e.modelVersion.includes("openai")).length;
  const highConfCount = pricingEvents.filter(e => e.confidence === "high").length;
  const stuck48h = supply?.needsFirstJob || [];

  const activated = retention.filter(c => c.status === "activated" || c.status === "retained");
  const got48hJob = activated.filter(c => c.hasJobIn48h).length;
  const got7dJob = activated.filter(c => c.week1Jobs > 0).length;
  const got28dJob = activated.filter(c => c.week4Jobs > 0).length;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">System Analytics</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 px-1">
             Performance Monitoring & Resource Intelligence
          </p>
        </div>
        <button 
          onClick={load} 
          className="flex items-center gap-2 rounded-xl bg-slate-900 border border-white/5 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
        >
          <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
          Recompute Metrics
        </button>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {[
          { label: "Total Users", value: funnel?.totalUsers || 0, icon: Users, color: "text-white" },
          { label: "Active Assets", value: supply?.activated || 0, icon: Zap, color: "text-emerald-400" },
          { label: "Fill Efficiency", value: `${supply?.fillRate || 0}%`, icon: TrendingUp, color: (supply?.fillRate || 0) >= 80 ? "text-emerald-400" : "text-amber-400" },
          { label: "Pricing Events", value: pricingEvents.length, icon: DollarSign, color: "text-blue-400" },
          { label: "48h Alert", value: stuck48h.length, icon: AlertCircle, color: stuck48h.length > 0 ? "text-red-400" : "text-slate-600" },
        ].map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl border p-5 shadow-xl ${
              k.label === "48h Alert" && stuck48h.length > 0 
                ? "border-red-500/30 bg-red-500/5" 
                : "border-white/5 bg-slate-900/50"
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{k.label}</span>
              <k.icon size={14} className={k.color} />
            </div>
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Pipeline Progress Visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Leads", value: supply?.totalLeads || 0, color: "bg-slate-700", icon: Target },
          { label: "Onboarded", value: supply?.onboarded || 0, color: "bg-blue-600", icon: Layers },
          { label: "Activated", value: supply?.activated || 0, color: "bg-emerald-600", icon: Zap },
          { label: "Retained", value: supply?.retained || 0, color: "bg-purple-600", icon: Award },
        ].map((s, i, arr) => {
          const pct = arr[0].value > 0 ? Math.round((s.value / arr[0].value) * 100) : 0;
          return (
            <motion.div 
              key={s.label} 
              layout
              className="rounded-2xl border border-white/5 bg-slate-900/40 p-5 overflow-hidden group"
            >
              <div className="flex justify-between items-center mb-4">
                 <div className="p-2 rounded-lg bg-white/5 text-slate-400 group-hover:text-white transition-colors">
                   <s.icon size={16} />
                 </div>
                 <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{s.label}</span>
              </div>
              <p className="text-3xl font-black text-white">{s.value}</p>
              <div className="mt-6">
                <div className="flex justify-between items-end mb-1.5">
                   <span className="text-[10px] font-bold text-slate-500 uppercase">Lead %</span>
                   <span className="text-[10px] font-black text-white">{pct}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    className={`h-full rounded-full ${s.color} transition-all`} 
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tactical Reports (Tabs) */}
      <div className="flex bg-slate-900/50 border border-white/5 rounded-2xl p-1 mb-10 overflow-x-auto no-scrollbar max-w-3xl">
        {([
          { key: "funnel", label: "Job Conversion Hub", icon: Target },
          { key: "48h", label: "Operations Integrity", icon: AlertCircle },
          { key: "retention", label: "Retention Intelligence", icon: RefreshCcw },
          { key: "pricing", label: "Algorithmic Pricing", icon: DollarSign },
        ] as const).map(t => (
          <button 
            key={t.key} 
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
              tab === t.key 
                ? "bg-white text-slate-950 shadow-xl" 
                : "text-slate-500 hover:text-white hover:bg-white/5"
            } ${t.key === "48h" && stuck48h.length > 0 && tab !== "48h" ? "text-red-400 animate-pulse" : ""}`}
          >
            <t.icon size={16} />
            {t.label}
            {t.key === "48h" && stuck48h.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[8px]">{stuck48h.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content Areas */}
      <AnimatePresence mode="wait">
        {tab === "funnel" && funnel && (
          <motion.div 
            key="funnel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Activity size={20} />
               </div>
               <h3 className="text-xl font-black text-white tracking-tight">Conversion Funnel Visualizer</h3>
            </div>
            
            <div className="space-y-6 max-w-4xl">
              {funnel.stages.map((stage, i) => {
                const pct = Math.max(8, (stage.count / maxFunnelCount) * 100);
                const convPct = i > 0 && funnel.stages[0].count > 0 ? Math.round((stage.count / funnel.stages[0].count) * 100) : 100;
                return (
                  <div key={stage.label} className="flex items-center gap-6">
                    <div className="w-40 text-[10px] font-black text-slate-600 uppercase tracking-widest text-right shrink-0">{stage.label}</div>
                    <div className="flex-1 relative h-10 group">
                      <div className="absolute inset-y-0 left-0 bg-slate-800 rounded-2xl w-full" />
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        className="absolute inset-y-1 left-1 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 shadow-lg shadow-emerald-500/20 flex items-center justify-end pr-4"
                      >
                         <span className="text-xs font-black text-white">{stage.count}</span>
                      </motion.div>
                    </div>
                    <div className="w-16 text-xs font-black text-slate-400 shrink-0">{convPct}%</div>
                  </div>
                );
              })}
            </div>
            
            {funnel.cancelled > 0 && (
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-2 text-red-500">
                 <AlertCircle size={14} />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">{funnel.cancelled} Operational Drop-offs (Cancelled)</span>
              </div>
            )}
          </motion.div>
        )}

        {tab === "48h" && (
          <motion.div 
            key="48h"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                    <ShieldAlert size={20} />
                 </div>
                 <h3 className="text-xl font-black text-white tracking-tight">48-Hour Integrity Rule</h3>
              </div>
              <p className="text-sm font-medium text-slate-500 max-w-2xl mb-8 leading-relaxed">
                 Systems Protocol: Every activated asset must receive a job assignment within 48 hours of activation. 
                 The units listed below are currently in violation of this performance benchmark.
              </p>

              {stuck48h.length === 0 ? (
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/10 p-12 text-center">
                  <div className="h-16 w-16 rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                     <CheckCircle size={32} />
                  </div>
                  <h4 className="text-lg font-black text-white mb-2 uppercase tracking-widest">Protocol Met</h4>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.2em]">All assets are receiving active traffic</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {stuck48h.map(c => (
                    <div key={c.id} className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-6 relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-4 opacity-10">
                          <AlertCircle size={40} />
                       </div>
                       <div className="relative z-10">
                         <h4 className="text-lg font-black text-white mb-1">{c.name}</h4>
                         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{c.trade.split(",")[0]} • {c.phone}</p>
                         
                         <div className="bg-slate-950/50 p-3 rounded-2xl mb-6">
                            <span className="text-[9px] font-black text-red-500 uppercase tracking-widest block">Stagnation Alert</span>
                            <span className="text-xs font-bold text-slate-300">Active since {new Date(c.joinedAt).toLocaleDateString()}</span>
                         </div>

                         <div className="flex gap-2">
                           <a href={`tel:${c.phone}`} className="flex-1 h-10 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                             <Phone size={12} />
                             Sync Hub
                           </a>
                           <a href="/admin/jobs" className="flex-1 h-10 rounded-xl bg-emerald-600 text-white text-[9px] font-black hover:bg-emerald-500 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                             Assign Task
                           </a>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {tab === "retention" && (
          <motion.div 
            key="retention"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Cohort Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "High Response (48h)", value: got48hJob, total: activated.length, color: "text-emerald-400", icon: Zap },
                { label: "First Week Stickiness", value: got7dJob, total: activated.length, color: "text-blue-400", icon: Clock },
                { label: "Long-term Durability", value: got28dJob, total: activated.length, color: "text-purple-400", icon: Award },
              ].map(c => (
                <div key={c.label} className="rounded-3xl border border-white/5 bg-slate-900/50 p-6 shadow-xl">
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-2 rounded-xl bg-white/5 ${c.color} opacity-80`}>
                        <c.icon size={18} />
                     </div>
                     <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{c.label}</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-4">
                    <p className={`text-4xl font-black ${c.color}`}>{c.value}</p>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">/ {c.total} Units</p>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: c.total > 0 ? `${(c.value / c.total) * 100}%` : "0%" }}
                      className={`h-full rounded-full ${c.color.replace('text-', 'bg-')}`} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Granular Retention Registry */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 border-b border-white/10 flex justify-between items-center bg-slate-900">
                <div className="flex items-center gap-3">
                   <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                      <Layout size={16} />
                   </div>
                   <h3 className="text-xs font-black text-white uppercase tracking-widest">Cohort Durability Detail</h3>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{retention.length} Monitored Assets</span>
              </div>
              <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto no-scrollbar">
                {retention.map(c => (
                  <div key={c.id} className="group flex items-center justify-between px-8 py-5 hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-white group-hover:bg-emerald-600 transition-colors">
                         {c.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-white tracking-tight">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">{c.trade.split(",").join(" • ")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12 text-right">
                      <div className="hidden md:block">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                          c.hasJobIn48h ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                        }`}>
                          {c.hasJobIn48h ? "48h Threshold Met" : "48h Violation"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">{c.completedJobs} / {c.totalJobs}</p>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">Efficiency Ratio</p>
                      </div>
                      <div className="w-24 flex justify-end">
                        <span className={`rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-widest ${
                          c.status === "activated" ? "text-emerald-400 bg-emerald-400/10 border border-emerald-400/20" : 
                          c.status === "retained" ? "text-purple-400 bg-purple-400/10 border border-purple-400/20" : 
                          "text-slate-500 bg-white/5"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "pricing" && (
          <motion.div 
            key="pricing"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Estimates", value: pricingEvents.length, icon: Target, color: "text-white" },
                { label: "Mean Prediction", value: `$${avgPrice}`, icon: DollarSign, color: "text-emerald-400" },
                { label: "Confidence Index", value: `${pricingEvents.length > 0 ? Math.round((highConfCount / pricingEvents.length) * 100) : 0}%`, icon: ShieldCheck, color: "text-blue-400" },
                { label: "AI Node Count", value: openaiCount, icon: Cpu, color: "text-purple-400" },
              ].map(k => (
                <div key={k.label} className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 shadow-xl">
                  <div className="flex justify-between items-start mb-3">
                     <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{k.label}</span>
                     <k.icon size={14} className={k.color} />
                  </div>
                  <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/50 overflow-hidden shadow-2xl">
              <div className="px-8 py-5 border-b border-white/10 flex justify-between bg-slate-900">
                <div className="flex items-center gap-3">
                   <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <Activity size={16} />
                   </div>
                   <h3 className="text-xs font-black text-white uppercase tracking-widest">Algorithmic Event Log</h3>
                </div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Live Feed</span>
              </div>
              <div className="divide-y divide-white/5 max-h-[500px] overflow-y-auto no-scrollbar">
                {pricingEvents.map(e => (
                  <div key={e.id} className="px-8 py-5 hover:bg-white/5 transition-all">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white tracking-tight leading-none mb-2 truncate group-hover:text-emerald-400">{e.inputDescription}</p>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><MapPin size={12} /> {e.location}</span>
                           <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(e.createdAt).toLocaleDateString()}</span>
                           <span className={`px-2 py-0.5 rounded-full ${e.confidence === "high" ? "text-emerald-500 bg-emerald-500/10" : "text-amber-500 bg-amber-500/10"}`}>
                             CONFIDENCE: {e.confidence}
                           </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xl font-black text-white tracking-tighter">${e.predictedPrice}</p>
                        <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-1">Matrix Range</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">${e.predictedMin}–${e.predictedMax}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
