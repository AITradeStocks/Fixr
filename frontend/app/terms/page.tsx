"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Scale, Clock, ArrowLeft, BookOpen, AlertCircle, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const sections = [
    {
      title: "1. Platform Operations",
      summary: "Understanding FXR's role as an intelligent dispatch facilitator.",
      icon: <Shield className="text-emerald-500" />,
      content: "FXR acts strictly as an enterprise-grade booking and dispatch facilitator. We match independent vetted contractors (service professionals) with property owners or managers. All quotes generated through our automated booking system are fixed-price based on the descriptions, measurements, and scope parameters you specify. Contractors function as independent business operators and are solely liable for the performance and guarantee of physical works."
    },
    {
      title: "2. Escrows & Payment Protection",
      summary: "How our payment system protects both contractors and customers.",
      icon: <Lock className="text-blue-500" />,
      content: "Payments made during booking are securely deposited with Stripe into a protected escrow account. Funds are released to the service professional only upon: (a) your active confirmation of job completion via the FXR Dashboard, or (b) automatic platform dispatch assessment after 48 hours without reported disputes. If supplementary parts or scope deviations are approved by both parties during execution, they are added in real-time as supplementary charges in escrow."
    },
    {
      title: "3. Professional Verification",
      summary: "The rigorous vetting protocols applied to all registered professionals.",
      icon: <Scale className="text-amber-500" />,
      content: "FXR executes a rigorous 5-point vetting process on every registered Contractor. This incorporates: identity validation (KYC), trade licensing and registration audits, active public liability insurance certificate verification, credit assessments, and peer reviews. While we make every commercially reasonable effort to ensure a high caliber of workmanship, users must report any discrepancies immediately for compliance review."
    },
    {
      title: "4. Cancellation & Dispatch Fees",
      summary: "Policies regarding timing of changes and cancellation costs.",
      icon: <Clock className="text-rose-500" />,
      content: "Cancellations of scheduled bookings executed 24 hours or more prior to the dispatch window are fully refundable. Cancellations made inside the 24-hour dispatch window are subject to a standard flat dispatch fee to compensate the assigned contractor for lost opportunity costs and scheduling adjustments. If a contractor fails to present within the allocated arrival window, no dispatch fees will apply."
    },
    {
      title: "5. Platform Liability & Disputes",
      summary: "Limitations of our liability and mechanisms for dispute resolution.",
      icon: <AlertCircle className="text-purple-500" />,
      content: "FXR is not liable for indirect, incidental, or consequential damages resulting from property repairs, contractor misconduct, or pricing predictions. In the event of a dispute, our operations team acts as a neutral arbiter. We hold payment in escrow, conduct a review of job photographs, parts logs, and GPS tracking timestamps, and issue a binding resolution (refund, re-dispatch, or contractor release) within 7 business days."
    }
  ];

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <BookOpen size={12} />
            Legal Agreement Rules
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6 italic">
            Terms of Service
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            These terms define the legal contract, payment protections, escrow procedures, and vetting guidelines governing usage of the FXR system.
          </p>
        </motion.div>

        {/* Dynamic Sidebar / Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Tabs Menu */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Sections</p>
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                  activeTab === idx
                    ? "bg-slate-950 border-slate-950 text-white shadow-lg"
                    : "bg-white/40 border-white/50 text-slate-600 hover:bg-white hover:border-slate-200"
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activeTab === idx ? "bg-white/10 text-emerald-400" : "bg-white text-slate-700 shadow-sm"
                }`}>
                  {sec.icon}
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-bold truncate ${activeTab === idx ? "text-white" : "text-slate-900"}`}>
                    {sec.title}
                  </p>
                  <p className={`text-[10px] truncate font-medium mt-0.5 ${activeTab === idx ? "text-slate-400" : "text-slate-400"}`}>
                    {sec.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active section Card */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass p-10 md:p-12 rounded-[3.5rem] border border-white/60 shadow-xl relative min-h-[400px] flex flex-col justify-between"
            >
              <div>
                <div className="h-16 w-16 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-slate-50 mb-8">
                  {sections[activeTab].icon}
                </div>
                <h2 className="text-3xl font-black text-slate-950 mb-6 italic">
                  {sections[activeTab].title}
                </h2>
                <p className="text-slate-600 font-medium leading-[1.9] italic text-base">
                  {sections[activeTab].content}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="uppercase tracking-widest">Section {activeTab + 1} of {sections.length}</span>
                <button
                  onClick={() => setActiveTab((prev) => (prev + 1) % sections.length)}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
                >
                  Next Section
                  <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Dispute Center Info box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-12 rounded-[3rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <HelpCircle size={120} />
          </div>
          <h2 className="text-2xl font-black mb-6 italic">Need Assistance with an Active Job?</h2>
          <p className="text-slate-400 font-medium leading-relaxed mb-8 max-w-3xl">
            Our specialized support team is online 24/7. If you have an active booking issue, payment conflict, or parts authorization concern, do not hesitate to contact our mediation center to initiate an official audit.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest transition-all">
              Privacy Policy
            </Link>
            <Link href="/help" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest transition-all">
              Help Center
            </Link>
            <a href="mailto:support@fxr.io" className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-black uppercase tracking-widest transition-all">
              Submit Dispute Ticket
            </a>
          </div>
        </motion.div>

        {/* Back navigation link */}
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
