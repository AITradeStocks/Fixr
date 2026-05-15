"use client";

import { EnterpriseHero } from "@/components/EnterpriseHero";
import { EnterpriseFeatures } from "@/components/EnterpriseFeatures";
import { motion, AnimatePresence } from "framer-motion";
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
            Join the forward-thinking enterprises and homeowners who manage their property with FXR.
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

      {/* Enterprise Footer */}
      <footer className="bg-slate-950 pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6 group cursor-pointer">
                <div className="h-10 w-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-lg group-hover:rotate-6 transition-transform shadow-lg shadow-emerald-900/40">F</div>
                <span className="text-2xl font-black tracking-tight text-white uppercase">FXR</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8">
                The modern standard for property intelligence and rapid maintenance. Vetted professionals, transparent pricing, and enterprise-grade accountability.
              </p>
              <div className="flex items-center gap-4">
                {['𝕏', 'In', 'Gh'].map((social) => (
                  <button key={social} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:bg-white/10 transition-all border border-white/5 hover:border-emerald-500/30">
                    <span className="font-bold text-xs">{social}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Solutions</h4>
              <ul className="space-y-4">
                {['Residential', 'Commercial', 'Prop Managers', 'Developers'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 text-sm font-medium hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Company</h4>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Partner Program', 'Newsroom'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-slate-500 text-sm font-medium hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-6">Resources</h4>
              <ul className="space-y-4">
                {['Help Center', 'API Docs', 'Safety protocols', 'Community'].map(item => (
                  <li key={item}>
                    <Link href={item === 'Help Center' ? '/help' : '#'} className="text-slate-500 text-sm font-medium hover:text-emerald-400 transition-colors flex items-center gap-2 group">
                      <ChevronRight size={12} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[10px] font-black uppercase tracking-widest text-slate-600">
              <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-slate-300 transition-colors">Cookies</Link>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Operational</span>
              </div>
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">© 2026 FXR Inc.</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
