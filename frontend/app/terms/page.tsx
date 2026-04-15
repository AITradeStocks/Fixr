"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Scale, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
  const sections = [
    {
      title: "1. Service Standards",
      icon: <Shield className="text-emerald-500" />,
      content: "Fixr is a platform connecting property owners with service professionals. All quotes provided are fixed-price based on the user's description. Any significant deviation in scope must be reported through the dashboard."
    },
    {
      title: "2. Payment Protection",
      icon: <Lock className="text-blue-500" />,
      content: "Your payment is held in escrow upon booking confirmation. Funds are only released to the professional once you have confirmed job completion via the Fixr Dashboard."
    },
    {
      title: "3. Professional Vetting",
      icon: <Scale className="text-amber-500" />,
      content: "All service providers on Fixr undergo a 5-point verification process including identity check, trade license verification (where applicable), and past performance audit."
    },
    {
      title: "4. Cancellation Policy",
      icon: <Clock className="text-rose-500" />,
      content: "Cancellations made 24 hours prior to the scheduled window are fully refundable. Late cancellations may incur a dispatch fee to compensate the assigned professional."
    }
  ];

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Home
          </Link>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-6">Terms of Service</h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Fixr operates as an enterprise-grade facilitator. Our terms ensure total transparency and protection for both property owners and service professionals.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] border border-white/50 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                  {s.icon}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{s.title}</h2>
              </div>
              <p className="text-slate-600 font-medium leading-[1.8] pl-14">
                {s.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-400 font-medium">Last updated: April 2026</p>
          <div className="mt-8 flex justify-center gap-8">
            <Link href="/help" className="text-sm font-bold text-emerald-600 hover:underline">Help Center</Link>
            <Link href="/privacy" className="text-sm font-bold text-emerald-600 hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
