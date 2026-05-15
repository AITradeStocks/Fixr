"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Globe, Scale, Key, Server, Users, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<number>(0);

  const sections = [
    {
      icon: <Eye size={22} className="text-emerald-600" />,
      title: "1. Data Collection & Intake",
      summary: "What details we collect when you request booking services or register accounts.",
      content: "We collect personal identifiers such as name, email address, physical address, post code, telephone number, and payment credentials when you utilize our booking engine. When booking jobs, our intelligence system processes descriptions of your property issues, parts lists, urgency severity levels, and geographical coordinates. For contractors, we additionally ingest business registry data, professional licenses, and liability insurance certificates."
    },
    {
      icon: <Lock size={22} className="text-blue-600" />,
      title: "2. Use of Information",
      summary: "How we process collected information to power intelligence and rapid dispatches.",
      content: "We process your information exclusively to: match maintenance requests with vetted contractors, calculate fixed pricing rates through our AI pricing engine, process payments in escrow, track contractor locations in real-time on active jobs, and verify professional credentials. Telemetry cookies are used to assess platform performance, prevent fraudulent transactions, and audit marketing conversion ratios."
    },
    {
      icon: <Globe size={22} className="text-purple-600" />,
      title: "3. Dissemination & Sharing",
      summary: "Strict protocols under which data is transmitted to contractors or processors.",
      content: "We never sell your personal information. To coordinate maintenance dispatches, we share necessary details (name, job description, site address, and telephone number) with the specific, verified service professional assigned to your job. We also share tokenized details with Stripe for secure escrow card processing and Mapbox/Leaflet services for geographical route optimization."
    },
    {
      icon: <Server size={22} className="text-rose-600" />,
      title: "4. Infrastructure & Security",
      summary: "High-grade protections we apply to secure databases, links, and transactions.",
      content: "Fixr enforces a secure, robust perimeter. All network requests are routed over SSL/TLS 1.3 encryption. Passwords are salted and hashed with bcrypt. Payments are handled strictly via Stripe's Level 1 PCI-compliant infrastructure. Database states are isolated, backed up daily, and protected by PostgreSQL multi-tenant role permissions. Real-time location logs are purged from the live systems within 30 days of job completion."
    },
    {
      icon: <Users size={22} className="text-amber-600" />,
      title: "5. User Compliance & Rights",
      summary: "Empowering you with complete command over access, correction, and deletion.",
      content: "Under GDPR and CCPA frameworks, you maintain full command over your profile. You have the right to request a complete port of your personal data, update inaccuracies, or request absolute deletion of your account. If you withdraw consent, optional analytics and tracking cookies are immediately stopped, and database linkages are deleted, subject only to escrow audit record-keeping requirements."
    }
  ];

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <ShieldCheck size={12} />
            Privacy Safeguards Enabled
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6 italic">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            At FXR, we treat your property credentials, location records, and billing data with the same precision and care we apply to our dispatch engineering.
          </p>
        </motion.div>

        {/* Policy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Quick-Nav sidebar on the Left */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-3">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest px-4 mb-2">Sections</p>
            {sections.map((sec, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all ${
                  activeSection === idx
                    ? "bg-slate-950 border-slate-950 text-white shadow-lg"
                    : "bg-white/40 border-white/50 text-slate-600 hover:bg-white hover:border-slate-200"
                }`}
              >
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activeSection === idx ? "bg-white/10 text-emerald-400" : "bg-white text-slate-700 shadow-sm"
                }`}>
                  {sec.icon}
                </div>
                <div className="overflow-hidden">
                  <p className={`text-xs font-bold truncate ${activeSection === idx ? "text-white" : "text-slate-900"}`}>
                    {sec.title}
                  </p>
                  <p className={`text-[10px] truncate font-medium mt-0.5 ${activeSection === idx ? "text-slate-400" : "text-slate-400"}`}>
                    {sec.summary}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Active section Detail Card on the Right */}
          <div className="lg:col-span-8">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="glass p-10 md:p-12 rounded-[3.5rem] border border-white/60 shadow-xl relative min-h-[400px] flex flex-col justify-between"
            >
              <div>
                <div className="h-16 w-16 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-slate-50 mb-8">
                  {sections[activeSection].icon}
                </div>
                <h2 className="text-3xl font-black text-slate-950 mb-6 italic">
                  {sections[activeSection].title}
                </h2>
                <p className="text-slate-600 font-medium leading-[1.9] italic text-base">
                  {sections[activeSection].content}
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="uppercase tracking-widest">Section {activeSection + 1} of {sections.length}</span>
                <button
                  onClick={() => setActiveSection((prev) => (prev + 1) % sections.length)}
                  className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
                >
                  Next Section
                  <ArrowLeft size={14} className="rotate-180 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Global Compliance callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 md:p-12 rounded-[3rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Scale size={120} />
          </div>
          <h2 className="text-2xl font-black mb-6 italic">Data Controllers & Compliance</h2>
          <p className="text-slate-400 font-medium leading-relaxed mb-8 max-w-3xl">
            Under CCPA, GDPR, and localized Australian Privacy Principles (APPs), FXR operates as both Data Controller and Data Processor. All geographic tracking coordinates, SMS log files, and support audio recordings are held in compliant cloud data centers and synced strictly in accordance with certified authorization credentials.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest transition-all">
              Terms of Service
            </Link>
            <Link href="/cookies" className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black uppercase tracking-widest transition-all">
              Manage Cookies Preference
            </Link>
            <a href="mailto:privacy@fxr.io" className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-black uppercase tracking-widest transition-all">
              Contact Data Officer
            </a>
          </div>
        </motion.div>

        {/* Back navigation */}
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
