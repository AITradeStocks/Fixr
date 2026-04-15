"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setContractorSession } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ChevronRight, 
  ShieldCheck,
  Briefcase
} from "lucide-react";

export default function ContractorLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function update(f: string, v: string) { setForm(p => ({ ...p, [f]: v })); setError(""); }

  async function handleLogin() {
    if (!form.email || !form.password) { setError("Email and password required"); return; }
    setLoading(true);
    try {
      const result = await api.loginContractor({ email: form.email, password: form.password }) as any;
      setContractorSession(result.token, result.contractor.id, result.contractor.name, [result.contractor.trade]);
      router.push("/contractor/dashboard"); // Assuming this exists or will be created
    } catch (e: any) {
      setError(e.message || "Invalid credentials for Pro account");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-slate-900 shadow-2xl shadow-slate-200"
          >
            <Briefcase size={28} className="text-emerald-500" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Link href="/login" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-xs font-black uppercase tracking-widest transition-all">
              <ArrowLeft size={16} />
              Switch to Customer
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-[3rem] border border-white p-10 shadow-2xl shadow-emerald-900/5"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-950 italic">Fixr Pro Login</h1>
            <p className="mt-2 text-sm text-slate-500 font-medium italic">Access your enterprise jobs portal</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Email</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => update("email", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="pro@example.com"
                  className="w-full h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-4 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-inner" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={form.password} 
                  onChange={e => update("password", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-14 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-inner" 
                />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-bold italic text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-slate-950 text-white font-black hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Enter Pro Dashboard
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="mt-10 text-center pt-8 border-t border-slate-50">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Want to join the network?{" "}
              <Link href="/contractor/onboarding" className="text-emerald-600 hover:text-emerald-700 underline underline-offset-4">
                Onboard here
              </Link>
            </p>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">
          <ShieldCheck size={14} className="text-emerald-500" />
          Enterprise Verified Access
        </div>
      </div>
    </main>
  );
}
