"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "./CookieConsentProvider";
import { Cookie, Settings, ShieldAlert, Check, X, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export function CookieConsentBanner() {
  const {
    hasChoice,
    consent,
    acceptAll,
    rejectOptional,
    saveCustomConsent,
    isModalOpen,
    setModalOpen,
  } = useCookieConsent();

  const [localAnalytics, setLocalAnalytics] = useState(false);
  const [localMarketing, setLocalMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid Hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (consent) {
      setLocalAnalytics(consent.analytics);
      setLocalMarketing(consent.marketing);
    }
  }, [consent]);

  if (!mounted || hasChoice === null) return null;

  const handleSaveCustom = async () => {
    await saveCustomConsent(localAnalytics, localMarketing);
    setModalOpen(false);
  };

  return (
    <>
      {/* Banner */}
      <AnimatePresence>
        {!hasChoice && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-xl z-[9999]"
          >
            <div className="glass p-6 md:p-8 rounded-[2.5rem] border border-white/50 shadow-2xl shadow-slate-900/10 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -ml-6 -mt-6" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="h-12 w-12 shrink-0 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
                  <Cookie size={22} className="animate-wiggle" />
                </div>
                <div className="flex-1">
                  <h4 className="text-base font-bold text-slate-950 mb-1.5 flex items-center gap-2">
                    Cookie Consent
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-bold tracking-wider uppercase border border-emerald-100">
                      Privacy Secured
                    </span>
                  </h4>
                  <p className="text-slate-500 font-medium text-xs leading-relaxed italic mb-4">
                    FXR uses essential cookies to ensure secure operations. We also use optional performance cookies to optimize dispatch intelligence and verify marketing transparency.
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={acceptAll}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-100 flex items-center gap-1.5 active:scale-95"
                    >
                      Accept All
                      <Check size={14} />
                    </button>
                    <button
                      onClick={rejectOptional}
                      className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all active:scale-95"
                    >
                      Decline Optional
                    </button>
                    <button
                      onClick={() => setModalOpen(true)}
                      className="p-2.5 rounded-xl text-slate-400 hover:text-slate-950 hover:bg-slate-50 transition-all flex items-center gap-1.5 text-xs font-bold"
                      title="Custom Preferences"
                    >
                      <Settings size={16} />
                      Configure
                    </button>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>By continuing, you agree to our policies.</span>
                    <Link href="/cookies" className="text-emerald-600 hover:underline flex items-center gap-0.5">
                      Cookie Policy
                      <ArrowRight size={10} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Dialog / Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-sm">
            {/* Backdrop Closer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass max-w-lg w-full p-8 md:p-10 rounded-[3rem] border border-white/60 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-wider border border-emerald-100 mb-4">
                  <ShieldCheck size={12} />
                  Privacy Preferences
                </div>
                <h3 className="text-2xl font-black text-slate-950 italic">Cookie Settings</h3>
                <p className="text-slate-500 font-medium text-xs mt-2 italic">
                  Choose which optional categories you consent to. Rest assured, you can change your settings at any time.
                </p>
              </div>

              {/* Toggles Container */}
              <div className="space-y-6 mb-8">
                {/* Essential Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600">
                    <Check size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-900">Essential Cookies</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-bold uppercase tracking-wider border border-slate-200">
                        Required
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Necessary for routing, secure transaction flows, active logins, and core platform responsiveness. Cannot be disabled.
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Settings size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-900">Analytics Cookies</span>
                      {/* Switch toggle */}
                      <button
                        onClick={() => setLocalAnalytics(!localAnalytics)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                          localAnalytics ? "bg-emerald-600" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                            localAnalytics ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Allows us to gather aggregated performance metrics, estimate page speeds, and refine our AI price predicting algorithms.
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex gap-4 items-start">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <HelpCircle size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-bold text-slate-900">Marketing Cookies</span>
                      {/* Switch toggle */}
                      <button
                        onClick={() => setLocalMarketing(!localMarketing)}
                        className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                          localMarketing ? "bg-emerald-600" : "bg-slate-200"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                            localMarketing ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Used to optimize outreach, measure ad campaign conversions, and serve relevant promotions tailored to your property needs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={async () => {
                    await acceptAll();
                    setModalOpen(false);
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Accept All
                </button>
                <button
                  onClick={handleSaveCustom}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-100"
                >
                  Save Selection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
