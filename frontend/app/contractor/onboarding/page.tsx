"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp,
  ArrowLeft,
  User,
  Mail,
  Lock,
  Building2,
  FileCheck,
  Globe,
  Star
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

type Step = 1 | 2 | 3 | 4 | 5;

export default function ContractorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    telephone: "",
    businessType: "Sole Trader",
    abn: "",
    trade: "",
    about: "",
    postcode: "",
    zipCodes: "", // Comma separated for MVP
    licenses: "",
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 5) as Step);
  const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        zipCodes: formData.zipCodes.split(",").map(z => z.trim()).filter(Boolean),
        licenses: formData.licenses.split(",").map(l => l.trim()).filter(Boolean),
        isVerified: true, // MVP Instant verification
        status: "verified"
      };
      await api.registerContractor(payload);
      router.push("/login?contractor=true"); // Redirect to login
    } catch (e: any) {
      setError(e.message || "Onboarding failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-bold animate-shake">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Progress Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <h1 className="text-4xl font-black tracking-tight text-slate-950 mb-4">
              Join the <br />
              <span className="text-emerald-600 italic">Fixr elite.</span>
            </h1>
            <p className="text-sm font-medium text-slate-500 mb-12">Complete your profile to access high-quality enterprise maintenance jobs.</p>
            
            <div className="space-y-6">
              {[
                { s: 1, label: "Account Setup", icon: <Mail size={16} /> },
                { s: 2, label: "Business Identity", icon: <Building2 size={16} /> },
                { s: 3, label: "Trade Profile", icon: <Briefcase size={16} /> },
                { s: 4, label: "Service Areas", icon: <Globe size={16} /> },
                { s: 5, label: "Compliance", icon: <ShieldCheck size={16} /> },
              ].map(item => (
                <div key={item.s} className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center border-2 transition-all ${
                    step === item.s ? "bg-slate-900 border-slate-900 text-white shadow-lg" : 
                    step > item.s ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-100 text-slate-300"
                  }`}>
                    {step > item.s ? <CheckCircle2 size={18} /> : item.icon}
                  </div>
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${step === item.s ? "text-emerald-600" : "text-slate-400"}`}>Step 0{item.s}</span>
                    <p className={`text-sm font-bold ${step === item.s ? "text-slate-900" : "text-slate-400"}`}>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Wizard Card */}
          <div className="lg:col-span-8">
            <motion.div 
              layout
              className="glass p-10 md:p-14 rounded-[3.5rem] border border-white shadow-2xl shadow-emerald-900/5 relative overflow-hidden"
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-950 italic">Account Setup</h2>
                       <p className="text-sm font-medium text-slate-500 italic">Create your professional credentials.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Email</label>
                        <div className="relative">
                          <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="email" 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 pl-14 pr-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all shadow-inner" 
                            placeholder="pro@company.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Secure Password</label>
                        <div className="relative">
                          <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="password" 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 pl-14 pr-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all shadow-inner" 
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                    <button onClick={nextStep} className="w-full h-16 rounded-2xl bg-slate-950 text-white font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                      Next: Business Details
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-950 italic">Business Identity</h2>
                       <p className="text-sm font-medium text-slate-500 italic">How you appear to enterprise clients.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company legal name</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="Fixr Pro Ltd"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Contact Phone</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="+1 (555) 000-0000"
                            value={formData.telephone}
                            onChange={e => setFormData({...formData, telephone: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Type</label>
                          <select 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                            value={formData.businessType}
                            onChange={e => setFormData({...formData, businessType: e.target.value})}
                          >
                            <option>Sole Trader</option>
                            <option>Partnership</option>
                            <option>LLC / Company</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ABN / TAX ID</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="12 345 678 910"
                            value={formData.abn}
                            onChange={e => setFormData({...formData, abn: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="px-8 h-16 rounded-2xl bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-95">Back</button>
                      <button onClick={nextStep} className="flex-1 h-16 rounded-2xl bg-slate-950 text-white font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                        Next: Expertise
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-950 italic">Trade Expertise</h2>
                       <p className="text-sm font-medium text-slate-500 italic">Showcase your technical capabilities.</p>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Core trade</label>
                          <select 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                            value={formData.trade}
                            onChange={e => setFormData({...formData, trade: e.target.value})}
                          >
                            <option value="">Select Primary Trade</option>
                            <option>Plumbing</option>
                            <option>Electrical</option>
                            <option>HVAC</option>
                            <option>Locksmith</option>
                            <option>Handyman</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Professional Bio</label>
                          <textarea 
                            rows={4}
                            className="w-full p-6 rounded-2xl bg-white/50 border border-slate-100 text-sm font-bold focus:border-emerald-500 outline-none transition-all resize-none" 
                            placeholder="Share your experience and specialization..."
                            value={formData.about}
                            onChange={e => setFormData({...formData, about: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="px-8 h-16 rounded-2xl bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-95">Back</button>
                      <button onClick={nextStep} className="flex-1 h-16 rounded-2xl bg-slate-950 text-white font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                        Next: Service Regions
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-950 italic">Service Areas</h2>
                       <p className="text-sm font-medium text-slate-500 italic">Where do you operate?</p>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Business Postcode</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="e.g. 2000"
                            value={formData.postcode}
                            onChange={e => setFormData({...formData, postcode: e.target.value})}
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Zip/Postcodes (Comma separated)</label>
                          <textarea 
                            rows={3}
                            className="w-full p-6 rounded-2xl bg-white/50 border border-slate-100 text-sm font-bold focus:border-emerald-500 outline-none transition-all resize-none" 
                            placeholder="2000, 2010, 2030..."
                            value={formData.zipCodes}
                            onChange={e => setFormData({...formData, zipCodes: e.target.value})}
                          />
                          <p className="text-[10px] text-slate-400 font-medium">List all areas where you are available for dispatch.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="px-8 h-16 rounded-2xl bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-95">Back</button>
                      <button onClick={nextStep} className="flex-1 h-16 rounded-2xl bg-slate-950 text-white font-black flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-xl">
                        Next: Verification
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                       <h2 className="text-3xl font-black text-slate-950 italic">Compliance Check</h2>
                       <p className="text-sm font-medium text-slate-500 italic">Vetting and insurance validation.</p>
                    </div>
                    <div className="space-y-6">
                       <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex gap-4">
                          <ShieldCheck className="text-emerald-600 shrink-0" size={24} />
                          <p className="text-xs font-medium text-emerald-950 italic leading-relaxed">
                            For the MVP phase, your documents are instantly approved for high-frequency testing. Please enter your license numbers below.
                          </p>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Trade License Numbers (Comma separated)</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-white/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="LIC-998877, BUI-112233"
                            value={formData.licenses}
                            onChange={e => setFormData({...formData, licenses: e.target.value})}
                          />
                       </div>
                       <div className="flex items-center gap-4 p-6 rounded-2xl border border-dashed border-slate-200 bg-white/30 cursor-pointer hover:bg-white hover:border-emerald-300 transition-all group">
                          <FileCheck className="text-slate-400 group-hover:text-emerald-500" />
                          <span className="text-xs font-bold text-slate-400 group-hover:text-slate-950">Confirm Insurance Liability Coverage (&gt; $5M)</span>
                       </div>
                    </div>
                    <div className="flex gap-4">
                      <button onClick={prevStep} className="px-8 h-16 rounded-2xl bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-95">Back</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="flex-1 h-16 rounded-2xl bg-emerald-600 text-white font-black flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all active:scale-95 shadow-xl shadow-emerald-200 disabled:opacity-50"
                      >
                        {loading ? "Authenticating..." : "Complete Onboarding"}
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative side badge */}
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Star size={120} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
