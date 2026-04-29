"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      api.verifyPayment(sessionId)
        .then((res: any) => {
          if (res.success) setSuccess(true);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-slate-50">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
        <p className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Verifying Secure Transaction</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
              <CheckCircle2 className="h-12 w-12 text-emerald-600" />
            </div>
            
            <div>
              <h1 className="text-4xl font-black text-slate-950 tracking-tight">Payment Confirmed</h1>
              <p className="mt-4 text-slate-500 font-medium">Your transaction was successful. The contractor has been notified and the mission balance is settled.</p>
            </div>

            <div className="p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-xl space-y-6">
               <div className="flex items-center justify-center gap-2 text-emerald-600 bg-emerald-50 py-2 px-4 rounded-full w-fit mx-auto">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Stripe Verified Settlement</span>
               </div>
               
               <div className="grid grid-cols-1 gap-3">
                  <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-950 text-white font-bold hover:bg-emerald-600 transition-all shadow-xl shadow-slate-200">
                    Back to Dashboard
                    <ChevronRight size={18} />
                  </Link>
               </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-rose-100 ring-8 ring-rose-50">
              <CheckCircle2 className="h-12 w-12 text-rose-600 rotate-45" />
            </div>
            <h1 className="text-4xl font-black text-slate-950 tracking-tight">Verification Failed</h1>
            <p className="text-slate-500">We couldn't verify your payment. Please contact support if the amount was deducted from your account.</p>
            <Link href="/dashboard" className="inline-block px-8 py-4 rounded-2xl bg-slate-950 text-white font-bold">
              Return to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
