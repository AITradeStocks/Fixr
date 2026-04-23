"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { api } from "@/lib/api";
import { setCustomerSession } from "@/lib/auth";
import type { PricingEstimate, Job } from "@/lib/types";

const URGENCY_OPTIONS = [
  { value: "urgent now", label: "Urgent — right now", desc: "Within 2 hours", multiplier: "1.5x" },
  { value: "today", label: "Today", desc: "Same day", multiplier: "1.2x" },
  { value: "flexible", label: "Flexible", desc: "Next few days", multiplier: "1.0x" },
];

interface Props {
  onStart?: () => void;
}

export function JobIntakeCard({ onStart }: Props) {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Austin, TX");
  const [urgency, setUrgency] = useState("today");
  const [estimate, setEstimate] = useState<PricingEstimate | null>(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);
  const [booked, setBooked] = useState<Job | null>(null);
  const [error, setError] = useState("");

  async function handleEstimate() {
    if (!description.trim()) { setError("Please describe your issue"); return; }
    setError("");
    setLoadingEstimate(true);
    setBooked(null);
    try {
      const result = await api.estimatePricing({ description, location, urgency });
      setEstimate(result as PricingEstimate);
      onStart?.();
    } catch {
      setError("Could not get estimate. Is the backend running?");
    } finally {
      setLoadingEstimate(false);
    }
  }

  async function handleBook() {
    setLoadingBook(true);
    setError("");
    try {
      const job = await api.createJob({ description, location, urgency });
      setBooked(job as Job);
    } catch (e: any) {
      setError(e.message || "Could not book job");
    } finally {
      setLoadingBook(false);
    }
  }

  if (booked) {
    return (
      <Card className="mt-8 p-6 shadow-[0_18px_80px_rgba(15,23,42,0.08)]">
        <div className="text-center py-4">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-950">Job booked!</h3>
          <p className="mt-2 text-sm text-slate-500">
            {booked.contractor
              ? `${booked.contractor.name} has been assigned and will contact you shortly.`
              : "We're finding the best contractor for you right now."}
          </p>

          <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-3">Job details</div>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Issue</span>
                <span className="font-medium max-w-[60%] text-right">{booked.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Price</span>
                <span className="font-semibold text-slate-950">${booked.quotedPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="font-medium capitalize text-blue-700">{booked.status.replace(/_/g, " ")}</span>
              </div>
              {booked.contractor && (
                <>
                  <div className="flex justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-500">Contractor</span>
                    <span className="font-semibold text-slate-950">{booked.contractor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Contact</span>
                    <a href={`tel:${booked.contractor.phones?.[0]?.number || ""}`} className="font-medium text-emerald-600 hover:underline">
                      {booked.contractor.phones?.[0]?.number || "No number"}
                    </a>
                  </div>
                  {booked.contractor.rating && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Rating</span>
                      <span className="font-medium">⭐ {booked.contractor.rating}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            Track my job →
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mt-8 p-6 shadow-[0_18px_80px_rgba(15,23,42,0.08)]">
      <div className="grid gap-4">
        {/* Description */}
        <div>
          <label className="text-sm font-medium text-slate-700">What needs fixing?</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. My kitchen sink is leaking under the cabinet and getting worse..."
            rows={3}
            className="mt-1.5 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-400 resize-none"
          />
        </div>

        {/* Location + urgency */}
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-slate-700">Location</label>
            <Input
              className="mt-1.5"
              placeholder="Austin, TX"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">When do you need it?</label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
              className="mt-1.5 h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400"
            >
              {URGENCY_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label} ({o.desc})</option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <Button onClick={handleEstimate} disabled={loadingEstimate}>
          {loadingEstimate ? "Getting price..." : "Get instant price"}
        </Button>

        {/* Price estimate result */}
        {estimate && !booked && (
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-emerald-600 mb-1">AI estimate</div>
                <div className="text-3xl font-bold text-slate-950">${estimate.price}</div>
                <div className="text-sm text-slate-500 mt-1">Range: ${estimate.priceRange[0]} – ${estimate.priceRange[1]}</div>
              </div>
              <div className="text-right">
                <div className={`inline-block rounded-full px-3 py-1 text-xs font-medium border ${estimate.confidence === "high" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-yellow-100 text-yellow-700 border-yellow-200"}`}>
                  {estimate.confidence} confidence
                </div>
                <div className="mt-2 text-xs text-slate-500 capitalize">{estimate.category} · ~{estimate.estimatedTimeMinutes} min</div>
              </div>
            </div>

            <div className="border-t border-emerald-100 pt-4">
              <p className="text-xs text-slate-500 mb-3">
                Price is fixed when you book. No surprises. Contractor details shared instantly on confirmation.
              </p>
              <Button onClick={handleBook} disabled={loadingBook} className="w-full">
                {loadingBook ? "Booking..." : "Confirm & book job →"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
