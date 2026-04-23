"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, MessageSquare, Send } from "lucide-react";

interface ReviewFormProps {
  jobId: string;
  contractorName: string;
  onSuccess: () => void;
  onSubmit: (data: { rating: number; comment: string }) => Promise<void>;
}

export function ReviewForm({ jobId, contractorName, onSuccess, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;
    setLoading(true);
    try {
      await onSubmit({ rating, comment });
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center space-y-4"
      >
        <div className="h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900">Feedback Received!</h3>
          <p className="text-sm text-slate-500 font-medium">Thank you for helping us maintain quality standards.</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black text-slate-950 tracking-tight">How was {contractorName}?</h3>
        <p className="text-sm text-slate-500 font-medium">Your feedback helps the community and improves service.</p>
      </div>

      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <motion.button
            key={s}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHoverRating(s)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(s)}
            className="outline-none"
          >
            <Star
              size={40}
              className={`transition-all duration-300 ${
                (hoverRating || rating) >= s
                  ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]"
                  : "text-slate-200 fill-transparent"
              }`}
            />
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-4 text-slate-400 pointer-events-none">
            <MessageSquare size={18} />
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={`Tell us about your experience with ${contractorName}...`}
            className="w-full min-h-[120px] rounded-3xl border border-slate-100 bg-slate-50/50 p-4 pl-12 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 transition-all resize-none font-medium placeholder:text-slate-400"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={rating === 0 || loading}
          className="w-full h-16 rounded-2xl bg-slate-950 text-white font-black text-sm flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-20 transition-all shadow-xl active:scale-[0.98] group"
        >
          {loading ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Submit Feedback
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
