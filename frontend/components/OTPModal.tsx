"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  target: string; 
  type: "email" | "phone";
  contactId?: string; // Optional: ID for ContractorEmail/Phone if already created
}

export function OTPModal({ isOpen, onClose, onVerify, target, type, contactId }: OTPModalProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRequesting, setIsRequesting] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const requestOtp = async () => {
    if (timer > 0 || isRequesting) return;
    setIsRequesting(true);
    setError(null);
    try {
      await api.requestVerification({ type, target });
      setTimer(30); // 30 second cooldown
    } catch (err: any) {
      setError(err.message || "Failed to send code");
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputs.current[0]?.focus(), 100);
      setOtp(["", "", "", "", "", ""]);
      setError(null);
      setSuccess(false);
      requestOtp(); // Send OTP on open
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 6) return;

    setLoading(true);
    setError(null);
    try {
      await api.submitVerification({ type, target, code, id: contactId });
      setSuccess(true);
      setTimeout(() => {
        onVerify();
        onClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Verification failed");
      setOtp(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white border border-white p-10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.1)] antialiased ${error ? 'animate-shake' : ''}`}
          >
            {!success ? (
              <div className="space-y-8">
                <button 
                  onClick={onClose}
                  className="absolute right-6 top-6 h-8 w-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
                >
                  <X size={16} />
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Security Verification</h3>
                    <p className="text-sm text-slate-500 font-medium mt-1">
                      Verification code sent to <span className="text-slate-900 font-bold">{target}</span>
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-2 md:gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el: HTMLInputElement | null) => { inputs.current[idx] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleChange(idx, e.target.value)}
                      onKeyDown={e => handleKeyDown(idx, e)}
                      className={`h-14 w-full md:h-16 rounded-2xl bg-slate-50 border text-center text-xl font-black outline-none transition-all ${
                        error ? 'border-red-200 bg-red-50 text-red-600' : 'border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 text-slate-900'
                      }`}
                    />
                  ))}
                </div>

                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs font-bold text-red-500 flex items-center justify-center gap-1.5"
                  >
                    <AlertCircle size={14} />
                    Invalid verification code. Please try again.
                  </motion.p>
                )}

                <div className="space-y-4">
                  <button 
                    onClick={handleVerify}
                    disabled={otp.join("").length < 6 || loading || isRequesting}
                    className="w-full h-16 rounded-2xl bg-slate-950 text-white font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-20 transition-all shadow-xl active:scale-[0.98] group"
                  >
                    {loading ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <>
                        Verify {type === "email" ? "Email" : "Mobile"}
                        <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                  <button 
                    onClick={requestOtp}
                    disabled={timer > 0 || isRequesting}
                    className="w-full text-xs font-bold text-slate-400 hover:text-slate-600 disabled:text-slate-200 transition-colors py-2 uppercase tracking-widest"
                  >
                    {timer > 0 ? `Resend in ${timer}s` : isRequesting ? "Sending..." : "Resend Code"}
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center text-center space-y-6"
              >
                <div className="h-20 w-20 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-200">
                  <CheckCircle2 size={40} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950">Identity Verified</h3>
                  <p className="text-sm text-slate-500 font-medium mt-2">Contact channel established successfully.</p>
                </div>
              </motion.div>
            )}

            {/* Hint removed for enterprise level security */}
          </motion.div>
        </div>
      )}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake { animation: shake 0.3s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </AnimatePresence>
  );
}
