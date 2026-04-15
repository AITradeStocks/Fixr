"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setCustomerSession, getSession } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ChevronRight, 
  LayoutDashboard, 
  ShieldCheck,
  Sparkles,
  Shield
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.role === "customer") router.push("/dashboard");
    if (session?.role === "contractor") router.push("/contractor/jobs");
    if (session?.role === "admin") router.push("/admin/jobs");
  }, []);

  function update(f: string, v: string) { setForm(p => ({ ...p, [f]: v })); setError(""); }

  async function handleLogin() {
    if (!form.email || !form.password) { setError("Email and password required"); return; }
    setLoading(true);
    try {
      const result = await api.login({ email: form.email, password: form.password }) as any;
      setCustomerSession(result.token, result.user);
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Login failed");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[440px]">
        {/* Logo and Back Link */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 shadow-xl shadow-emerald-200"
          >
            <span className="text-2xl font-black text-white">F</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors">
              <ArrowLeft size={16} />
              Back to system
            </Link>
          </motion.div>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2.5rem] border border-white/40 p-8 md:p-10 shadow-2xl shadow-slate-900/10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Access Fixr</h1>
            <p className="mt-2 text-slate-500 font-medium">Log in to manage your property services</p>
          </div>

          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={e => update("email", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="name@enterprise.com"
                  className="w-full h-14 rounded-2xl bg-white border border-slate-200 pl-12 pr-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-medium" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={form.password} 
                  onChange={e => update("password", e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleLogin()}
                  placeholder="••••••••"
                  className="w-full h-14 rounded-2xl bg-white border border-slate-200 pl-12 pr-12 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-medium" 
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-sm font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              onClick={handleLogin} 
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-slate-950 text-white font-bold hover:bg-slate-800 disabled:opacity-50 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Log in to Dashboard
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          {/* Secondary Options */}
          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500 font-medium">
              Don't have an account?{" "}
              <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-bold underline underline-offset-4">
                Sign up for free
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Enterprise Context Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Staff Access Portals</p>
          <div className="flex gap-4">
            <Link 
              href="/contractor/login" 
              className="flex-1 glass group p-4 rounded-2xl border border-white/40 flex flex-col items-center gap-2 hover:border-emerald-200 transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                <Shield size={18} />
              </div>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Contractors</span>
            </Link>
            <Link 
              href="/admin" 
              className="flex-1 glass group p-4 rounded-2xl border border-white/40 flex flex-col items-center gap-2 hover:border-emerald-200 transition-all shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                <ShieldCheck size={18} />
              </div>
              <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Admin Panel</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
