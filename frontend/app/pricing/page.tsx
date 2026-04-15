"use client";

import { motion } from "framer-motion";
import { 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Building2, 
  ArrowLeft 
} from "lucide-react";
import Link from "next/link";

const TIERS = [
  {
    name: "Standard",
    price: "Free",
    desc: "Perfect for single property owners.",
    features: [
      "On-demand dispatch",
      "Fixed market rates",
      "Standard support",
      "Digital service history",
      "Vetted professionals"
    ],
    cta: "Get Started",
    popular: false,
    color: "bg-slate-50"
  },
  {
    name: "Business",
    price: "$49",
    period: "/mo",
    desc: "For landlords and property managers.",
    features: [
      "Priority dispatch (Under 2h)",
      "Multi-property dashboard",
      "Discounted service rates",
      "Dedicated account lead",
      "Compliance reporting",
      "Scheduled maintenance"
    ],
    cta: "Upgrade to Business",
    popular: true,
    color: "bg-emerald-50"
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Institutional scale maintenance.",
    features: [
      "API Access & Integration",
      "White-labeled reporting",
      "Volume discounts",
      "On-site project managers",
      "Custom SLA guarantees",
      "Fleet management"
    ],
    cta: "Contact Sales",
    popular: false,
    color: "bg-slate-900",
    dark: true
  }
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold mb-6"
          >
            Transparent Tiering
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-950 mb-6">
            Invest in <span className="text-emerald-600">Precision.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            From single-family homes to nationwide property portfolios, Fixr delivers elite maintenance at scale.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative glass p-10 rounded-[3rem] border flex flex-col transition-all hover:shadow-2xl hover:shadow-emerald-900/5 ${
                tier.dark ? "bg-slate-950 text-white border-white/10" : "border-white/50"
              } ${tier.popular ? "ring-2 ring-emerald-500 shadow-xl shadow-emerald-100" : ""}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-bold uppercase tracking-widest mb-4 ${tier.dark ? "text-emerald-400" : "text-emerald-600"}`}>
                  {tier.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-black tracking-tight">{tier.price}</span>
                  {tier.period && <span className="text-lg font-bold opacity-60">{tier.period}</span>}
                </div>
                <p className={`text-sm font-medium ${tier.dark ? "text-slate-400" : "text-slate-500"}`}>
                  {tier.desc}
                </p>
              </div>

              <div className="flex-1 space-y-4 mb-10">
                {tier.features.map(feat => (
                  <div key={feat} className="flex items-start gap-3">
                    <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${tier.dark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-100 text-emerald-600"}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className={`text-sm font-bold ${tier.dark ? "text-slate-300" : "text-slate-700"}`}>{feat}</span>
                  </div>
                ))}
              </div>

              <Link 
                href={tier.cta === "Contact Sales" ? "/help" : "/register"}
                className={`w-full py-5 rounded-2xl font-black text-center transition-all active:scale-[0.98] ${
                  tier.dark 
                    ? "bg-white text-slate-950 hover:bg-slate-100" 
                    : tier.popular 
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200" 
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-20 text-center">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors">
            <ArrowLeft size={16} />
            Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
