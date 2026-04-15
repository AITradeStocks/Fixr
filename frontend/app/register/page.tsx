"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { setCustomerSession } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ChevronRight, 
  Sparkles,
  CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function update(f: string, v: string) { setForm(p => ({ ...p, [f]: v })); setError(""); }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match"); return; }
    setLoading(true);
    try {
      const result = await api.register({ name: form.name, email: form.email, password: form.password, phone: form.phone || undefined }) as any;
      setCustomerSession(result.token, result.user);
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Registration failed");
    } finally { setLoading(false); }
  }

  const inputFields = [
    { label: "Full Name", field: "name", type: "text", placeholder: "John Smith", icon: <User size={18} /> },
    { label: "Email Address", field: "email", type: "email", placeholder: "john@enterprise.com", icon: <Mail size={18} /> },
    { label: "Phone Number", field: "phone", type: "tel", placeholder: "+1 (555) 000-0000", icon: <Phone size={18} /> },
  ];

  const passFields = [
    { label: "Password", field: "password", placeholder: "Min. 6 characters" },
    { label: "Confirm Password", field: "confirm", placeholder: "Re-enter password" },
  ];

  return (
    <main className="min-h-screen bg-mesh flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-[2.5rem] border border-white/40 p-8 md:p-10 shadow-2xl shadow-slate-900/10"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-950 tracking-tight">Create Account</h1>
            <p className="mt-2 text-slate-500 font-medium">Join Fixr for premium property maintenance</p>
          </div>

          <div className="space-y-5">
            {inputFields.map((item, i) => (
              <motion.div 
                key={item.field}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="space-y-2"
              >
                <label className="text-xs font-bold text-slate-900 uppercase tracking-widest pl-1">{item.label}</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                    {item.icon}
                  </div>
                  <input 
                    type={item.type} 
                    value={form[item.field as keyof typeof form]} 
                    onChange={e => update(item.field, e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    placeholder={item.placeholder}
                    className="w-full h-14 rounded-2xl bg-white border border-slate-200 pl-12 pr-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-medium" 
                  />
                </div>
              </motion.div>
            ))}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {passFields.map((item, i) => (
                <motion.div 
                  key={item.field}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="space-y-2"
                >
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-widest pl-1">{item.label}</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={form[item.field as keyof typeof form]} 
                      onChange={e => update(item.field, e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleSubmit()}
                      placeholder={item.placeholder}
                      className="w-full h-14 rounded-2xl bg-white border border-slate-200 pl-11 pr-11 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-medium text-sm" 
                    />
                    {i === 0 && (
                      <button 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
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
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 active:scale-[0.98] mt-4"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Enterprise Account
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>

          <div className="mt-8 text-center pt-8 border-t border-slate-100 space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-bold underline underline-offset-4">
                Log in instead
              </Link>
            </p>
            <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Are you a service professional?{" "}
                <Link href="/contractor/onboarding" className="text-slate-900 hover:text-emerald-600 transition-colors underline underline-offset-4">
                  Onboard here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Benefits Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-6"
        >
          {[
            { label: "Secured Access", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
            { label: "GDPR Compliant", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
            { label: "Role-based Controls", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {item.icon}
              {item.label}
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
