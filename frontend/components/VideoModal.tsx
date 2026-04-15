"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, PlayCircle } from "lucide-react";

export function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-5xl aspect-video glass overflow-hidden flex flex-col shadow-2xl border-white/20 rounded-[2.5rem] relative"
          >
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all z-20"
            >
              <X size={24} />
            </button>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-mesh opacity-30" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative z-10"
              >
                <div className="h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center text-white mb-8 mx-auto shadow-2xl shadow-emerald-500/40">
                  <PlayCircle size={48} fill="currentColor" className="text-white/20" />
                </div>
                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Experience Fixr Enterprise</h2>
                <p className="text-lg text-slate-400 font-medium max-w-xl mx-auto">
                  See how institutional property owners manage thousands of maintenance requests with AI-driven precision.
                </p>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: "Predictive Dispatch", value: "99.8%" },
                    { label: "Cost Savings", value: "32%" },
                    { label: "Pro Satisfaction", value: "4.9/5" },
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10">
                      <p className="text-3xl font-black text-emerald-400 mb-1">{stat.value}</p>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
