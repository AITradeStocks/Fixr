"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft,
  Mail,
  Lock,
  Building2,
  FileCheck,
  Globe,
  Star,
  Plus,
  Trash2,
  Phone,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { OTPModal } from "@/components/OTPModal";

type Step = 1 | 2 | 3 | 4 | 5;

interface ContactEmail {
  email: string;
  type: string;
  isVerified?: boolean;
}

interface ContactPhone {
  number: string;
  type: string;
  isVerified?: boolean;
}

const CONTACT_TYPES = ["Personal", "Sales", "Support", "Emergency", "Other"];

export default function ContractorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Verification Modal State
  const [verifying, setVerifying] = useState<{ 
    type: "email" | "phone"; 
    index: number; 
    target: string; 
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    emails: [{ email: "", type: "Personal", isVerified: false }] as ContactEmail[],
    phones: [{ number: "", type: "Personal", isVerified: false }] as ContactPhone[],
    businessType: "Sole Trader",
    abn: "",
    trade: "",
    about: "",
    postcode: "",
    zipCodes: "", 
    licenses: "",
  });

  const nextStep = () => {
    if (step === 1) {
      if (!formData.emails[0].email || !formData.password) {
        setError("Primary email and password are required");
        return;
      }
    }
    setError(null);
    setStep(s => Math.min(s + 1, 5) as Step);
  };
  
  const prevStep = () => setStep(s => Math.max(s - 1, 1) as Step);

  const addEmail = () => setFormData(p => ({ ...p, emails: [...p.emails, { email: "", type: "Personal", isVerified: false }] }));
  const removeEmail = (index: number) => {
    if (formData.emails.length <= 1) return;
    setFormData(p => ({ ...p, emails: p.emails.filter((_, i) => i !== index) }));
  };
  const updateEmail = (index: number, val: string) => {
    const next = [...formData.emails];
    next[index].email = val;
    next[index].isVerified = false; // Reset on change
    setFormData(p => ({ ...p, emails: next }));
  };
  const updateEmailType = (index: number, val: string) => {
    const next = [...formData.emails];
    next[index].type = val;
    setFormData(p => ({ ...p, emails: next }));
  };

  const addPhone = () => setFormData(p => ({ ...p, phones: [...p.phones, { number: "", type: "Personal", isVerified: false }] }));
  const removePhone = (index: number) => {
    setFormData(p => ({ ...p, phones: p.phones.filter((_, i) => i !== index) }));
  };
  
  const updatePhone = (index: number, val: string) => {
    const next = [...formData.phones];
    next[index].number = val;
    next[index].isVerified = false; // Reset on change
    setFormData(p => ({ ...p, phones: next }));
  };
  const updatePhoneType = (index: number, val: string) => {
    const next = [...formData.phones];
    next[index].type = val;
    setFormData(p => ({ ...p, phones: next }));
  };

  const handleVerifySuccess = () => {
    if (!verifying) return;
    const { type, index } = verifying;
    if (type === "email") {
      const next = [...formData.emails];
      next[index].isVerified = true;
      setFormData(p => ({ ...p, emails: next }));
    } else {
      const next = [...formData.phones];
      next[index].isVerified = true;
      setFormData(p => ({ ...p, phones: next }));
    }
    setVerifying(null);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const filteredEmails = formData.emails.filter(e => e.email.trim() !== "");
      const filteredPhones = formData.phones.filter(p => p.number.trim() !== "");

      const payload = {
        ...formData,
        emails: filteredEmails,
        phones: filteredPhones,
        zipCodes: formData.zipCodes.split(",").map(z => z.trim()).filter(Boolean),
        licenses: formData.licenses.split(",").map(l => l.trim()).filter(Boolean),
        status: "onboarded" 
      };
      await api.registerContractor(payload);
      router.push("/login?contractor=true"); 
    } catch (e: any) {
      setError(e.message || "Onboarding failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10 font-sans antialiased">
      {/* Verification Layer */}
      <OTPModal 
        isOpen={!!verifying}
        onClose={() => setVerifying(null)}
        onVerify={handleVerifySuccess}
        target={verifying?.target || ""}
        type={verifying?.type || "email"}
      />

      <div className="mx-auto max-w-6xl px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-all mb-12 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-50 border border-red-200 rounded-[2rem] text-red-700 text-sm font-bold flex items-center gap-3 shadow-sm"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Progress Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div>
                <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6 leading-[1.1]">
                Join the <br />
                <span className="text-emerald-600">Fixr Elite.</span>
                </h1>
                <p className="text-lg font-medium text-slate-500 leading-relaxed max-w-xs">Elevate your business with enterprise-grade maintenance opportunities.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { s: 1, label: "Digital Identity", icon: <Mail size={16} /> },
                { s: 2, label: "Business Credentials", icon: <Building2 size={16} /> },
                { s: 3, label: "Core Expertise", icon: <Briefcase size={16} /> },
                { s: 4, label: "Market Reach", icon: <Globe size={16} /> },
                { s: 5, label: "Vetting", icon: <ShieldCheck size={16} /> },
              ].map(item => (
                <div key={item.s} className="flex items-center gap-5 group cursor-default">
                  <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                    step === item.s ? "bg-slate-900 border-slate-900 text-white shadow-2xl scale-110" : 
                    step > item.s ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-200 text-slate-300"
                  }`}>
                    {step > item.s ? <CheckCircle2 size={20} /> : item.icon}
                  </div>
                  <div className="transition-all duration-300">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${step === item.s ? "text-emerald-600" : "text-slate-400"}`}>Phase 0{item.s}</span>
                    <p className={`text-base font-bold ${step === item.s ? "text-slate-900" : "text-slate-400"}`}>{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Wizard Card */}
          <div className="lg:col-span-8">
            <motion.div 
              layout
              className="glass p-10 md:p-16 rounded-[4rem] border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden bg-white/80 backdrop-blur-3xl"
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                  >
                    <div className="space-y-3">
                       <h2 className="text-4xl font-black text-slate-950">Digital Identity</h2>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">Let's start with your professional access credentials. You can add multiple emails for sales, support, etc.</p>
                    </div>
                    
                    <div className="space-y-8">
                      {/* Multiple Emails */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional Emails</label>
                            <button 
                                onClick={addEmail}
                                className="text-emerald-600 hover:text-emerald-700 text-xs font-black flex items-center gap-1 transition-colors bg-emerald-50 px-3 py-1.5 rounded-full"
                            >
                                <Plus size={14} /> Add Another
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            {formData.emails.map((emailObj, idx) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    key={idx} 
                                    className={`flex flex-col md:flex-row gap-3 items-end md:items-center transition-all ${emailObj.isVerified ? "opacity-60" : ""}`}
                                >
                                    <div className="relative flex-1 w-full">
                                        <Mail className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${emailObj.isVerified ? "text-emerald-500" : "text-slate-300"}`} size={18} />
                                        <input 
                                            type="email" 
                                            disabled={emailObj.isVerified}
                                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 pl-16 pr-24 text-sm font-bold focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" 
                                            placeholder={idx === 0 ? "primary@company.com" : "sales@company.com"}
                                            value={emailObj.email}
                                            onChange={e => updateEmail(idx, e.target.value)}
                                        />
                                        
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            {!emailObj.isVerified ? (
                                                <button 
                                                    disabled={!emailObj.email.includes("@")}
                                                    onClick={() => setVerifying({ type: "email", index: idx, target: emailObj.email })}
                                                    className="h-10 px-4 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 disabled:opacity-20 transition-all font-sans"
                                                >
                                                    Verify
                                                </button>
                                            ) : (
                                                <div className="h-10 px-4 rounded-xl bg-emerald-50 text-emerald-600 flex items-center gap-2 border border-emerald-100 shadow-sm shadow-emerald-100/50">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full md:w-32">
                                        <select 
                                            disabled={emailObj.isVerified}
                                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-4 text-xs font-bold focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all appearance-none"
                                            value={emailObj.type}
                                            onChange={e => updateEmailType(idx, e.target.value)}
                                        >
                                            {CONTACT_TYPES.map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    {idx > 0 && !emailObj.isVerified && (
                                        <button 
                                            onClick={() => removeEmail(idx)}
                                            className="h-16 w-16 rounded-2xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shrink-0"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Secure Password</label>
                        <div className="relative">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                          <input 
                            type="password" 
                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 pl-16 pr-6 text-sm font-bold focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" 
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={e => setFormData({...formData, password: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <button 
                        onClick={nextStep} 
                        className="w-full h-18 rounded-[2rem] bg-slate-950 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] mt-6 py-5"
                    >
                      Continue to Business Details
                      <ChevronRight size={22} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                  >
                    <div className="space-y-3">
                       <h2 className="text-4xl font-black text-slate-950">Business Credentials</h2>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">How you appear to enterprise clients. Add your primary and secondary contact numbers.</p>
                    </div>
                    
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Company Legal Name</label>
                            <div className="relative">
                                <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input 
                                    className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 pl-16 pr-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                                    placeholder="Fixr Pro Ltd"
                                    value={formData.name}
                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Multiple Phones */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Contact Numbers</label>
                                <button 
                                    onClick={addPhone}
                                    className="text-emerald-600 hover:text-emerald-700 text-xs font-black flex items-center gap-1 transition-colors bg-emerald-50 px-3 py-1.5 rounded-full"
                                >
                                    <Plus size={14} /> Add Another
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {formData.phones.map((phoneObj, idx) => (
                                    <motion.div 
                                        layout 
                                        key={idx} 
                                        className={`flex flex-col md:flex-row gap-3 items-end md:items-center transition-all ${phoneObj.isVerified ? "opacity-60" : ""}`}
                                    >
                                        <div className="relative flex-1 w-full">
                                            <Phone className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${phoneObj.isVerified ? "text-emerald-500" : "text-slate-300"}`} size={18} />
                                            <input 
                                                type="tel" 
                                                disabled={phoneObj.isVerified}
                                                className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 pl-16 pr-24 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                                                placeholder="+1 (555) 000-0000"
                                                value={phoneObj.number}
                                                onChange={e => updatePhone(idx, e.target.value)}
                                            />

                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                {!phoneObj.isVerified ? (
                                                    <button 
                                                        disabled={phoneObj.number.length < 5}
                                                        onClick={() => setVerifying({ type: "phone", index: idx, target: phoneObj.number })}
                                                        className="h-10 px-4 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 disabled:opacity-20 transition-all font-sans"
                                                    >
                                                        Verify
                                                    </button>
                                                ) : (
                                                    <div className="h-10 px-4 rounded-xl bg-emerald-50 text-emerald-600 flex items-center gap-2 border border-emerald-100 shadow-sm shadow-emerald-100/50">
                                                        <CheckCircle2 size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="w-full md:w-32">
                                            <select 
                                                disabled={phoneObj.isVerified}
                                                className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-4 text-xs font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                                                value={phoneObj.type}
                                                onChange={e => updatePhoneType(idx, e.target.value)}
                                            >
                                                {CONTACT_TYPES.map(t => <option key={t}>{t}</option>)}
                                            </select>
                                        </div>
                                        {idx > 0 && !phoneObj.isVerified && (
                                            <button 
                                                onClick={() => removePhone(idx)}
                                                className="h-16 w-16 rounded-2xl flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 shrink-0"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Business Structure</label>
                                <select 
                                    className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                                    value={formData.businessType}
                                    onChange={e => setFormData({...formData, businessType: e.target.value})}
                                >
                                    <option>Sole Trader</option>
                                    <option>Partnership</option>
                                    <option>LLC / Company</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">ABN / Corporate Tax ID</label>
                                <input 
                                    className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-6 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                                    placeholder="12 345 678 910"
                                    value={formData.abn}
                                    onChange={e => setFormData({...formData, abn: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="px-10 h-18 rounded-[2rem] bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-[0.98]">Back</button>
                      <button onClick={nextStep} className="flex-1 h-18 rounded-[2rem] bg-slate-950 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl">
                        Next: expertise
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div 
                    key="step3"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                  >
                    <div className="space-y-3">
                       <h2 className="text-4xl font-black text-slate-950">Core Expertise</h2>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">Showcase your specialized capabilities to fix enterprise level problems.</p>
                    </div>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Core Professional Trade</label>
                          <select 
                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-8 text-sm font-bold focus:border-emerald-500 outline-none transition-all appearance-none"
                            value={formData.trade}
                            onChange={e => setFormData({...formData, trade: e.target.value})}
                          >
                            <option value="">Select Primary Trade</option>
                            <option>Plumbing</option>
                            <option>Electrical</option>
                            <option>HVAC / Climate Controls</option>
                            <option>Corporate Locksmith</option>
                            <option>Facility Maintenance</option>
                          </select>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional Portfolio Summary</label>
                          <textarea 
                            rows={4}
                            className="w-full p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 text-sm font-bold focus:border-emerald-500 outline-none transition-all resize-none leading-relaxed" 
                            placeholder="Detail your corporate experience, specializations, and typical job scale..."
                            value={formData.about}
                            onChange={e => setFormData({...formData, about: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="px-10 h-18 rounded-[2rem] bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-[0.98]">Back</button>
                      <button onClick={nextStep} className="flex-1 h-18 rounded-[2rem] bg-slate-950 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl">
                        Next: service areas
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div 
                    key="step4"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                  >
                    <div className="space-y-3">
                       <h2 className="text-4xl font-black text-slate-950">Market Reach</h2>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">Define your operational logistics and dispatch regions.</p>
                    </div>
                    <div className="space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Headquarters Postcode</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-8 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="e.g. 2000"
                            value={formData.postcode}
                            onChange={e => setFormData({...formData, postcode: e.target.value})}
                          />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Operational Dispatch Zones (CSV)</label>
                          <textarea 
                            rows={3}
                            className="w-full p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 text-sm font-bold focus:border-emerald-500 outline-none transition-all resize-none leading-relaxed" 
                            placeholder="2000, 2010, 2030, 2045..."
                            value={formData.zipCodes}
                            onChange={e => setFormData({...formData, zipCodes: e.target.value})}
                          />
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="px-10 h-18 rounded-[2rem] bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-[0.98]">Back</button>
                      <button onClick={nextStep} className="flex-1 h-18 rounded-[2rem] bg-slate-950 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl">
                        Next: compliance
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div 
                    key="step5"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                  >
                    <div className="space-y-3">
                       <h2 className="text-4xl font-black text-slate-950">Digital Vetting</h2>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">Instant compliance validation for our elite partner network.</p>
                    </div>
                    <div className="space-y-8">
                       <div className="p-8 rounded-[2rem] bg-emerald-50/50 border border-emerald-100/50 flex gap-5">
                          <ShieldCheck className="text-emerald-600 shrink-0 mt-1" size={28} />
                          <div className="space-y-1">
                            <p className="text-sm font-black text-emerald-950 uppercase tracking-wider">Fast-Track Approval Enabled</p>
                            <p className="text-sm font-medium text-emerald-800 leading-relaxed italic">
                                Your data will be processed through our automated verification layer for instantaneous network access.
                            </p>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Professional License Identifiers (CSV)</label>
                          <input 
                            className="w-full h-16 rounded-2xl bg-slate-50/50 border border-slate-100 px-8 text-sm font-bold focus:border-emerald-500 outline-none transition-all" 
                            placeholder="LIC-PRO-998877, BUI-STD-112233"
                            value={formData.licenses}
                            onChange={e => setFormData({...formData, licenses: e.target.value})}
                          />
                       </div>
                       <div className="flex items-center gap-5 p-8 rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50/30 cursor-pointer hover:bg-white hover:border-emerald-500/50 transition-all group">
                          <div className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 transition-colors shadow-sm">
                            <FileCheck size={24} />
                          </div>
                          <div className="space-y-1">
                            <span className="block text-sm font-black text-slate-900 uppercase tracking-widest">Insurance Liability Certification</span>
                            <span className="block text-xs font-medium text-slate-400">Confirm coverage &gt; $5,000,000 AUD</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={prevStep} className="px-10 h-18 rounded-[2rem] bg-white border border-slate-100 text-slate-500 font-black hover:bg-slate-50 transition-all active:scale-[0.98]">Back</button>
                      <button 
                        onClick={handleSubmit} 
                        disabled={loading}
                        className="flex-1 h-18 rounded-[2rem] bg-emerald-600 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-emerald-700 transition-all active:scale-[0.98] shadow-[0_20px_40px_-12px_rgba(16,185,129,0.3)] disabled:opacity-50"
                      >
                        {loading ? "Initializing..." : "Finalize Onboarding"}
                        <ChevronRight size={22} />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative side badge */}
              <motion.div 
                initial={{ opacity: 0, rotate: -45 }}
                animate={{ opacity: 0.03, rotate: 0 }}
                className="absolute -top-10 -right-10 pointer-events-none"
              >
                <Star size={300} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

