"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Globe, Scale } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";

export default function PrivacyPolicyPage() {
  const sections = [
    {
      icon: <Eye size={24} className="text-emerald-600" />,
      title: "Data Collection",
      content: "We collect information you provide directly to us when you create an account, request maintenance services, or communicate with our support team. This includes your name, contact information, property details, and maintenance history."
    },
    {
      icon: <Lock size={24} className="text-blue-600" />,
      title: "How We Use Data",
      content: "Your data is used to coordinate service professionals, provide accurate pricing estimates through our AI engine, and ensure the security of your property transactions. We do not sell your personal data to third parties."
    },
    {
      icon: <Globe size={24} className="text-purple-600" />,
      title: "Data Sharing",
      content: "We share necessary information with verified service professionals dispatched to your location. This is strictly limited to contact details and job-specific information required to complete the maintenance request."
    },
    {
      icon: <ShieldCheck size={24} className="text-amber-600" />,
      title: "Security Measures",
      content: "Fixr employs industry-standard SSL encryption and multi-factor authentication for enterprise accounts. We regularly audit our data storage protocols to meet global compliance standards."
    }
  ];

  return (
    <main className="min-h-screen bg-mesh pb-24">
      <Navbar />
      
      <div className="mx-auto max-w-4xl px-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-6 border border-emerald-100">
            <Lock size={12} />
            Privacy First Architecture
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6 italic">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
            At Fixr, we treat your property data with the same precision and care we apply to our maintenance services.
          </p>
        </motion.div>

        <div className="grid gap-8 mb-16">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border border-white/50 flex flex-col md:flex-row gap-8 items-start"
            >
              <div className="h-14 w-14 shrink-0 rounded-2xl bg-white shadow-inner flex items-center justify-center border border-slate-50">
                {section.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{section.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">{section.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Scale size={120} />
          </div>
          <h2 className="text-2xl font-black mb-6 italic">Compliance & Rights</h2>
          <p className="text-slate-400 font-medium leading-relaxed mb-8">
            Under GDPR and CCPA, you have the right to access, correct, or delete your personal information. Fixr provides a dedicated preference center in your dashboard for managing data persistence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-widest transition-all">
              Terms of Service
            </Link>
            <a href="mailto:privacy@fixr.io" className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold uppercase tracking-widest transition-all">
              Contact Data Officer
            </a>
          </div>
        </motion.div>

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
