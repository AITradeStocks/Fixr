"use client";

import { EnterpriseHero } from "@/components/EnterpriseHero";
import { EnterpriseFeatures } from "@/components/EnterpriseFeatures";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Wrench, 
  Bolt, 
  Hammer, 
  Snowflake, 
  TreeDeciduous, 
  Paintbrush, 
  Home, 
  Sparkles,
  ChevronRight,
  ArrowRight,
  PhoneCall,
  ArrowUpRight
} from "lucide-react";

const SERVICES = [
  { icon: <Wrench size={20} />, label: "Plumbing", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: <Bolt size={20} />, label: "Electrical", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: <Hammer size={20} />, label: "Handyman", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: <Snowflake size={20} />, label: "HVAC", color: "text-sky-500", bg: "bg-sky-50" },
  { icon: <Paintbrush size={20} />, label: "Painting", color: "text-rose-500", bg: "bg-rose-50" },
  { icon: <Home size={20} />, label: "Roofing", color: "text-slate-500", bg: "bg-slate-50" },
  { icon: <TreeDeciduous size={20} />, label: "Landscaping", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: <Sparkles size={20} />, label: "Cleaning", color: "text-violet-500", bg: "bg-violet-50" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Intelligence First",
    body: "Describe your maintenance issue in plain language. Our AI understands the technical scope and complexity instantly.",
    color: "emerald"
  },
  {
    step: "02",
    title: "Transparent Rates",
    body: "Receive a market-verified, fixed-price quote. No bidding, no negotiation, no hourly-rate variance.",
    color: "blue"
  },
  {
    step: "03",
    title: "Rapid Dispatch",
    body: "A vetted, licensed professional is routed to your location with all the context needed to solve the issue.",
    color: "purple"
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      
      {/* Hero */}
      <EnterpriseHero />

      {/* Trust Bar */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Trusted by property leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40">
            {/* Logo Placeholders */}
            <span className="text-2xl font-bold tracking-tighter">STRUCT</span>
            <span className="text-2xl font-bold tracking-tighter">PRIMEVAL</span>
            <span className="text-2xl font-bold tracking-tighter">NEXUS</span>
            <span className="text-2xl font-bold tracking-tighter">ELEVATE</span>
            <span className="text-2xl font-bold tracking-tighter">ORBIT</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <EnterpriseFeatures />

      {/* Services Grid */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3">Capabilities</p>
              <h2 className="text-3xl md:text-5xl font-bold text-slate-950 tracking-tight">Expertise in every trade.</h2>
            </div>
            <Link href="/booking" className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-emerald-600 transition-colors">
              Request custom service
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => (
              <Link 
                key={i}
                href={`/booking?description=${encodeURIComponent(s.label + " service needed")}`}
                className="group p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  {s.icon}
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900">{s.label}</h3>
                  <ArrowUpRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white" id="how-it-works">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-950 tracking-tight mb-4">A streamlined experience.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto italic">Industry-leading response times coupled with enterprise-grade accountability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[1px] bg-slate-100 -z-0" />
            
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="relative z-10 text-center flex flex-col items-center">
                <div className={`w-14 h-14 rounded-full bg-white border-4 border-slate-50 shadow-lg flex items-center justify-center text-slate-900 font-black text-xl mb-6 ring-8 ring-transparent hover:ring-emerald-50 transition-all`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-slate-950 mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] -mr-[250px] -mt-[250px]" />
        
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8">
            Ready to experience <br />the <span className="text-emerald-400 font-medium">modern standard?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
            Join the forward-thinking enterprises and homeowners who manage their property with Fixr.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
            >
              Start Free Today
            </Link>
            <Link 
              href="/contractor/onboarding" 
              className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-white/10 text-white font-bold hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
            >
              For Contractors
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 grayscale opacity-80">
              <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">F</div>
              <span className="text-lg font-bold tracking-tight text-slate-950">Fixr</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-slate-500">
              <Link href="/#services" className="hover:text-emerald-600 transition-colors">Services</Link>
              <Link href="/#how-it-works" className="hover:text-emerald-600 transition-colors">How it Works</Link>
              <Link href="/pricing" className="hover:text-emerald-600 transition-colors">Pricing</Link>
              <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
              <Link href="/help" className="hover:text-emerald-600 transition-colors">Help Center</Link>
            </div>

            <div className="flex items-center gap-4 text-slate-400">
              <a href="tel:+1800FIXR" className="p-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-400 hover:text-emerald-600">
                <PhoneCall size={18} />
              </a>
              <p className="text-xs font-bold uppercase tracking-widest">© 2026 Fixr Inc.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
