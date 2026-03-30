"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getSession } from "@/lib/auth";

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
const PIPELINE_COLORS: Record<string, string> = {
  new_lead: "bg-slate-700 text-slate-300",
  contacted: "bg-blue-900/50 text-blue-400",
  responded: "bg-cyan-900/50 text-cyan-400",
  interested: "bg-amber-900/50 text-amber-400",
  onboarded: "bg-indigo-900/50 text-indigo-400",
  activated: "bg-emerald-900/50 text-emerald-400",
  retained: "bg-purple-900/50 text-purple-400",
  inactive: "bg-red-900/30 text-red-500",
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
  }, []);

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
      showToast(`Lead moved to "${status}"`);
      await load();
    } finally { setMoving(null); }
  }

  async function handleAdd() {
    if (!newLead.name || !newLead.phone) return;
    setAdding(true);
    try {
      await api.createLead(newLead);
      showToast("Lead added");
      setNewLead({ name: "", phone: "", tradeType: "plumbing", suburbOrZip: "", source: "direct", notes: "" });
      setShowAdd(false);
      await load();
    } finally { setAdding(false); }
  }

  const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);
  const counts: Record<string, number> = {};
  PIPELINE.forEach(s => { counts[s] = leads.filter(l => l.status === s).length; });

  if (loading) return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <p className="text-slate-400 text-sm">Loading...</p>
    </main>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      {toast && (
        <div className="fixed top-4 right-4 z-50 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">{toast}</div>
      )}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">CRM — Contractor Leads</h1>
            <p className="text-xs text-slate-500 mt-0.5">{leads.length} total leads in pipeline</p>
          </div>
          <button onClick={() => setShowAdd(s => !s)}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors">
            + Add lead
          </button>
        </div>

        {/* Pipeline funnel row */}
        <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-6">
          {PIPELINE.map(s => (
            <button key={s} onClick={() => setFilter(filter === s ? "all" : s)}
              className={`rounded-xl border p-2.5 text-center transition-colors ${filter === s ? "border-emerald-500 bg-emerald-900/30" : "border-slate-800 bg-slate-900 hover:border-slate-700"}`}>
              <p className="text-lg font-bold text-white">{counts[s] || 0}</p>
              <p className="text-xs text-slate-500 capitalize mt-0.5">{s.replace("_", " ")}</p>
            </button>
          ))}
        </div>

        {/* Add lead form */}
        {showAdd && (
          <div className="rounded-xl border border-emerald-800 bg-slate-900 p-5 mb-5">
            <h3 className="text-sm font-semibold text-white mb-4">Add new lead</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Name *", field: "name", placeholder: "Tom Brady" },
                { label: "Phone *", field: "phone", placeholder: "+1 512 555 0100" },
                { label: "Zip / Suburb", field: "suburbOrZip", placeholder: "78701" },
                { label: "Notes", field: "notes", placeholder: "Met at trade show..." },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="text-xs text-slate-400 font-medium">{label}</label>
                  <input value={newLead[field as keyof typeof newLead]} onChange={e => setNewLead(n => ({ ...n, [field]: e.target.value }))}
                    placeholder={placeholder}
                    className="mt-1 w-full h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500 placeholder:text-slate-600" />
                </div>
              ))}
              <div>
                <label className="text-xs text-slate-400 font-medium">Trade</label>
                <select value={newLead.tradeType} onChange={e => setNewLead(n => ({ ...n, tradeType: e.target.value }))}
                  className="mt-1 w-full h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500">
                  {["plumbing", "electrical", "handyman", "hvac", "carpentry", "painting", "general"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-medium">Source</label>
                <select value={newLead.source} onChange={e => setNewLead(n => ({ ...n, source: e.target.value }))}
                  className="mt-1 w-full h-9 rounded-lg border border-slate-700 bg-slate-800 px-3 text-sm text-white outline-none focus:border-emerald-500">
                  {["direct", "google_maps", "yelp", "craigslist", "facebook", "referral", "field"].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={handleAdd} disabled={adding || !newLead.name || !newLead.phone}
                className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors">
                {adding ? "Adding..." : "Add lead"}
              </button>
              <button onClick={() => setShowAdd(false)}
                className="rounded-lg border border-slate-700 px-5 py-2 text-sm text-slate-400 hover:bg-slate-800 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Leads list */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-800 p-8 text-center text-sm text-slate-500">
              No leads in this stage
            </div>
          )}
          {filtered.map(lead => (
            <div key={lead.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-white text-sm">{lead.name}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PIPELINE_COLORS[lead.status] || "bg-slate-700 text-slate-400"}`}>
                      {lead.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{lead.phone} · <span className="capitalize">{lead.tradeType}</span> · {lead.suburbOrZip}</p>
                  <p className="text-xs text-slate-600 mt-0.5">Source: {lead.source} · Added {new Date(lead.createdAt).toLocaleDateString()}</p>
                  {lead.notes && <p className="text-xs text-slate-500 mt-0.5 italic">"{lead.notes}"</p>}
                </div>
                <div className="flex flex-wrap gap-1">
                  {PIPELINE.filter(s => s !== lead.status).map(s => (
                    <button key={s} onClick={() => handleMove(lead.id, s)}
                      disabled={moving === lead.id + s}
                      className="rounded-lg border border-slate-700 px-2 py-0.5 text-xs text-slate-400 hover:bg-slate-800 capitalize transition-colors disabled:opacity-50">
                      {moving === lead.id + s ? "..." : s.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
