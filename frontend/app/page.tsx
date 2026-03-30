"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, setCustomerSession } from "@/lib/auth";
import { api } from "@/lib/api";
import type { PricingEstimate, Job } from "@/lib/types";

const URGENCY_OPTIONS = [
  { value: "urgent now", label: "Urgent — right now", sub: "Within 2 hours" },
  { value: "today", label: "Today", sub: "Same day" },
  { value: "flexible", label: "Flexible", sub: "Next few days" },
];

const TRUST_ITEMS = [
  { icon: "⚡", label: "Instant pricing", sub: "AI estimates in seconds" },
  { icon: "✅", label: "Vetted contractors", sub: "Background checked" },
  { icon: "🔒", label: "Fixed price", sub: "No hidden fees" },
];

export default function HomePage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Austin, TX");
  const [urgency, setUrgency] = useState("today");
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [booked, setBooked] = useState<Job | null>(null);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const session = getSession();
    if (session?.role === "contractor") router.push("/contractor/jobs");
    if (session?.role === "admin") router.push("/admin/jobs");
    if (session?.role === "customer" && session.user) {
      setIsLoggedIn(true);
      setUserName(session.user.name);
    }
  }, []);

  async function handleEstimate() {
    if (!description.trim()) { setError("Please describe your issue first"); return; }
    setError("");
    setLoadingEstimate(true);
    setBooked(null);
    try {
      const result = await api.estimatePricing({ description, location, urgency });
      setEstimate(result as PricingEstimate);
    } catch {
      setError("Could not get estimate — is the backend running?");
    } finally { setLoadingEstimate(false); }
  }

  async function handleBook() {
    // Must be logged in to book
    const session = getSession();
    if (!session || session.role !== "customer" || !session.token) {
      router.push(`/login?redirect=/`);
      return;
    }
    setLoadingBook(true);
    setError("");
    try {
      const job = await api.createJob({ description, location, urgency });
      setBooked(job as Job);
    } catch (e: any) {
      setError(e.message || "Could not book job");
    } finally { setLoadingBook(false); }
  }

  if (booked) {
    return (
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Job booked!</h1>
          <p className="mt-3 text-slate-500">
            {booked.contractor ? `${booked.contractor.name} has been assigned.` : "We're finding your contractor now."}
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">Booking summary</p>
            <div className="space-y-3 text-sm">
              {[["Issue", booked.description], ["Location", booked.location], ["When", booked.urgency],
                ["Category", booked.category], ["Quoted price", `$${booked.quotedPrice}`], ["Status", booked.status.replace(/_/g, " ")]
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4">
                  <span className="text-slate-500 shrink-0">{k}</span>
                  <span className="font-medium text-slate-950 text-right capitalize">{v}</span>
                </div>
              ))}
              {booked.contractor && (
                <div className="border-t border-slate-200 pt-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">
                        {booked.contractor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-950">{booked.contractor.name}</p>
                        <p className="text-xs text-slate-500">{booked.contractor.trade.split(",")[0]}{booked.contractor.rating ? ` · ⭐ ${booked.contractor.rating}` : ""}</p>
                      </div>
                    </div>
                    <a href={`tel:${booked.contractor.phone}`} className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
                      Call
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <a href="/dashboard" className="mt-6 block w-full rounded-2xl bg-emerald-600 py-4 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors text-center">
            Track my job in dashboard →
          </a>
          <button onClick={() => { setBooked(null); setEstimate(null); setDescription(""); }}
            className="mt-3 w-full rounded-2xl border border-slate-200 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            Book another job
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 md:px-6">
        <div className="flex flex-col items-center text-center mb-10">
          {isLoggedIn && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-4 py-1.5 text-xs font-medium text-emerald-700">
              Welcome back, {userName} — <a href="/dashboard" className="underline">view your jobs →</a>
            </div>
          )}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-medium text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
            AI-powered pricing · Booked jobs · Verified contractors
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950 leading-tight max-w-2xl">
            Book trusted home services <span className="text-emerald-600">instantly.</span>
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl">Describe the issue, get an instant price, and dispatch a verified contractor fast.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {TRUST_ITEMS.map(item => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-medium text-slate-950">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_80px_rgba(15,23,42,0.08)]">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">What needs fixing?</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)}
                  placeholder="e.g. My kitchen sink is leaking under the cabinet..." rows={3}
                  className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-950 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 resize-none transition-colors placeholder:text-slate-400" />
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Austin, TX"
                    className="mt-1.5 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700">When do you need it?</label>
                  <select value={urgency} onChange={e => setUrgency(e.target.value)}
                    className="mt-1.5 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 transition-colors bg-white">
                    {URGENCY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label} — {o.sub}</option>)}
                  </select>
                </div>
              </div>
              {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{error}</div>}
              <button onClick={handleEstimate} disabled={loadingEstimate}
                className="w-full rounded-2xl bg-emerald-600 py-4 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors shadow-sm">
                {loadingEstimate ? "Getting your price..." : "Get instant price →"}
              </button>

              {estimate && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-1">AI estimate</p>
                      <p className="text-4xl font-bold text-slate-950">${estimate.price}</p>
                      <p className="text-sm text-slate-500 mt-1">Range: ${estimate.priceRange[0]} – ${estimate.priceRange[1]}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold ${estimate.confidence === "high" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                        {estimate.confidence} confidence
                      </span>
                      <p className="mt-2 text-xs text-slate-500 capitalize">{estimate.category} · ~{estimate.estimatedTimeMinutes} min</p>
                    </div>
                  </div>
                  <div className="border-t border-emerald-200 pt-4">
                    {!isLoggedIn && (
                      <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                        You need an account to book.{" "}
                        <a href="/register" className="font-semibold underline">Create one free</a> or{" "}
                        <a href="/login" className="font-semibold underline">log in</a>
                      </p>
                    )}
                    <p className="text-xs text-slate-500 mb-3">Price is fixed when you book. No surprises.</p>
                    <button onClick={handleBook} disabled={loadingBook}
                      className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 transition-colors">
                      {loadingBook ? "Booking..." : isLoggedIn ? "Confirm & book job →" : "Log in to book →"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-semibold text-slate-950 mb-10">How it works</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { step: "1", title: "Describe your issue", body: "Tell us what's broken. AI understands the job and gives a fair price instantly." },
              { step: "2", title: "Book in one tap", body: "Fixed price, no back-and-forth. Create a free account to book." },
              { step: "3", title: "Contractor dispatched", body: "A vetted pro arrives. Confirm completion and leave a review from your dashboard." },
            ].map(item => (
              <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">{item.step}</div>
                <h3 className="font-semibold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 py-14 px-4">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-medium text-slate-500 mb-4">Are you a trades professional?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="/contractor/login" className="flex-1 rounded-2xl border border-slate-200 py-3.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              Log in as contractor
            </a>
            <a href="/contractor/onboarding" className="flex-1 rounded-2xl bg-slate-900 py-3.5 text-center text-sm font-semibold text-white hover:bg-slate-800 transition-colors">
              Join as contractor →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
