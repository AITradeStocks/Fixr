"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setAdminSession, getSession } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Zap, 
  Activity, 
  Lock, 
  ChevronRight,
  ArrowLeft,
  Server,
  Globe
} from "lucide-react";
import Link from "next/link";

const ADMIN_PASSCODE = "fixr-admin-2024";

export default function AdminEntryPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.role === "admin") {
      router.push("/admin/jobs");
    }
  }, [router]);

  async function handleEnter() {
    setLoading(true);
    // Add a slight artificial delay for "System verification" effect
    await new Promise(r => setTimeout(r, 600));
    
    if (code === ADMIN_PASSCODE) {
      setAdminSession();
      router.push("/admin/jobs");
    } else {
      setError("Authorization failed: Invalid access token");
      setCode("");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] flex overflow-hidden font-sans">
      {/* Left Side: Enterprise Hero */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-12 border-r border-white/5 bg-slate-950/50">
        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 shadow-xl shadow-emerald-500/20">
              <span className="text-xl font-black text-white">F</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Fixr Control Panel</h2>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] leading-none">Internal Systems v2.4.0</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-24 max-w-lg"
          >
            <h1 className="text-5xl font-black text-white leading-tight tracking-tighter">
              Manage the future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                property services.
              </span>
            </h1>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed font-medium">
              Enterprise-grade dispatching, contractor management, and automated quoting system. 
              Secure access for authorized administrators only.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {[
                { icon: Zap, label: "Real-time Dispatching" },
                { icon: ShieldCheck, label: "Identity Verification" },
                { icon: Activity, label: "Automatic Quoting" },
                { icon: Server, label: "Cloud Infrastructure" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                    <item.icon size={16} />
                  </div>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fancy Background Graphics */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 blur-[120px] rounded-full" />
          
          {/* Animated Matrix-like lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Status</span>
               <div className="flex items-center gap-2 mt-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-wider">All Systems Operational</span>
               </div>
             </div>
             <div className="h-8 w-px bg-white/10" />
             <div className="flex flex-col">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active nodes</span>
               <span className="text-xs font-bold text-white mt-1">AWS-US-EAST-1</span>
             </div>
          </div>
          <span className="text-xs font-bold text-slate-600">© 2024 FIXR ENTERPRISE INC.</span>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#020617]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-12">
            <div className="h-14 w-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-3xl font-black text-white shadow-2xl mb-4">F</div>
            <h1 className="text-2xl font-black text-white">Admin Entry</h1>
          </div>

          <div className="mb-10 lg:text-left text-center">
            <h2 className="text-3xl font-black text-white tracking-tight">System Login</h2>
            <p className="mt-2 text-slate-400 font-medium">Please enter your specialized administrative token.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end px-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Secret Passcode</label>
                <span className="text-[10px] text-slate-500 font-mono">FIXR-SEC-722</span>
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setError(""); }}
                  onKeyDown={e => e.key === "Enter" && handleEnter()}
                  placeholder="••••••••••••"
                  autoFocus
                  className="w-full h-16 rounded-2xl bg-slate-900/50 border border-white/10 pl-14 pr-6 text-white text-lg font-mono outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all placeholder:text-slate-700"
                />
              </div>
              <div className="px-1 flex justify-between">
                 <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">Default: <span className="text-slate-400">fixr-admin-2024</span></p>
                 <button className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest hover:text-emerald-400 transition-colors">Forgot key?</button>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider flex items-center gap-3"
                >
                  <ShieldCheck size={16} className="shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleEnter}
              disabled={loading}
              className="w-full h-16 rounded-2xl bg-white text-slate-950 text-base font-black hover:bg-emerald-400 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 group"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  <span className="uppercase tracking-widest text-xs">Authorizing...</span>
                </div>
              ) : (
                <>
                  <span className="uppercase tracking-[0.2em]">Confirm identity</span>
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          <div className="mt-12 space-y-4">
            <Link 
              href="/" 
              className="flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-all group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to public site</span>
            </Link>
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
    </main>
  );
}
