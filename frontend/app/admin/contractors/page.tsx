"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import type { Contractor } from "@/lib/types";
import { 
  Users, 
  Search, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Award, 
  Clock, 
  ShieldAlert,
  Globe,
  Phone,
  Mail,
  Zap,
  MoreVertical,
  X,
  Star,
  ShieldCheck,
  ExternalLink,
  MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_OPTIONS = ["onboarded", "activated", "retained", "inactive"];

interface ContractorWithJobs extends Contractor {
  jobs?: { id: string; status: string }[];
}

export default function AdminContractorsPage() {
  const router = useRouter();
  const [contractors, setContractors] = useState<ContractorWithJobs[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") router.push("/admin");
  }, [router]);

  const load = useCallback(async () => {
    try {
      const data = await api.getAdminContractors();
      setContractors(data as ContractorWithJobs[]);
    } catch {
      const data = await api.getContractors();
      setContractors(data as ContractorWithJobs[]);
    } finally {
      setLoading(false);
    }
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
      showToast(`Unit designation updated to "${status}"`);
      await load();
    } finally { setUpdating(null); }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await api.deleteContractor(id);
      showToast("Unit decommissioned");
      setSelectedId(null);
      setConfirmDelete(null);
      await load();
    } catch (e: any) {
      showToast(e.message || "Decommissioning failed");
    } finally { setDeleting(null); }
  }

  const filtered = contractors
    .filter(c => filterStatus === "all" || c.status === filterStatus)
    .filter(c => !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.trade.toLowerCase().includes(search.toLowerCase()) ||
      c.emails.some(e => e.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.postcode || "").includes(search) ||
      (c.location || "").toLowerCase().includes(search.toLowerCase())
    );

  const counts = {
    all: contractors.length,
    onboarded: contractors.filter(c => c.status === "onboarded").length,
    activated: contractors.filter(c => c.status === "activated").length,
    retained: contractors.filter(c => c.status === "retained").length,
    inactive: contractors.filter(c => c.status === "inactive").length,
  };

  const selected = contractors.find(c => c.id === selectedId) || null;

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Scanning Registry...</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-2xl flex items-center gap-3 border border-white/20"
          >
            <ShieldCheck size={18} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm delete modal */}
      <AnimatePresence>
        {confirmDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020617]/90 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-[2.5rem] bg-slate-900 border border-white/10 p-10 shadow-3xl text-center"
            >
              <div className="h-16 w-16 rounded-3xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-6">
                <ShieldAlert size={32} />
              </div>
              <h3 className="text-xl font-black text-white mb-3">Decommission Unit?</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
                This will permanently remove the contractor from the registry and abort all active assignments. 
                This action is irreversible.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => handleDelete(confirmDelete)} 
                  disabled={!!deleting}
                  className="w-full h-12 rounded-2xl bg-red-600 py-2.5 text-sm font-black text-white hover:bg-red-500 disabled:opacity-50 transition-all uppercase tracking-widest shadow-lg shadow-red-950/20"
                >
                  {deleting ? "Decommissioning..." : "Terminate Identity"}
                </button>
                <button 
                  onClick={() => setConfirmDelete(null)}
                  className="w-full h-12 rounded-2xl border border-white/5 py-2.5 text-sm font-bold text-slate-500 hover:text-white hover:bg-white/5 transition-all"
                >
                  Abort Deletion
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Contractor Registry</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{contractors.length} Verified identities on file</p>
        </div>
      </div>

      {/* KPI Funnel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Onboarded", value: counts.onboarded, icon: Clock, color: "text-blue-400" },
          { label: "Activated", value: counts.activated, icon: Zap, color: "text-emerald-400" },
          { label: "Elite/Retained", value: counts.retained, icon: Award, color: "text-purple-400" },
          { label: "Inactive", value: counts.inactive, icon: ShieldAlert, color: "text-slate-600" },
        ].map((k, i) => (
          <motion.div 
            key={k.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/5 bg-slate-900/50 p-5 shadow-xl"
          >
            <div className="flex justify-between items-start mb-3">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{k.label}</p>
              <k.icon size={14} className={k.color} />
            </div>
            <p className={`text-2xl font-black ${k.color}`}>{k.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Database Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 group">
           <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors">
             <Search size={16} />
           </div>
           <input 
             value={search} 
             onChange={e => setSearch(e.target.value)} 
             placeholder="Search registry by name, specialty, location..."
             className="w-full h-12 rounded-xl border border-white/5 bg-slate-900/50 pl-12 pr-4 text-sm text-white outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 placeholder:text-slate-700 transition-all font-medium" 
           />
        </div>
        <div className="flex bg-slate-900/50 border border-white/5 rounded-xl p-1 shrink-0 overflow-x-auto no-scrollbar">
          {["all", ...STATUS_OPTIONS].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                filterStatus === s 
                  ? "bg-white text-slate-950 shadow-lg" 
                  : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-8 ${selectedId ? "lg:grid-cols-2" : "grid-cols-1"}`}>
        {/* Unit List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-dashed border-white/5 py-20 text-center"
              >
                <Users size={32} className="mx-auto text-slate-800 mb-4" />
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">No matching units found in registry</p>
              </motion.div>
            ) : (
              filtered.map((c, idx) => {
                const jobCount = c.jobs?.length || 0;
                const activeJobs = c.jobs?.filter(j => !["reviewed","cancelled"].includes(j.status)).length || 0;
                const isActive = selectedId === c.id;

                return (
                  <motion.div
                    key={c.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.01 }}
                    onClick={() => setSelectedId(isActive ? null : c.id)}
                    className={`group relative rounded-2xl border bg-slate-900/40 p-6 cursor-pointer transition-all hover:bg-slate-900 ${
                      isActive ? "border-emerald-500/50 ring-4 ring-emerald-500/5 bg-slate-900" : "border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6 flex-wrap lg:flex-nowrap">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative shrink-0">
                           <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-lg font-black text-emerald-500 overflow-hidden shadow-2xl">
                             {c.logo_url ? <img src={c.logo_url} alt={c.name} className="h-full w-full object-cover" /> : c.name.charAt(0)}
                           </div>
                           <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-slate-900 ${
                             c.status === "activated" ? "bg-emerald-500" : c.status === "onboarded" ? "bg-blue-500" : "bg-slate-600"
                           }`} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-black text-white tracking-tight truncate">{c.name}</p>
                            {c.isVerified && <ShieldCheck size={14} className="text-blue-500 shrink-0" />}
                            {c.isContactVerified && <CheckCircle size={14} className="text-emerald-500 shrink-0" />}
                          </div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest truncate">{c.trade?.split(",").join(" • ") || "General"}</p>
                          <div className="flex gap-3 text-[10px] text-slate-600 mt-2 font-mono">
                            <span className="flex items-center gap-1"><Phone size={10} /> {c.phones?.[0]?.number || "N/A"}</span>
                            <span className="flex items-center gap-1"><MapPin size={10} /> {c.postcode || "N/A"}</span>
                          </div>
                        </div>
                      </div>


                      <div className="flex flex-col items-end gap-3 shrink-0 ml-auto">
                        <div className="flex items-center gap-1.5">
                           <Star size={12} className="text-amber-400 fill-amber-400" />
                           <span className="text-sm font-black text-white">{c.rating != null ? c.rating.toFixed(1) : "—"}</span>
                        </div>
                        <div className="flex gap-1">
                           <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400 tracking-wider">
                             {activeJobs} Active Tasks
                           </span>
                        </div>
                        <div className="flex gap-1 flex-wrap justify-end">
                          {STATUS_OPTIONS.map(s => (
                            <button key={s} onClick={e => { e.stopPropagation(); handleStatusChange(c.id, s); }}
                              disabled={c.status === s || updating === c.id}
                              className={`rounded-lg px-2.5 py-1 text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-20 ${c.status === s
                                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                                : "text-slate-600 hover:text-slate-400 hover:bg-white/5"}`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Intelligence Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="rounded-3xl border border-white/10 bg-slate-900 p-8 lg:sticky lg:top-24 shadow-3xl max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-[2rem] bg-slate-800 flex items-center justify-center text-xl font-black text-emerald-500 shrink-0 shadow-2xl overflow-hidden border border-white/5">
                    {selected.logo_url ? <img src={selected.logo_url} alt={selected.name} className="h-full w-full object-cover" /> : selected.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">{selected.name}</h2>
                    {selected.headline && <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">{selected.headline}</p>}
                    <div className="flex items-center gap-3 mt-3">
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                         selected.status === "activated" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-slate-800 text-slate-500"
                       }`}>
                         Unit Status: {selected.status}
                       </span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedId(null)} 
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white transition-all outline-none"
                >
                  <X size={20} />
                </button>
              </div>

              {selected.about && (
                <div className="mb-8">
                   <p className="text-xs font-black text-slate-600 uppercase tracking-widest mb-3">Transmission Message / Bio</p>
                   <p className="text-sm text-slate-400 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl italic">“{selected.about}”</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-x-8 gap-y-1 mb-10">
                {[
                  { label: "Designation", value: selected.trade?.split(",").join(" • ") || "General", icon: Globe },
                  { label: "Operation Hub", value: selected.location || "N/A", icon: MapPin },
                  { label: "ABN Sync", value: selected.abn || "Not Provided", icon: ShieldAlert },
                  { label: "Legal Licenses", value: selected.licenses?.length > 0 ? selected.licenses.join(", ") : "None Verified", icon: Award },
                  { label: "Registry Code", value: selected.id.toUpperCase().slice(0, 8), icon: Zap },
                  { label: "Identity Check", value: selected.isVerified ? "POSITIVE" : "PENDING", icon: ShieldCheck },
                ].map((item) => (
                  <div key={item.label} className="py-3 border-b border-white/5 flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                       <item.icon size={10} />
                       {item.label}
                    </span>
                    <span className="text-xs font-bold text-slate-300 truncate">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-6 mb-10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Contact Verification Registry</p>
                
                <div className="space-y-4">
                  {/* Emails */}
                  {selected.emails?.map((e: any) => (
                    <div key={e.id || e.email} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group/contact">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${e.isVerified ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-500"}`}>
                          <Mail size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{e.email}</p>
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-0.5">{e.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {e.isVerified ? (
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <CheckCircle size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-slate-600 font-mono italic group-hover/contact:hidden">
                              <Clock size={12} />
                              <span className="text-[9px] font-black uppercase tracking-widest">Pending</span>
                            </div>
                            <button 
                              onClick={async () => {
                                try {
                                  await api.adminVerifyEmail(selected.id, e.id);
                                  showToast(`${e.email} forced verified`);
                                  await load();
                                } catch (err: any) {
                                  showToast(err.message || "Verification failed");
                                }
                              }}
                              className="hidden group-hover/contact:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-950/20"
                            >
                              <ShieldCheck size={10} />
                              Force Verify
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Phones */}
                  {selected.phones?.map((p: any) => (
                    <div key={p.id || p.number} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group/contact">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${p.isVerified ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-800 text-slate-500"}`}>
                          <Phone size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{p.number}</p>
                          <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-0.5">{p.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {p.isVerified ? (
                          <div className="flex items-center gap-1.5 text-emerald-500">
                            <CheckCircle size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Verified</span>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-1.5 text-amber-500/50 group-hover/contact:hidden">
                              <ShieldAlert size={12} />
                              <span className="text-[9px] font-black uppercase tracking-widest">Unverified</span>
                            </div>
                            <button 
                              onClick={async () => {
                                try {
                                  await api.adminVerifyPhone(selected.id, p.id);
                                  showToast(`${p.number} forced verified`);
                                  await load();
                                } catch (err: any) {
                                  showToast(err.message || "Verification failed");
                                }
                              }}
                              className="hidden group-hover/contact:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest transition-all hover:bg-emerald-500 shadow-lg shadow-emerald-950/20"
                            >
                              <ShieldCheck size={10} />
                              Force Verify
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>



              <div className="space-y-3 pt-6">
                {selected.website && (
                  <a 
                    href={selected.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-2xl bg-white/5 border border-white/5 text-xs font-black text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-[0.2em]"
                  >
                    Outer Link Node
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => setConfirmDelete(selected.id)}
                  className="w-full h-12 rounded-2xl border border-red-500/20 text-[10px] font-black text-red-500/70 hover:text-red-500 hover:bg-red-500/5 transition-all uppercase tracking-[0.2em]"
                >
                  Decommission Unit
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
}
