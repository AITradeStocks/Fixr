"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cookie, Info, Check, Settings, ArrowLeft, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useCookieConsent } from "@/components/layout/CookieConsentProvider";

export default function CookiesPolicyPage() {
  const { consent, saveCustomConsent, acceptAll, rejectOptional } = useCookieConsent();
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (consent) {
      setAnalytics(consent.analytics);
      setMarketing(consent.marketing);
    }
  }, [consent]);

  const handleSaveCustom = async () => {
    await saveCustomConsent(analytics, marketing);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleAcceptAll = async () => {
    await acceptAll();
    setAnalytics(true);
    setMarketing(true);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  const handleDeclineAll = async () => {
    await rejectOptional();
    setAnalytics(false);
    setMarketing(false);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 3000);
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <Cookie size={12} />
            Data Transparency Center
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6 italic">
            Cookie Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            Learn how FXR uses cookie technologies to secure transactions, power maintenance intelligence, and preserve a pristine platform experience.
          </p>
        </motion.div>

        {/* Layout Grid: Detailed text on Left, Preference center on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Policy Text Description */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 md:p-10 rounded-[3rem] border border-white/50"
            >
              <h2 className="text-2xl font-black text-slate-950 mb-4 italic">1. What are Cookies?</h2>
              <p className="text-slate-500 font-medium leading-relaxed italic mb-6">
                Cookies are small text files stored on your browser when you visit a website. They serve to remember your preferred settings, keep you logged in, and collect telemetry about how visitors interact with our booking platform.
              </p>
              <p className="text-slate-500 font-medium leading-relaxed italic">
                We also employ modern equivalents such as localStorage, sessionTokens, and secured headers to coordinate dispatch intelligence accurately and protect payment flows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 md:p-10 rounded-[3rem] border border-white/50"
            >
              <h2 className="text-2xl font-black text-slate-950 mb-4 italic">2. How We Categorize Cookies</h2>
              
              <div className="space-y-6 mt-6">
                <div className="flex gap-4">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                    R
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Essential (Required)</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Strictly necessary to maintain login sessions, securely process escrow booking payments, and prevent platform abuse.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                    P
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Performance & Analytics</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Aggregates metrics about page response speed, AI estimate engine usage, and routing load. All data is fully anonymized.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 shrink-0 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                    M
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">Marketing & Targeting</h4>
                    <p className="text-xs text-slate-400 font-medium mt-1">
                      Helps optimize user acquisition campaigns, map contractor leads sources, and measure advertising conversion rates.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Preferences Settings Widget on Sticky Right */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 md:p-10 rounded-[3.5rem] border border-white/60 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Settings size={120} />
              </div>

              <div className="mb-8 relative z-10">
                <h3 className="text-2xl font-black text-slate-950 italic">Preference Center</h3>
                <p className="text-slate-500 font-medium text-xs mt-1.5 italic">
                  Change your cookie settings instantly. Your preferences synchronize with your account and are fully audited.
                </p>
              </div>

              {/* Preferences Toggles */}
              <div className="space-y-6 mb-8 relative z-10">
                {/* Essential (Required) */}
                <div className="p-4.5 rounded-2xl bg-white/70 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Essential</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Strictly Required</p>
                    </div>
                  </div>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-400 font-black tracking-widest uppercase">
                    Active
                  </span>
                </div>

                {/* Analytics */}
                <div className="p-4.5 rounded-2xl bg-white/70 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                      <Info size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Performance</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Analytics & Diagnostics</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                      analytics ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        analytics ? "translate-x-4.5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                {/* Marketing */}
                <div className="p-4.5 rounded-2xl bg-white/70 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <HelpCircle size={16} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Marketing</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">Conversion Tracking</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMarketing(!marketing)}
                    className={`w-10 h-5.5 rounded-full p-0.5 transition-colors duration-200 focus:outline-none ${
                      marketing ? "bg-emerald-600" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        marketing ? "translate-x-4.5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="flex flex-col gap-2 relative z-10">
                <button
                  onClick={handleSaveCustom}
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-emerald-100 active:scale-[0.99]"
                >
                  Save Selection
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleAcceptAll}
                    className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.99]"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all active:scale-[0.99]"
                  >
                    Reject Optional
                  </button>
                </div>
              </div>

              {/* Status Indicator */}
              {savedSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
                >
                  <Check size={14} />
                  Preferences updated successfully!
                </motion.div>
              )}
            </motion.div>
          </div>

        </div>

        {/* Links & Footer */}
        <div className="mt-16 pt-12 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400 font-medium">Last updated: April 2026</p>
          <div className="mt-8 flex justify-center gap-8">
            <Link href="/terms" className="text-sm font-bold text-emerald-600 hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="text-sm font-bold text-emerald-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-600 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
