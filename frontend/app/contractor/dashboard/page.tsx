"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth";
import { api } from "@/lib/api";
import type { Job, Contractor } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  LogOut, 
  Bell, 
  Search,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  DollarSign,
  User,
  ExternalLink,
  Zap,
  Filter,
  X,
  Layers,
  Globe,
  Navigation,
  Check,
  TrendingUp,
  History,
  Settings,
  Plus,
  RefreshCcw,
  ArrowRight,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { ContractorTracking } from "@/components/ContractorTracking";


type TabId = "marketplace" | "tasks" | "earnings" | "profile";

export default function EnterpriseContractorDashboard() {
  const router = useRouter();
  const [contractor, setContractor] = useState<Contractor | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("marketplace");
  const [showAllMarketplace, setShowAllMarketplace] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);

  // Profile Edit State
  const [editZips, setEditZips] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Verification State
  const [verifying, setVerifying] = useState<{ type: "email" | "phone"; value: string } | null>(null);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifyingLoading, setIsVerifyingLoading] = useState(false);
  
  // Parts State
  const [newPart, setNewPart] = useState({ name: "", price: "" });
  const [addingPart, setAddingPart] = useState(false);



  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "contractor") {
      router.push("/contractor/login?redirect=/contractor/dashboard");
      return;
    }
    loadData();
  }, [router]);

  async function loadData() {
    setLoading(true);
    try {
      const [me, allJobs] = await Promise.all([
        api.getContractorMe() as Promise<Contractor>,
        api.getJobs() as Promise<Job[]>
      ]);
      setContractor(me);
      setJobs(allJobs);
      setEditZips(me.zipCodes.join(", "));
    } catch (err) {
      console.error("Dashboard sync error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }

  // --- Memos for Dynamic Data ---
  
  const marketplaceJobs = useMemo(() => {
    return jobs.filter(j => 
      (j.status === "priced" || j.status === "manual_dispatch_required") && 
      !j.contractorId
    ).filter(j => {
      if (showAllMarketplace) return true;
      const zips = contractor?.zipCodes || [];
      return zips.length === 0 || zips.includes(j.postcode || "");
    });
  }, [jobs, showAllMarketplace, contractor]);

  const workloadJobs = useMemo(() => {
    if (!contractor) return [];
    return jobs.filter(j => 
      j.contractorId === contractor.id && 
      ["assigned", "awaiting_customer_confirmation"].includes(j.status)
    );
  }, [jobs, contractor]);

  const historyJobs = useMemo(() => {
    if (!contractor) return [];
    return jobs.filter(j => 
       j.contractorId === contractor.id && 
       ["completed", "reviewed"].includes(j.status)
    );
  }, [jobs, contractor]);

  const earningsTotal = useMemo(() => {
    return historyJobs
      .filter(j => j.paymentStatus === "paid")
      .reduce((sum, j) => sum + (j.quotedPrice || 0), 0);
  }, [historyJobs]);

  // --- Handlers ---

  async function acceptJob(id: string) {
    if (!contractor) return;
    setActionId(id);
    try {
      await api.acceptJob(id, contractor.id);
      setSelectedJob(null);
      await loadData();
      setActiveTab("tasks");
    } catch (e: any) { alert(e.message); }
    finally { setActionId(null); }
  }

  async function completeJob(id: string) {
    setActionId(id);
    try {
      await api.completeJob(id);
      setSelectedJob(null);
      await loadData();
      setActiveTab("earnings");
    } catch (e: any) { alert(e.message); }
    finally { setActionId(null); }
  }

  const handleLogout = () => {
    clearSession();
    router.push("/contractor/login");
  };

  async function updateProfile() {
    setUpdatingProfile(true);
    try {
      const zipCodes = editZips.split(",").map(z => z.trim()).filter(Boolean);
      await api.updateContractorMe({ zipCodes });
      await loadData();
    } catch (e: any) { alert(e.message); }
    finally { setUpdatingProfile(false); }
  }

  async function handleRequestVerification(type: "email" | "phone", value: string) {
    try {
      await api.requestVerification({ type, target: value });
      setVerifying({ type, value });
      setVerificationCode("");
    } catch (e: any) { alert(e.message); }
  }


  async function handleSubmitVerification() {
    if (!verifying) return;
    setIsVerifyingLoading(true);
    try {
      await api.submitVerification({ 
        type: verifying.type, 
        target: verifying.value, 
        code: verificationCode 
      });

      setVerifying(null);
      await loadData();
      alert("Verification successful!");
    } catch (e: any) { alert(e.message); }
    finally { setIsVerifyingLoading(false); }
  }

  async function handleAddPart(jobId: string) {
    if (!newPart.name || !newPart.price) return;
    setAddingPart(true);
    try {
      await api.addJobPart(jobId, { name: newPart.name, price: parseFloat(newPart.price) });
      setNewPart({ name: "", price: "" });
      // Refresh job data to show new part
      const updatedJob = await api.getJob(jobId) as Job;
      setSelectedJob(updatedJob);
      await loadData();
    } catch (e: any) { alert(e.message); }
    finally { setAddingPart(false); }
  }



  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
        >
          <div className="h-14 w-14 border-[5px] border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">Enterprise Sync</h2>
            <p className="text-slate-500 text-sm font-medium mt-1 italic tracking-wide">Retrieving secure mission data...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
      
      {/* Top Smart Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 px-8">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-slate-950 rounded-[14px] flex items-center justify-center text-white font-black text-lg transition-transform group-hover:rotate-6">F</div>
              <span className="text-2xl font-black tracking-tighter text-slate-950">FIXR <span className="text-emerald-600">PRO</span></span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-1.5 p-1.5 bg-slate-100/80 rounded-[20px] border border-slate-200">
              {(["marketplace", "tasks", "earnings", "profile"] as TabId[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-[14px] text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-slate-950 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-900'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
                onClick={handleRefresh}
                className={`p-3 rounded-[16px] bg-slate-50 border border-slate-200 text-slate-400 hover:text-emerald-600 transition-all ${refreshing ? 'animate-spin' : ''}`}
            >
                <RefreshCcw size={18} />
            </button>
            <div className="h-10 w-[1px] bg-slate-200" />
            <div className="flex items-center gap-4">
               <div className="text-right">
                  <p className="text-sm font-black text-slate-950 leading-none">{contractor?.name}</p>
                  <p className="text-[10px] font-black text-emerald-600 tracking-widest mt-1 uppercase italic leading-none">{contractor?.trade}</p>
               </div>
               <button 
                onClick={handleLogout}
                className="p-3 rounded-[16px] bg-rose-50 border border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
               >
                  <LogOut size={18} />
               </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="pt-32 pb-24 px-8 max-w-[1600px] mx-auto">
        
        {/* Dynamic Summary Bar */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { label: "Market Flow", value: marketplaceJobs.length, icon: <Navigation size={22} />, color: "emerald", sub: "Live Jobs" },
            { label: "Pending Tasks", value: workloadJobs.length, icon: <Layers size={22} />, color: "blue", sub: "Active Now" },
            { label: "Net Revenue", value: `$${earningsTotal.toLocaleString()}`, icon: <TrendingUp size={22} />, color: "purple", sub: "Completed" },
            { label: "Reliability", value: contractor?.rating || "5.0", icon: <CheckCircle2 size={22} />, color: "amber", sub: "Verified" },
          ].map((s, i) => (
            <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-900/[0.03] transition-all flex items-center gap-8 relative overflow-hidden group"
            >
              <div className={`h-16 w-16 rounded-[22px] bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center transition-transform group-hover:scale-110`}>
                {s.icon}
              </div>
              <div className="relative z-10">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                <h3 className="text-3xl font-black text-slate-950 tracking-tighter">{s.value}</h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{s.sub}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <AnimatePresence mode="wait">
          {/* Marketplace Content */}
          {activeTab === "marketplace" && (
            <motion.div key="market" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                 <div>
                    <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">Service Marketplace</h2>
                    <p className="text-slate-500 font-medium italic">Discover premium service requests that match your expertise and location standards.</p>
                 </div>
                 
                 <div className="flex items-center gap-3 p-2 bg-slate-200/50 rounded-[22px] border border-slate-200">
                    <button 
                        onClick={() => setShowAllMarketplace(false)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-[16px] text-xs font-black uppercase tracking-widest transition-all ${!showAllMarketplace ? 'bg-white text-slate-950 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
                    >
                        <MapPin size={16} /> Local
                    </button>
                    <button 
                        onClick={() => setShowAllMarketplace(true)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-[16px] text-xs font-black uppercase tracking-widest transition-all ${showAllMarketplace ? 'bg-white text-slate-950 shadow-md ring-1 ring-slate-200' : 'text-slate-400'}`}
                    >
                        <Globe size={16} /> All Jobs
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {marketplaceJobs.map((job) => (
                  <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />
                ))}
                {marketplaceJobs.length === 0 && (
                  <div className="col-span-full py-32 text-center rounded-[50px] border-2 border-dashed border-slate-200 bg-white/50">
                    <div className="h-24 w-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight italic">No missions detected.</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium">Try expansion in your PROFILE to see more jobs, or toggle GLOBAL VIEW above.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Active Workload Content */}
          {activeTab === "tasks" && (
            <motion.div key="tasks" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
              <div className="mb-12">
                 <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">Command Center</h2>
                 <p className="text-slate-500 font-medium italic">Manage active missions, customer interactions, and service protocols.</p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {workloadJobs.map((job) => (
                  <WorkloadItem key={job.id} job={job} onAction={() => setSelectedJob(job)} />
                ))}
                {workloadJobs.length === 0 && (
                  <div className="py-32 text-center rounded-[50px] border-2 border-dashed border-slate-200 bg-white/50">
                    <h3 className="text-2xl font-black text-slate-950 mb-3 tracking-tight italic">Schedule is clear.</h3>
                    <p className="text-slate-500 max-w-sm mx-auto font-medium">Claim work from the Marketplace to populate your command center.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Earnings & Analytics */}
          {activeTab === "earnings" && (
            <motion.div key="earnings" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
               <div className="mb-12">
                 <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">Revenue Analytics</h2>
                 <p className="text-slate-500 font-medium italic">Detailed breakdown of fulfilled commissions and fiscal performance.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-3">
                      <History size={16} />
                      Fulfilled History
                   </h3>
                   <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Mission</th>
                            <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                            <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Payout</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {historyJobs.map(j => (
                            <tr key={j.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-6">
                                <p className="text-slate-950 font-bold">{j.description}</p>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">{j.category}</p>
                              </td>
                              <td className="px-8 py-6 text-sm text-slate-500">
                                {new Date(j.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-8 py-6 text-right font-black text-emerald-600 italic">
                                +${j.quotedPrice}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {historyJobs.length === 0 && (
                        <div className="p-20 text-center text-slate-400 italic text-sm">No transaction history detected.</div>
                      )}
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="p-10 rounded-[40px] bg-slate-950 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-8 opacity-10">
                        <DollarSign size={80} />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-6">Wallet Balance</p>
                      <h4 className="text-6xl font-black italic tracking-tighter mb-4">${earningsTotal.toLocaleString()}</h4>
                      <p className="text-slate-500 text-xs font-medium">Ready for next-day professional dispersal.</p>
                      <button className="w-full mt-10 py-5 bg-white text-slate-950 font-bold rounded-[22px] hover:bg-emerald-500 hover:text-white transition-all shadow-xl shadow-white/5 active:scale-95">
                        Withdraw Commissions
                      </button>
                   </div>
                   
                   <div className="p-8 rounded-[40px] bg-white border border-slate-200">
                      <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                         <TrendingUp size={16} className="text-emerald-500" /> Performance Metric
                      </h4>
                      <div className="space-y-6">
                         {[
                           { label: "Acceptance Rate", val: "94%" },
                           { label: "Time-on-Mission", val: "1.4h" },
                           { label: "Protocol Compliance", val: "100%" },
                         ].map((m, i) => (
                           <div key={i} className="flex items-center justify-between">
                             <p className="text-xs text-slate-500 font-bold">{m.label}</p>
                             <p className="text-xs font-black italic text-slate-950">{m.val}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Profile Content */}
          {activeTab === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
               <div className="mb-12">
                 <h2 className="text-4xl font-black text-slate-950 tracking-tighter mb-2">Professional Identity</h2>
                 <p className="text-slate-500 font-medium italic">Manage your enterprise profile, licensed skills, and designated service zones.</p>
              </div>

              <div className="max-w-4xl bg-white rounded-[50px] border border-slate-200 overflow-hidden shadow-sm">
                 <div className="bg-slate-50 p-12 border-b border-slate-200 flex items-center gap-10">
                    <div className="h-28 w-28 bg-emerald-600 rounded-[35px] flex items-center justify-center text-white text-4xl font-black italic shadow-2xl shadow-emerald-500/30">
                       {contractor?.name[0]}
                    </div>
                    <div>
                        <h4 className="text-3xl font-black text-slate-950 tracking-tight">{contractor?.name}</h4>
                        <div className="flex gap-4 mt-3">
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">{contractor?.trade} Professional</span>
                            <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-1.5"><ShieldCheck size={12} /> ID-Vetted</span>
                        </div>
                    </div>
                 </div>

                 <div className="p-12 space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="space-y-4">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Designated Postcodes</label>
                          <textarea 
                            value={editZips}
                            onChange={(e) => setEditZips(e.target.value)}
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-[22px] p-6 text-sm font-bold text-slate-950 outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all resize-none"
                            placeholder="e.g. 2000, 2010, 2030"
                          />
                          <p className="text-[10px] text-slate-400 italic">Separate with commas. Only jobs in these areas appear in Filtered Market View.</p>
                       </div>

                       <div className="space-y-8">
                           <div className="space-y-4">
                              <label className="text-xs font-black uppercase tracking-widest text-slate-400">Contact PROTOCOLS (Verified: {contractor?.isContactVerified ? 'YES' : 'NO'})</label>
                              
                              <div className="space-y-4">
                                 {/* Emails Section */}
                                 <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Registered Email Nodes</p>
                                    {contractor?.emails.map((e) => (
                                       <div key={e.id} className="p-4 bg-slate-50 border border-slate-100 rounded-[22px] flex items-center justify-between group transition-all hover:border-emerald-200">
                                          <div className="flex items-center gap-4">
                                             <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${e.isVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                                                <Mail size={16} />
                                             </div>
                                             <div>
                                                <p className="font-bold text-slate-950 text-sm">{e.email}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{e.type}</p>
                                             </div>
                                          </div>
                                          {e.isVerified ? (
                                             <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                                                <CheckCircle2 size={12} />
                                                <span className="text-[10px] font-black uppercase">Verified</span>
                                             </div>
                                          ) : (
                                             <button 
                                                onClick={() => handleRequestVerification("email", e.email)}
                                                className="px-4 py-1.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all opacity-0 group-hover:opacity-100"
                                             >
                                                Verify Node
                                             </button>
                                          )}
                                       </div>
                                    ))}
                                 </div>

                                 {/* Phones Section */}
                                 <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Voice & Text Channels</p>
                                    {contractor?.phones.map((p) => (
                                       <div key={p.id} className="p-4 bg-slate-50 border border-slate-100 rounded-[22px] flex items-center justify-between group transition-all hover:border-emerald-200">
                                          <div className="flex items-center gap-4">
                                             <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${p.isVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                                                <Phone size={16} />
                                             </div>
                                             <div>
                                                <p className="font-bold text-slate-950 text-sm">{p.number}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.type}</p>
                                             </div>
                                          </div>
                                          {p.isVerified ? (
                                             <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full">
                                                <CheckCircle2 size={12} />
                                                <span className="text-[10px] font-black uppercase">Verified</span>
                                             </div>
                                          ) : (
                                             <button 
                                                onClick={() => handleRequestVerification("phone", p.number)}
                                                className="px-4 py-1.5 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-emerald-600 transition-all opacity-0 group-hover:opacity-100"
                                             >
                                                Verify Channel
                                             </button>
                                          )}
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                       </div>

                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-end">
                       <button 
                        onClick={updateProfile}
                        disabled={updatingProfile}
                        className="px-10 py-5 bg-slate-950 text-white rounded-[22px] font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 flex items-center gap-3"
                       >
                          {updatingProfile ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Settings size={18} />}
                          Commit Profile Changes
                       </button>
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Unified Mission Modal */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[50px] shadow-[0_32px_120px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col max-h-[90vh]"
            >
                <div className="p-12 overflow-y-auto custom-scrollbar">

                   <div className="flex justify-between items-start mb-10">
                      <div>
                         <div className="flex items-center gap-3 mb-4">
                           <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">{selectedJob.category}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                              <RefreshCcw size={12} className={actionId === selectedJob.id ? 'animate-spin' : ''} />
                              {selectedJob.status.replace(/_/g, " ")}
                           </span>
                         </div>
                         <h2 className="text-3xl font-black text-slate-950 tracking-tighter leading-tight italic">{selectedJob.description}</h2>
                      </div>
                      <button onClick={() => setSelectedJob(null)} className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-all text-slate-500 mt-2">
                         <X size={24} />
                      </button>
                   </div>

                   <div className="grid grid-cols-2 gap-12 mb-12">
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Objective</label>
                         <p className="text-lg font-bold text-slate-950 mb-1">{selectedJob.address || "Address Reserved"}</p>
                         <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                            <MapPin size={14} className="text-emerald-600" />
                            {selectedJob.location} {selectedJob.postcode}
                         </div>
                         {selectedJob.address && (
                            <a 
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedJob.address + " " + selectedJob.location)}`} 
                                target="_blank"
                                className="mt-4 flex items-center gap-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:text-emerald-500 transition-all"
                            >
                                <ExternalLink size={14} /> Open Secure Navigation
                            </a>
                         )}
                      </div>
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission Scale</label>
                         <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-black italic text-slate-950 tracking-tighter">${selectedJob.quotedPrice}</span>
                            <span className="text-emerald-600 font-black text-sm uppercase">Fixed</span>
                         </div>
                         <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                            <Clock size={12} /> {selectedJob.estimatedTimeMinutes} Min Workflow
                         </div>
                      </div>
                   </div>

                   {contractor && ["assigned", "awaiting_customer_confirmation"].includes(selectedJob.status) && selectedJob.contractorId === contractor.id && selectedJob.customerLocation && (
                     <div className="mb-12">
                       <ContractorTracking 
                         jobId={selectedJob.id} 
                         contractorId={contractor.id} 
                         destination={selectedJob.customerLocation} 
                       />
                     </div>
                   )}

                   {contractor && ["assigned", "awaiting_customer_confirmation"].includes(selectedJob.status) && selectedJob.contractorId === contractor.id && (
                     <div className="mb-12 p-8 bg-slate-50 rounded-[35px] border border-slate-200">
                        <div className="flex items-center justify-between mb-8">
                           <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                              <Plus size={16} className="text-emerald-500" /> Required Mission Parts
                           </h3>
                           <span className="text-[10px] font-black text-slate-400 italic">User Approval Required</span>
                        </div>

                        {/* Parts List */}
                        <div className="space-y-4 mb-8">
                           {selectedJob.parts && selectedJob.parts.length > 0 ? (
                             selectedJob.parts.map((part) => (
                               <div key={part.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                  <div>
                                     <p className="font-bold text-slate-900 text-sm">{part.name}</p>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{part.status}</p>
                                  </div>
                                  <div className="flex items-center gap-4">
                                     <span className="text-sm font-black italic text-emerald-600">${part.price}</span>
                                     <div className={`h-2 w-2 rounded-full ${part.status === 'APPROVED' ? 'bg-emerald-500' : part.status === 'REJECTED' ? 'bg-rose-500' : 'bg-amber-400 animate-pulse'}`} />
                                  </div>
                               </div>
                             ))
                           ) : (
                             <p className="text-center py-4 text-xs text-slate-400 italic">No parts added yet.</p>
                           )}
                        </div>

                        {/* Add Part Form */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <input 
                              type="text" 
                              placeholder="Part Name (e.g. Copper Pipe)"
                              value={newPart.name}
                              onChange={(e) => setNewPart({ ...newPart, name: e.target.value })}
                              className="bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                           />
                           <div className="flex gap-2">
                              <input 
                                 type="number" 
                                 placeholder="Price"
                                 value={newPart.price}
                                 onChange={(e) => setNewPart({ ...newPart, price: e.target.value })}
                                 className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                              />
                              <button 
                                 onClick={() => handleAddPart(selectedJob.id)}
                                 disabled={addingPart || !newPart.name || !newPart.price}
                                 className="p-3 bg-slate-950 text-white rounded-2xl hover:bg-emerald-600 transition-all disabled:opacity-50"
                              >
                                 {addingPart ? <RefreshCcw size={18} className="animate-spin" /> : <Plus size={18} />}
                              </button>
                           </div>
                        </div>
                     </div>
                   )}




                   {/* Contextual Action Button */}
                   <div className="flex gap-4">
                      {marketplaceJobs.find(j => j.id === selectedJob.id) ? (
                        <button 
                            onClick={() => acceptJob(selectedJob.id)}
                            disabled={!!actionId}
                            className="flex-1 py-6 rounded-[28px] bg-slate-950 hover:bg-emerald-600 text-white font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-slate-900/20 active:scale-[0.98] disabled:opacity-50"
                        >
                            {actionId === selectedJob.id ? <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Accept Commission <ArrowRight size={20} /></>}
                        </button>
                      ) : workloadJobs.find(j => j.id === selectedJob.id) ? (
                        <button 
                            onClick={() => completeJob(selectedJob.id)}
                            disabled={!!actionId}
                            className="flex-1 py-6 rounded-[28px] bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 active:scale-[0.98] disabled:opacity-50"
                        >
                            {actionId === selectedJob.id ? <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Finalize & Complete <Check size={20} /></>}
                        </button>
                      ) : (
                        <div className="flex-1 py-6 bg-slate-100 rounded-[28px] text-center font-black text-slate-400 uppercase tracking-widest">Mission Concluded</div>
                      )}
                      <button onClick={() => setSelectedJob(null)} className="px-10 py-6 text-slate-500 font-black uppercase tracking-widest text-xs hover:bg-slate-50 rounded-[28px] transition-all">Dismiss</button>
                   </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Verification Modal */}
      <AnimatePresence>
        {verifying && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVerifying(null)} className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white border border-slate-200 rounded-[40px] shadow-[0_32px_120px_rgba(0,0,0,0.3)] overflow-hidden">
                <div className="p-10 text-center">
                   <div className="h-20 w-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <ShieldCheck size={40} />
                   </div>
                   <h2 className="text-2xl font-black text-slate-950 tracking-tight mb-2">Security Verification</h2>
                   <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
                      We've dispatched a unique 6-digit protocol to <br/>
                      <span className="text-slate-950 font-bold">{verifying.value}</span>. <br/>
                      Please enter it below to verify this channel.
                   </p>

                   <div className="space-y-6">
                      <input 
                         type="text"
                         maxLength={6}
                         value={verificationCode}
                         onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                         className="w-full h-16 bg-slate-50 border-2 border-slate-100 rounded-[22px] text-center text-3xl font-black tracking-[0.5em] text-slate-950 outline-none focus:border-emerald-500 focus:bg-white transition-all placeholder:text-slate-200"
                         placeholder="000000"
                      />
                      
                      <button 
                         onClick={handleSubmitVerification}
                         disabled={verificationCode.length !== 6 || isVerifyingLoading}
                         className="w-full py-5 bg-slate-950 text-white rounded-[22px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                         {isVerifyingLoading ? <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Verify Identity"}
                      </button>

                      <button 
                         onClick={() => setVerifying(null)}
                         className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-colors"
                      >
                         Abort Verification
                      </button>
                   </div>
                </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </div>
  );
}

// --- Internal Helper Components ---

function JobCard({ job, onClick }: { job: Job; onClick: () => void }) {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            onClick={onClick}
            className="group bg-white p-8 rounded-[40px] border border-slate-200 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/[0.05] transition-all cursor-pointer flex flex-col h-full relative"
        >
            <div className="flex justify-between items-start mb-8">
               <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
               <div className="text-2xl font-black italic text-slate-950 flex items-center gap-0.5 tracking-tighter">
                  <span className="text-emerald-600 text-lg">$</span>{job.quotedPrice}
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-6 leading-tight line-clamp-2 min-h-[60px] group-hover:text-emerald-600 transition-colors">
                {job.description}
            </h3>

            <div className="pt-6 border-t border-slate-100 mt-auto space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2 text-slate-500 text-xs font-bold truncate">
                      <MapPin size={14} className="text-emerald-500" />
                      {job.location}
                   </div>
                   <span className="px-2 py-0.5 bg-slate-100 text-slate-950 font-black text-[10px] rounded uppercase">{job.postcode}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                       <Clock size={12} /> {job.urgency}
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 shadow-lg">
                       <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function WorkloadItem({ job, onAction }: { job: Job; onAction: () => void }) {
    return (
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-8 group hover:shadow-lg transition-all">
           <div className="flex items-center gap-8 flex-1">
              <div className="h-16 w-16 bg-slate-950 rounded-[22px] flex items-center justify-center text-white shrink-0">
                 <Zap size={24} className="text-emerald-500 animate-pulse" />
              </div>
              <div>
                 <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{job.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{job.status.replace(/_/g, " ")}</span>
                 </div>
                 <h4 className="text-xl font-bold text-slate-950">{job.description}</h4>
                 <div className="flex items-center gap-6 mt-3 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-2"><MapPin size={14} className="text-emerald-600" /> {job.address || job.location}</span>
                    {job.user && <span className="flex items-center gap-2"><User size={14} className="text-blue-500" /> {job.user.name}</span>}
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-4 w-full lg:w-auto">
              {job.user?.phone && (
                <a 
                  href={`tel:${job.user.phone}`}
                  className="flex-1 lg:flex-none px-8 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-[20px] text-xs font-black uppercase tracking-widest text-slate-600 text-center"
                >
                   Call Customer
                </a>
              )}
              <button 
                onClick={onAction}
                className="flex-1 lg:flex-none px-12 py-4 bg-slate-950 hover:bg-slate-800 text-white rounded-[20px] text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-950/10 active:scale-95 text-center"
              >
                 Protocol View
              </button>
           </div>
        </div>
    );
}
