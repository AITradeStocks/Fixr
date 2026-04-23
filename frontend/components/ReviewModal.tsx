"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShieldCheck, X, MessageSquare, Send, Sparkles } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  jobTitle: string;
  contractorName: string;
}

export function ReviewModal({ isOpen, onClose, onSubmit, jobTitle, contractorName }: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await onSubmit(rating, comment);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        // Reset after modal closes
        setTimeout(() => {
          setSubmitted(false);
          setRating(0);
          setComment("");
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Review failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[3rem] bg-white border border-white/50 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.2)] antialiased"
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-10 md:p-12"
                >
                  <button 
                    onClick={onClose}
                    className="absolute right-8 top-8 h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
                  >
                    <X size={20} />
                  </button>

                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <ShieldCheck size={22} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Verification Protocol</span>
                  </div>

                  <h2 className="text-3xl font-black text-slate-950 leading-tight mb-3">
                    Quality Assessment
                  </h2>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed mb-10">
                    Your feedback helps maintain the <span className="text-slate-900 font-bold">Fixr Elite</span> standard for <span className="italic">"{jobTitle}"</span>.
                  </p>

                  <div className="space-y-10">
                    {/* Interactive Star Rating */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between px-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rate service quality</label>
                        <span className="text-xs font-bold text-slate-900">
                          {hoveredRating || rating || 0} / 5
                        </span>
                      </div>
                      
                      <div className="flex gap-2 justify-between">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                            className="relative flex-1 h-14 md:h-16 rounded-2xl flex items-center justify-center transition-all overflow-hidden"
                          >
                            {/* Star Background logic */}
                            <div className={`absolute inset-0 transition-colors duration-300 ${
                              (hoveredRating || rating) >= star 
                                ? "bg-amber-400 border-amber-300" 
                                : "bg-slate-50 border border-slate-100"
                            }`} />
                            
                            <Star 
                                size={28} 
                                className={`relative z-10 transition-all duration-300 ${
                                    (hoveredRating || rating) >= star 
                                    ? "text-white fill-white scale-110 drop-shadow-sm" 
                                    : "text-slate-300"
                                }`} 
                            />
                            
                            {/* Hover Glow */}
                            {(hoveredRating === star) && (
                                <motion.div 
                                    layoutId="star-glow"
                                    className="absolute inset-0 bg-white/20 blur-xl" 
                                />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Textarea */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-1">
                            <MessageSquare size={14} className="text-slate-400" />
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Professional Review</label>
                        </div>
                        <div className="relative group">
                            <textarea 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe the outcome, punctuality, and professionalism..."
                                rows={4}
                                className="w-full rounded-[2rem] bg-slate-50 border border-slate-100 p-6 text-sm font-medium outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none leading-relaxed placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <button 
                      onClick={handleReviewSubmit}
                      disabled={rating === 0 || loading}
                      className="w-full h-18 rounded-[2rem] bg-slate-950 text-white font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-20 transition-all shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] active:scale-[0.98] group"
                    >
                      {loading ? (
                        <div className="h-6 w-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Finalize Review
                          <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="p-20 text-center space-y-8"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 200, delay: 0.2 }}
                    className="h-24 w-24 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200"
                  >
                    <Sparkles size={40} />
                  </motion.div>
                  
                  <div>
                    <h3 className="text-3xl font-black text-slate-950">Review Verified</h3>
                    <p className="text-slate-500 font-medium mt-3 max-w-[240px] mx-auto">Thank you for maintaining the integrity of the Fixr marketplace.</p>
                  </div>

                  <div className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em]">
                    Transaction Finalized
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Decorative background star */}
            <div className="absolute -bottom-20 -left-20 text-slate-50 opacity-[0.03] pointer-events-none -rotate-12">
              <Star size={400} fill="currentColor" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
