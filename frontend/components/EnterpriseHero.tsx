"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Play, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { VideoModal } from "./VideoModal";

export function EnterpriseHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-mesh">
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI-Powered Reliability
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-950 leading-[1.1] mb-6">
              Enterprise Home <br />
              <span className="text-emerald-600">Services Redefined.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl leading-relaxed">
              Fixr combines AI precision with vetted expertise to deliver instant pricing and on-demand maintenance for modern enterprises and homes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/booking"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-950 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Instant Estimate
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play size={18} fill="currentColor" />
                Watch Demo
              </button>
            </div>
            
            <div className="mt-10 flex items-center gap-6">
              {[
                { label: "Vetted Pros", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
                { label: "Fixed Rates", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
                { label: "24/7 Support", icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  {item.icon}
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50 ring-1 ring-slate-200">
              <img 
                src="/hero.png" 
                alt="Fixr Digital Interface" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Abstract Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-60 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10" />
            
            {/* Floating Info Card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl shadow-xl border border-white/20 z-20 hidden md:block"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Booking</p>
                  <p className="text-sm font-bold text-slate-900">4.9/5 Service Accuracy</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
