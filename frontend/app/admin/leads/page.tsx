"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { 
  Target, 
  Plus, 
  ArrowRight, 
  UserPlus, 
  Phone, 
  MapPin, 
  Tag, 
  Layers, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  X,
  Zap,
  Filter,
  MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Lead {
  id: string;
  name: string;
  phone: string;
  tradeType: string;
  suburbOrZip: string;
  source: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const PIPELINE = ["new_lead", "contacted", "responded", "interested", "onboarded", "activated", "retained", "inactive"];
const PIPELINE_LABELS: Record<string, string> = {
  new_lead: "Cold Acquisition",
  contacted: "Contact Initiated",
  responded: "Engagement Recived",
  interested: "High Interest",
  onboarded: "System Onboarded",
  activated: "Active Asset",
  retained: "Elite Partner",
  inactive: "Dormant",
};
const PIPELINE_COLORS: Record<string, string> = {
  new_lead: "text-slate-500 bg-white/5 border-white/5",
  contacted: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  responded: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  interested: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  onboarded: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  activated: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  retained: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  inactive: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [moving, setMoving] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [filter, setFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [newLead, setNewLead] = useState({ name: "", phone: "", tradeType: "plumbing", suburbOrZip: "", source: "direct", notes: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") router.push("/admin");
  }, [router]);

  const load = useCallback(async () => {
    const data = await api.getLeads();
    setLeads(data as Lead[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  async function handleMove(id: string, status: string) {
    setMoving(id + status);
    try {
      await api.moveLead(id, status);
      showToast(`Unit transitioned to "${status}"`);
      await load();
    } finally { setMoving(null); }
  }

  async function handleAdd() {
    if (!newLead.name || !newLead.phone) return;
    setAdding(true);
    try {
      await api.createLead(newLead);
      showToast("Intelligence node added");
      setNewLead({ name: "", phone: "", tradeType: "plumbing", suburbOrZip: "", source: "direct", notes: "" });
      setShowAdd(false);
      await load();
    } finally { setAdding(false); }
  }

  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);
  const counts: Record<string, number> = {};
  PIPELINE.forEach(s => { counts[s] = leads.filter(l => l.status === s).length; });

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Compiling Pipeline...</p>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* Toast Notification */}
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

      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Contractor CRM</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2 px-1">
             Management Pipeline • <span className="text-emerald-500">{leads.length} Assets Registered</span>
          </p>
        </div>
        <button 
          onClick={() => setShowAdd(s => !s)}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-black text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest"
        >
          <Plus size={16} />
          Append Intelligence
        </button>
      </div>

      {/* Pipeline Visual Funnel */}
      <div className="mb-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {PIPELINE.map((s, i) => {
            const isActive = filter === s;
            const count = counts[s] || 0;
            return (
              <motion.button 
                key={s} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilter(filter === s ? "all" : s)}
                className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                  isActive 
                    ? "bg-emerald-600 border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.02]" 
                    : "bg-slate-900/50 border-white/5 hover:border-white/10"
                }`}
              >
                <span className={`text-2xl font-black transition-colors ${isActive ? "text-white" : "text-white group-hover:text-emerald-400"}`}>
                  {count}
                </span>
                <span className={`text-[8px] font-black uppercase tracking-widest mt-1 text-center ${isActive ? "text-white/70" : "text-slate-600 group-hover:text-slate-400"}`}>
                  {PIPELINE_LABELS[s]}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-white rounded-full" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Acquisition Intelligence Input (Add Form) */}
      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-10"
          >
            <div className="rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl relative">
              <button 
                onClick={() => setShowAdd(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  <UserPlus size={20} />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">Manual Asset Registration</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { label: "Full Identity", field: "name", placeholder: "e.g. John Doe" },
                  { label: "Communication Link", field: "phone", placeholder: "+1 512 555 0100" },
                  { label: "Deployment Hub (Zip)", field: "suburbOrZip", placeholder: "78701" },
                  { label: "Acquisition Notes", field: "notes", placeholder: "Background details..." },
                ].map(({ label, field, placeholder }) => (
                  <div key={field} className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">{label}</label>
                    <input 
                      value={newLead[field as keyof typeof newLead]} 
                      onChange={e => setNewLead(n => ({ ...n, [field]: e.target.value }))}
                      placeholder={placeholder}
                      className="w-full h-12 rounded-xl bg-slate-950 border border-white/5 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500 placeholder:text-slate-800 transition-all" 
                    />
                  </div>
                ))}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">Specialty Domain</label>
                  <select 
                    value={newLead.tradeType} 
                    onChange={e => setNewLead(n => ({ ...n, tradeType: e.target.value }))}
                    className="w-full h-12 rounded-xl bg-slate-950 border border-white/5 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500"
                  >
                    {["plumbing", "electrical", "handyman", "hvac", "carpentry", "painting", "general"].map(t => (
                      <option key={t} value={t} className="capitalize">{t}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest pl-1">Acquisition Source</label>
                  <select 
                    value={newLead.source} 
                    onChange={e => setNewLead(n => ({ ...n, source: e.target.value }))}
                    className="w-full h-12 rounded-xl bg-slate-950 border border-white/5 px-4 text-xs font-bold text-white outline-none focus:border-emerald-500"
                  >
                    {["direct", "google_maps", "yelp", "craigslist", "facebook", "referral", "field"].map(s => (
                      <option key={s} value={s} className="capitalize">{s.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={handleAdd} 
                  disabled={adding || !newLead.name || !newLead.phone}
                  className="px-8 h-12 rounded-2xl bg-white text-slate-950 text-xs font-black uppercase tracking-[0.2em] hover:bg-emerald-400 active:scale-95 transition-all disabled:opacity-20 flex items-center gap-2"
                >
                  {adding ? "Writing..." : "Commit Asset"}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intelligence Grid (List of Leads) */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-white/5 py-32 text-center"
            >
              <Target size={40} className="mx-auto text-slate-800 mb-6 opacity-40" />
              <p className="text-xs font-black text-slate-700 uppercase tracking-[0.3em]">No assets in currently selected pipeline stage</p>
            </motion.div>
          ) : (
            filtered.map((lead, idx) => (
              <motion.div 
                key={lead.id}
                layout
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.01 }}
                className="group relative rounded-2xl border border-white/5 bg-slate-900/40 p-6 hover:bg-slate-900 hover:border-white/10 transition-all overflow-hidden"
              >
                {/* Background Glow */}
                <div className={`absolute top-0 right-0 w-32 h-full opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-l ${
                  lead.status === 'activated' ? 'from-emerald-500' : 'from-slate-500'
                }`} />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-800 text-sm font-black text-white group-hover:bg-emerald-600 transition-colors">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                           <h3 className="text-lg font-black text-white tracking-tight leading-none">{lead.name}</h3>
                           <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${PIPELINE_COLORS[lead.status]}`}>
                             {PIPELINE_LABELS[lead.status]}
                           </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">
                           <span className="flex items-center gap-1.5"><Phone size={12} className="opacity-40" /> {lead.phone}</span>
                           <span className="flex items-center gap-1.5"><Zap size={12} className="opacity-40" /> <span className="text-slate-400 font-black">{lead.tradeType}</span></span>
                           <span className="flex items-center gap-1.5"><MapPin size={12} className="opacity-40" /> {lead.suburbOrZip}</span>
                        </div>
                      </div>
                    </div>

                    {lead.notes && (
                      <div className="mt-4 p-3 rounded-xl bg-slate-950/50 border border-white/5">
                         <p className="text-xs text-slate-400 font-medium italic">“{lead.notes}”</p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                       <span>Source: <span className="text-slate-400">{lead.source.replace('_', ' ')}</span></span>
                       <span>Added: <span className="text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</span></span>
                       <span className="font-mono text-slate-700">ID: {lead.id.slice(0, 8)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 lg:justify-end shrink-0 max-w-sm">
                    <div className="w-full text-[10px] font-black text-slate-700 uppercase tracking-widest mb-1 lg:text-right">Transition Phase</div>
                    {PIPELINE.map(s => (
                      <button 
                        key={s} 
                        onClick={() => handleMove(lead.id, s)}
                        disabled={moving === lead.id + s || lead.status === s}
                        className={`group/btn relative px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-30 ${
                          lead.status === s 
                            ? "bg-white text-slate-950 shadow-md" 
                            : "bg-white/5 text-slate-500 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {moving === lead.id + s ? (
                          <div className="h-2.5 w-2.5 border-2 border-slate-500 border-t-white rounded-full animate-spin mx-auto" />
                        ) : s.replace("_", " ")}
                      </button>
                    ))}
                    
                    <button className="p-2 rounded-lg bg-white/5 text-slate-600 hover:text-white transition-all ml-2">
                       <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
