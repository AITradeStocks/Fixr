"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Job, Contractor } from "@/lib/types";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/types";
import { 
  Search, 
  RefreshCcw, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  Globe,
  Activity,
  CheckCircle,
  FileText,
  Trash2,
  ChevronDown,
  MoreVertical,
  Layers,
  CheckCircle2,
  UserPlus,
  UserPlus2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const JOB_FILTERS = [
  { key: "all", label: "All Jobs", icon: Layers },
  { key: "priced", label: "Open Requests", icon: Clock },
  { key: "manual_dispatch_required", label: "Action Required", icon: AlertCircle },
  { key: "awaiting_customer_confirmation", label: "In Progress", icon: RefreshCcw },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
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
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") {
      router.push("/admin");
    }
  }, [router]);

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
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Hydrating Queue...</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Active Command</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider border border-emerald-500/20">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              Live Monitoring
            </span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Refreshed: {lastRefresh.toLocaleTimeString()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {stuck > 0 && (
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleUnstick} 
                disabled={unsticking}
                className="flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-500 disabled:opacity-50 transition-all shadow-lg shadow-orange-950/20"
              >
                <AlertCircle size={14} />
                {unsticking ? "Unsticking Operations..." : `Unstick ${stuck} Blocked Job${stuck > 1 ? "s" : ""}`}
              </motion.button>
            )}
          </AnimatePresence>
          <button 
            onClick={load} 
            className="flex items-center gap-2 rounded-xl bg-slate-900 border border-white/5 px-5 py-2.5 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
            Manual Refresh
          </button>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {[
          { label: "Total Assets", value: counts.all, icon: Layers, color: "text-white" },
          { label: "Blocked", value: stuck, icon: AlertCircle, color: stuck > 0 ? "text-orange-400" : "text-slate-500" },
          { label: "Active Operations", value: counts["awaiting_customer_confirmation"] || 0, icon: RefreshCcw, color: "text-blue-400" },
          { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400" },
          { label: "Efficiency", value: "98.2%", icon: CheckCircle2, color: "text-cyan-400" },
        ].map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative overflow-hidden group rounded-2xl border border-white/5 bg-slate-900/50 p-5 hover:border-white/10 transition-all shadow-xl"
          >
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <k.icon size={48} />
            </div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">{k.label}</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-2xl font-black tracking-tight ${k.color}`}>{k.value}</p>
            </div>
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "70%" }}
                 className={`h-full bg-gradient-to-r from-transparent to-current ${k.color}`}
               />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Command List */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                <Search size={16} />
              </div>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search by location, description, or ID..."
                className="w-full h-12 rounded-xl border border-white/5 bg-slate-900/50 pl-12 pr-4 text-sm text-white outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-600 transition-all" 
              />
            </div>
            <div className="flex gap-1.5 p-1 bg-slate-900/50 rounded-xl border border-white/5 overflow-x-auto no-scrollbar">
              {JOB_FILTERS.map(f => (
                <button 
                  key={f.key} 
                  onClick={() => setFilter(f.key)}
                  className={`flex items-center gap-2 shrink-0 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                    filter === f.key 
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" 
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <f.icon size={14} />
                  {f.label}
                  {counts[f.key] > 0 && f.key !== "all" && (
                    <span className={`ml-1 text-[10px] opacity-70`}>{counts[f.key]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-2xl border border-dashed border-white/5 py-20 text-center"
                >
                  <p className="text-sm font-bold text-slate-600 uppercase tracking-widest">No active units match parameters</p>
                </motion.div>
              ) : (
                filtered.map((job, idx) => (
                  <motion.div 
                    key={job.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`group relative rounded-2xl border bg-slate-900/40 p-5 hover:bg-slate-900 transition-all ${
                      job.status === "manual_dispatch_required" ? "border-orange-500/30" : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                            STATUS_COLORS[job.status]?.replace('bg-', 'bg-opacity-20 bg-').replace('text-', 'text-') || "bg-slate-800 text-slate-400"
                          }`}>
                            {STATUS_LABELS[job.status] || job.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded uppercase">{job.category}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            job.urgency === "urgent now" ? "text-red-400 bg-red-400/10" : "text-slate-500 bg-white/5"
                          }`}>
                            {job.urgency}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{job.description}</h3>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                           <Globe size={14} className="opacity-50" />
                           {job.location}
                        </p>
                        
                        <div className="mt-5 flex items-center gap-6">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Date Logged</span>
                             <span className="text-xs font-bold text-slate-400 mt-1">{new Date(job.createdAt).toLocaleDateString()}</span>
                           </div>
                           {job.contractor && (
                             <div className="flex flex-col">
                               <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Assigned Unit</span>
                               <div className="flex items-center gap-2 mt-1">
                                 <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-black text-emerald-500 truncate">
                                   {job.contractor.name.charAt(0)}
                                 </div>
                                 <span className="text-xs font-bold text-slate-300">{job.contractor.name}</span>
                               </div>
                             </div>
                           )}
                           <div className="flex flex-col">
                             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Registry ID</span>
                             <span className="text-[10px] font-mono text-slate-500 mt-1">{job.id.slice(0, 8)}...</span>
                           </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-2xl font-black text-white">${job.quotedPrice}</p>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">Budget Matrix</p>
                        <p className="text-xs text-slate-500 mt-0.5">${job.quotedPriceMin}–${job.quotedPriceMax}</p>
                      </div>
                    </div>

                    {/* Universal Action Overlay */}
                    <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_auto] items-end gap-x-16 gap-y-6">
                      <div className="min-w-0 max-w-2xl">
                        {["priced", "manual_dispatch_required", "assigned", "awaiting_customer_confirmation"].includes(job.status) ? (
                          <div className="min-w-0">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Tactical Unit Assignment</label>
                            <div className="flex gap-3 min-w-0">
                              <select 
                                value={selectedContractor[job.id] || ""} 
                                onChange={e => setSelectedContractor(s => ({ ...s, [job.id]: e.target.value }))}
                                className="flex-1 h-12 min-w-0 rounded-xl bg-slate-950 border border-white/5 px-4 text-xs font-bold text-slate-300 outline-none focus:border-emerald-500 transition-all"
                              >
                                <option value="">Awaiting selection...</option>
                                {contractors.filter(c => c.status === "activated").map(c => (
                                  <option key={c.id} value={c.id}>{c.name} ({c.trade?.split(",")[0] || "General"}) ⭐{c.rating || "—"}</option>
                                ))}
                              </select>
                              <button 
                                onClick={() => handleAssign(job.id)} 
                                disabled={!selectedContractor[job.id] || assigning === job.id}
                                className="h-12 px-6 shrink-0 rounded-xl bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 disabled:opacity-20 transition-all flex items-center gap-2"
                              >
                                <UserPlus2 size={16} />
                                Deploy
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 flex flex-col justify-center min-w-0">
                            <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Phase Intelligence</span>
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-emerald-500/20 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                              <p className="text-xs font-bold text-slate-500 italic truncate">
                                Unit locked. Mission currently in <span className="text-emerald-500/80">{job.status.replace(/_/g, " ")}</span> phase log.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 relative">
                         <button 
                           onClick={() => handleForceStatus(job.id, "cancelled")}
                           className="h-12 px-6 rounded-xl border border-white/5 bg-white/5 text-[10px] font-black text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all uppercase tracking-widest"
                         >
                           Abort Task
                         </button>
                         
                          <div className="relative">
                             <button 
                               onClick={(e) => {
                                 e.preventDefault();
                                 e.stopPropagation();
                                 setActiveMenuId(activeMenuId === job.id ? null : job.id);
                               }}
                               className={`h-12 w-12 flex items-center justify-center rounded-xl border transition-all ${
                                 activeMenuId === job.id ? "bg-white border-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "border-white/5 text-slate-500 hover:text-white hover:bg-white/5"
                               }`}
                             >
                               <MoreVertical size={18} />
                             </button>

                            <AnimatePresence>
                              {activeMenuId === job.id && (
                                <>
                                  <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setActiveMenuId(null)} 
                                  />
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute right-0 bottom-full mb-3 w-56 z-20 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl shadow-2xl"
                                  >
                                    <div className="p-1.5 space-y-1">
                                      {[
                                        { label: "Force: Completed", icon: CheckCircle, color: "text-emerald-400", status: "completed" },
                                        { label: "Force: Reset (Priced)", icon: RefreshCcw, color: "text-blue-400", status: "priced" },
                                        { label: "Force: Reviewed", icon: Globe, color: "text-purple-400", status: "reviewed" },
                                        { label: "System Intelligence", icon: FileText, color: "text-slate-400", status: null },
                                      ].map((act) => (
                                        <button
                                          key={act.label}
                                          onClick={() => {
                                            if (act.status) handleForceStatus(job.id, act.status);
                                            setActiveMenuId(null);
                                          }}
                                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
                                        >
                                          <act.icon size={14} className={`${act.color} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                          {act.label}
                                        </button>
                                      ))}
                                      <div className="h-px bg-white/5 my-1" />
                                      <button
                                        onClick={() => {
                                          handleForceStatus(job.id, "cancelled");
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500/60 hover:text-red-500 hover:bg-red-500/5 transition-all"
                                      >
                                        <Trash2 size={14} />
                                        Purge Record
                                      </button>
                                    </div>
                                  </motion.div>
                                </>
                              )}
                            </AnimatePresence>
                          </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Intelligence */}
        <div className="space-y-6">
          {/* Action Log Widget */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-white/5 flex items-center gap-3">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <Activity size={16} />
              </div>
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider">System Events</h3>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Runtime logs</p>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
              {actionLog.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest leading-relaxed">System standby.<br/>No manual overrides detected.</p>
                </div>
              ) : (
                actionLog.map((entry, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 text-[10px] font-bold font-mono"
                  >
                    <span className="text-emerald-500 opacity-50 shrink-0">[{entry.split(' — ')[0]}]</span>
                    <span className="text-slate-400 leading-relaxed uppercase">{entry.split(' — ')[1]}</span>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Detailed KPIs Card */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/50 p-6 shadow-2xl">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-500" />
              Resource Matrix
            </h3>
            <div className="space-y-5">
              {JOB_FILTERS.filter(f => f.key !== "all").map(f => {
                const count = counts[f.key] || 0;
                const pct = counts.all > 0 ? Math.round((count / counts.all) * 100) : 0;
                return (
                  <div key={f.key}>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-slate-500">{f.label}</span>
                      <span className="text-white">{count} <span className="text-slate-600 font-extrabold ml-1">/ {pct}%</span></span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        className="h-full rounded-full bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)] shadow-emerald-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
      `}</style>
    </div>
  );
}
