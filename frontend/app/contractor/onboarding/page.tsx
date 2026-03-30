"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setContractorSession } from "@/lib/auth";
import { ALL_TRADES } from "@/lib/types";

const STEPS = ["Your details", "Trades & coverage", "Documents", "Review & submit"];

export default function ContractorOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    trades: [] as string[],
    businessType: "Independent",
    zipCodes: "",
  });
  const [docs, setDocs] = useState({ insurance: false, license: false, identity: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ id: string; name: string } | null>(null);

  function update(field: string, value: string) { setForm(f => ({ ...f, [field]: value })); setError(""); }
  function toggleTrade(t: string) {
    setForm(f => ({ ...f, trades: f.trades.includes(t) ? f.trades.filter(x => x !== t) : [...f.trades, t] }));
    setError("");
  }

  function nextStep() {
    if (step === 0 && (!form.name.trim() || !form.phone.trim())) { setError("Name and phone are required"); return; }
    if (step === 1 && form.trades.length === 0) { setError("Select at least one trade"); return; }
    if (step === 1 && !form.zipCodes.trim()) { setError("Add at least one zip code"); return; }
    if (step === 2 && !docs.identity) { setError("Identity document is required"); return; }
    setError(""); setStep(s => s + 1);
  }

  async function handleSubmit() {
    setLoading(true); setError("");
    try {
      const result = await api.createContractor({
        name: form.name, phone: form.phone, email: form.email,
        trade: form.trades.join(","), businessType: form.businessType,
        zipCodes: form.zipCodes.split(",").map(z => z.trim()).filter(Boolean),
        insuranceUploaded: docs.insurance,
        licenseUploaded: docs.license,
        identityUploaded: docs.identity,
      }) as any;
      setDone({ id: result.id, name: result.name });
    } catch (e: any) {
      setError(e.message || "Something went wrong");
    } finally { setLoading(false); }
  }

  function handleGoToDashboard() {
    if (done) {
      setContractorSession(done.id, done.name, form.trades);
      router.push("/contractor/jobs");
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Welcome, {done.name}!</h1>
          <p className="mt-2 text-slate-500 text-sm">Your profile is created. Start accepting jobs right away.</p>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-left">
            <div className="text-xs font-medium uppercase tracking-wide text-slate-400 mb-2">Your contractor ID</div>
            <div className="rounded-lg bg-slate-50 border border-slate-100 p-3 font-mono text-xs text-slate-700 break-all select-all">{done.id}</div>
            <p className="mt-2 text-xs text-slate-400">Save this — you'll use it to log in on any device.</p>
          </div>
          <button onClick={handleGoToDashboard} className="mt-5 w-full rounded-2xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Go to my job feed →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-lg">
        <a href="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back to home
        </a>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-950">Join as a contractor</h1>
          <p className="mt-1 text-sm text-slate-500">Takes 3 minutes. Start getting jobs today.</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${i < step ? "bg-emerald-500 text-white" : i === step ? "bg-slate-900 text-white ring-4 ring-slate-100" : "bg-slate-200 text-slate-400"}`}>
                  {i < step ? <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> : i + 1}
                </div>
                <span className={`mt-1.5 text-xs hidden sm:block ${i === step ? "text-slate-900 font-medium" : i < step ? "text-emerald-600" : "text-slate-400"}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < step ? "bg-emerald-400" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {/* Step 0: Details */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-slate-900 mb-4">Personal details</h2>
              {[{ label: "Full name *", field: "name", placeholder: "Daniel Walsh", type: "text" },
                { label: "Phone number *", field: "phone", placeholder: "+1 512 555 0100", type: "tel" },
                { label: "Email address", field: "email", placeholder: "you@example.com", type: "email" }
              ].map(({ label, field, placeholder, type }) => (
                <div key={field}>
                  <label className="text-sm font-medium text-slate-700">{label}</label>
                  <input value={form[field as keyof typeof form] as string} onChange={e => update(field, e.target.value)}
                    placeholder={placeholder} type={type}
                    className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-colors" />
                </div>
              ))}
            </div>
          )}

          {/* Step 1: Trades & coverage */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-base font-semibold text-slate-900">Trades & coverage</h2>
              <div>
                <label className="text-sm font-medium text-slate-700">Your trades <span className="text-slate-400 font-normal">(select all that apply)</span></label>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {ALL_TRADES.map(t => {
                    const selected = form.trades.includes(t);
                    return (
                      <button key={t} onClick={() => toggleTrade(t)}
                        className={`relative rounded-xl border py-2.5 px-3 text-sm capitalize font-medium transition-all ${selected ? "border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm" : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"}`}>
                        {selected && (
                          <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500">
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </span>
                        )}
                        {t}
                      </button>
                    );
                  })}
                </div>
                {form.trades.length > 0 && <p className="mt-2 text-xs text-emerald-600 font-medium">{form.trades.length} trade{form.trades.length > 1 ? "s" : ""} selected</p>}
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Business type</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {["Independent", "Company"].map(bt => (
                    <button key={bt} onClick={() => update("businessType", bt)}
                      className={`rounded-xl border py-2.5 text-sm font-medium transition-all ${form.businessType === bt ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
                      {bt === "Independent" ? "Independent / Sole trader" : "Company / Team"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Service zip codes *</label>
                <input value={form.zipCodes} onChange={e => update("zipCodes", e.target.value)} placeholder="78701, 78704, 78702"
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 transition-colors" />
                <p className="mt-1 text-xs text-slate-400">Comma-separated. You'll receive jobs in these areas.</p>
              </div>
            </div>
          )}

          {/* Step 2: Documents */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-slate-900">Verification documents</h2>
              <p className="text-sm text-slate-500">Upload your documents to verify your identity and credentials. These are checked by our ops team before activation.</p>
              {[
                { key: "identity", label: "Government ID *", desc: "Driver's licence, passport, or national ID", required: true },
                { key: "insurance", label: "Insurance certificate", desc: "Public liability insurance (recommended)", required: false },
                { key: "license", label: "Trade licence", desc: "Applicable trade licence or certificate", required: false },
              ].map(({ key, label, desc, required }) => (
                <div key={key} className={`rounded-xl border p-4 transition-all ${docs[key as keyof typeof docs] ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white"}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{label}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                    </div>
                    <div className="shrink-0">
                      {docs[key as keyof typeof docs] ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-emerald-600 font-medium">✓ Uploaded</span>
                          <button onClick={() => setDocs(d => ({ ...d, [key]: false }))}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors">Remove</button>
                        </div>
                      ) : (
                        <button onClick={() => setDocs(d => ({ ...d, [key]: true }))}
                          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                          Upload {required ? "*" : ""}
                        </button>
                      )}
                    </div>
                  </div>
                  {!docs[key as keyof typeof docs] && (
                    <div className="mt-3 rounded-lg border-2 border-dashed border-slate-200 px-4 py-5 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50/30 transition-all"
                      onClick={() => setDocs(d => ({ ...d, [key]: true }))}>
                      <p className="text-xs text-slate-400">Click to simulate upload</p>
                      <p className="text-xs text-slate-300 mt-0.5">PDF, JPG, PNG (max 10MB)</p>
                    </div>
                  )}
                </div>
              ))}
              <p className="text-xs text-slate-400 mt-2">* Identity document is required. Other documents help you get activated faster.</p>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-slate-900">Review & submit</h2>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 overflow-hidden">
                {[["Name", form.name], ["Phone", form.phone], ["Email", form.email || "—"],
                  ["Trades", form.trades.join(", ") || "—"], ["Business type", form.businessType], ["Zip codes", form.zipCodes],
                  ["Identity ID", docs.identity ? "✓ Uploaded" : "✗ Missing"],
                  ["Insurance", docs.insurance ? "✓ Uploaded" : "Not provided"],
                  ["Licence", docs.license ? "✓ Uploaded" : "Not provided"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between px-4 py-3 bg-slate-50 text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className={`font-medium capitalize text-right max-w-[60%] ${value?.toString().includes("✗") ? "text-red-500" : "text-slate-950"}`}>{value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">By submitting you agree to our contractor terms. Account activated within 24h after verification.</p>
            </div>
          )}

          {error && <div className="mt-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

          <div className="mt-6 flex gap-3">
            {step > 0 && (
              <button onClick={() => { setStep(s => s - 1); setError(""); }}
                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">← Back</button>
            )}
            {step < STEPS.length - 1 ? (
              <button onClick={nextStep} className="flex-1 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition-colors">Continue →</button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
                {loading ? "Submitting..." : "Submit application →"}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
