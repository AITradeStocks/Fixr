"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth";
import { api } from "@/lib/api";
import type { PricingEstimate, Job } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  Phone,
  Home
} from "lucide-react";
import Link from "next/link";

const URGENCY_OPTIONS = [
  { value: "urgent now", label: "Urgent", sub: "Within 2 hours" },
  { value: "today", label: "Today", sub: "Same day" },
  { value: "flexible", label: "Flexible", sub: "Next few days" },
];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [urgency, setUrgency] = useState("today");
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [booked, setBooked] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.user) setIsLoggedIn(true);
    
    // Pre-fill from query params if any
    const desc = searchParams.get("description");
    if (desc) setDescription(desc);
  }, [searchParams]);

  async function handleEstimate() {
    if (!description.trim()) { setError("Please describe your issue first"); return; }
    setError("");
    setLoadingEstimate(true);
    setBooked(null);
    try {
      const result = await api.estimatePricing({ description, location: location || "Australia", postcode, urgency });
      setEstimate(result as PricingEstimate);
    } catch {
      setError("Could not get estimate — is the backend running?");
    } finally { setLoadingEstimate(false); }
  }

  const handleLogout = () => {
    clearSession();
    setIsLoggedIn(false);
    router.push("/");
  };

  async function handleBook() {
    const session = getSession();
    if (!session || session.role !== "customer" || !session.token) {
      router.push(`/login?redirect=/booking&description=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&urgency=${urgency}`);
      return;
    }
    setLoadingBook(true);
    setError("");
    try {
      const job = await api.createJob({ description, location: location || "Australia", address, postcode, urgency });
      setBooked(job as Job);
    } catch (e: any) {
      setError(e.message || "Could not book job");
    } finally { setLoadingBook(false); }
  }

  if (booked) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-6 animate-fade-in">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 ring-8 ring-emerald-50">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-950">Job Successfully Booked!</h1>
          <p className="mt-3 text-slate-500">
            {booked.contractor ? `${booked.contractor.name} has been assigned.` : "We're matching you with a verified contractor now."}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xl">
          <div className="p-8 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Booking Details</h2>
            <div className="space-y-4">
              {[
                ["Issue", booked.description],
                ["Full Address", booked.address || "N/A"],
                ["Postcode", booked.postcode || "N/A"],
                ["Location", booked.location],
                ["Urgency", booked.urgency],
                ["Category", booked.category],
                ["Final Price", `$${booked.quotedPrice}`],
                ["Status", booked.status.replace(/_/g, " ")]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-start gap-4">
                  <span className="text-sm font-medium text-slate-500 shrink-0">{k}</span>
                  <span className="text-sm font-bold text-slate-950 text-right capitalize">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {booked.contractor && (
            <div className="p-8 bg-emerald-50/30">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
                    {booked.contractor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-950">{booked.contractor.name}</p>
                    <p className="text-xs text-slate-500">{booked.contractor.trade.split(",")[0]} · ⭐ {booked.contractor.rating || "New"}</p>
                  </div>
                </div>
                <a href={`tel:${booked.contractor.telephone}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                  <Phone size={16} />
                  Call
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-950 text-white font-bold hover:bg-slate-800 transition-all">
            Track in Dashboard
            <ChevronRight size={18} />
          </Link>
          <button 
            onClick={() => { setBooked(null); setEstimate(null); setDescription(""); }}
            className="w-full py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          >
            Book Another Job
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
      {/* Form Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <button 
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-bold">Back to Home</span>
        </button>

        <h1 className="text-4xl font-bold text-slate-950 tracking-tight mb-3">What needs fixing?</h1>
        <p className="text-slate-500 mb-10">Describe the issue in your own words. Our AI will handle the rest.</p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-emerald-500" />
              Describe the issue
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="e.g. My kitchen faucet has a slow drip that won't stop..."
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all resize-none shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
                <MapPin size={14} className="text-slate-400" />
                Service City/Region
              </label>
              <input
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Sydney, NSW"
                className="w-full h-14 rounded-2xl border border-slate-200 px-5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} className="text-slate-400" />
                Postcode
              </label>
              <input
                value={postcode}
                onChange={e => setPostcode(e.target.value)}
                placeholder="2000"
                className="w-full h-14 rounded-2xl border border-slate-200 px-5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
              <Home size={14} className="text-slate-400" />
              Full Address
            </label>
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="e.g. 123 Enterprise St, Unit 4"
              className="w-full h-14 rounded-2xl border border-slate-200 px-5 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-950 uppercase tracking-widest flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              Timing
            </label>
            <div className="relative">
              <select
                value={urgency}
                onChange={e => setUrgency(e.target.value)}
                className="w-full h-14 rounded-2xl border border-slate-200 px-5 text-slate-900 outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer bg-white shadow-sm"
              >
                {URGENCY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label} — {o.sub}</option>)}
              </select>
              <ChevronRight size={18} className="absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-sm font-medium"
            >
              {error}
            </motion.div>
          )}

          <button
            onClick={handleEstimate}
            disabled={loadingEstimate || !description.trim()}
            className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            {loadingEstimate ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Continue to Estimate
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Info/Price Side */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8 lg:sticky lg:top-32"
      >
        <AnimatePresence mode="wait">
          {estimate ? (
            <motion.div
              key="estimate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-2xl shadow-emerald-900/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6">
                 <ShieldCheck className="text-emerald-200 h-16 w-16 -mr-4 -mt-4 opacity-50" />
              </div>

              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Sparkles size={14} />
                Guaranteed Fixed Rate
              </p>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-bold text-slate-950">${estimate.price}</span>
                <span className="text-slate-400 text-sm font-medium">all inclusive</span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Service Category</span>
                  <span className="font-bold text-slate-900 capitalize">{estimate.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Confidence Score</span>
                  <span className={`font-bold ${estimate.confidence === 'high' ? 'text-emerald-600' : 'text-amber-600'}`}>{estimate.confidence}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Market Range</span>
                  <span className="font-bold text-slate-900">${estimate.priceRange[0]} – ${estimate.priceRange[1]}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/50 border border-emerald-100 flex items-start gap-3 mb-8">
                <Info size={16} className="text-emerald-600 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-600">
                  This estimate is generated based on millions of data points and is verified for your specific issue. Once you confirm, the price is locked.
                </p>
              </div>

              <button
                onClick={handleBook}
                disabled={loadingBook}
                className="w-full py-5 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {loadingBook ? (
                   <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLoggedIn ? "Confirm & Book Now" : "Log in to Confirm Booking"}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-dashed border-slate-200 p-8 flex flex-col items-center justify-center text-center py-20 bg-slate-50/30"
            >
              <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-300">
                <Sparkles size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-950 mb-2">Estimate Pending</h3>
              <p className="text-sm text-slate-400 max-w-[240px]">
                Fill out the details to receive your instant, AI-calculated fixed rate.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { title: "Fully Vetted", icon: <ShieldCheck size={18} className="text-emerald-500" /> },
            { title: "No Surprise Fees", icon: <CreditCard size={18} className="text-emerald-500" /> },
            { title: "Licensed Pros", icon: <CheckCircle2 size={18} className="text-emerald-500" /> }
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100">
              <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center">
                {b.icon}
              </div>
              <span className="text-sm font-bold text-slate-700">{b.title}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CreditCard(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="pt-32 text-center text-slate-400">Loading booking system...</div>}>
        <BookingContent />
      </Suspense>
    </main>
  );
}
