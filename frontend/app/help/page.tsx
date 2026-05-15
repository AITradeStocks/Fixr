"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  HelpCircle, 
  Book, 
  Settings, 
  Shield, 
  Smartphone, 
  LifeBuoy, 
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Mail
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SupportOverlay } from "@/components/SupportOverlay";

const CATEGORIES = [
  { 
    id: "getting-started",
    title: "Getting Started", 
    desc: "Learn how to post requests and track pros.", 
    icon: <Sparkles className="text-amber-500" />, 
    color: "bg-amber-50" 
  },
  { 
    id: "payments",
    title: "Payments & Billings", 
    desc: "Understanding quotes, invoices, and payment release.", 
    icon: <Book className="text-blue-500" />, 
    color: "bg-blue-50" 
  },
  { 
    id: "safety",
    title: "Safety & Vetting", 
    desc: "Our 5-point pro verification standards.", 
    icon: <Shield className="text-emerald-500" />, 
    color: "bg-emerald-50" 
  },
  { 
    id: "account",
    title: "Account Settings", 
    desc: "Manage profiles, teams, and locations.", 
    icon: <Settings className="text-slate-500" />, 
    color: "bg-slate-50" 
  },
  { 
    id: "mobile",
    title: "Mobile App", 
    desc: "Using FXR on the go via iOS and Android.", 
    icon: <Smartphone className="text-indigo-500" />, 
    color: "bg-indigo-50" 
  },
  { 
    id: "enterprise",
    title: "Enterprise Solutions", 
    desc: "Multi-property management for scale.", 
    icon: <LifeBuoy className="text-purple-500" />, 
    color: "bg-purple-50" 
  },
];

const ARTICLES: Record<string, { q: string, a: string }[]> = {
  "getting-started": [
    { q: "How do I create a new maintenance request?", a: "Click the 'Post New Request' button on your dashboard. Our AI will guide you through describing the issue, setting urgency, and estimating costs." },
    { q: "What happens after I post a request?", a: "FXR immediately notifies the top-rated pros in your area. You'll receive a match notification usually within 15 minutes." }
  ],
  "payments": [
    { q: "When is my card charged?", a: "Payment is authorized when you confirm a match but only released to the pro once you confirm the job is successfully completed." },
    { q: "Are quotes final?", a: "Quotes provided by the AI are estimates. Final pricing is confirmed with the pro on-site before work begins." }
  ],
  "safety": [
    { q: "How are pros verified?", a: "Every pro undergoes a 5-point check: Identity verification, License validation, Insurance coverage, Background check, and historical rating audit." },
    { q: "What is the FXR Guarantee?", a: "All jobs booked through the platform are covered by our $1M property protection guarantee." }
  ]
};

const FAQS = [
  "How do I confirm the contractor has finished?",
  "What happens if a pro doesn't show up?",
  "Is my data shared with contractors?",
  "Can I cancel a request after a match?",
  "How do I add a secondary property?",
];

export default function HelpPage() {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<number | null>(null);

  const activeArticles = selectedCat ? ARTICLES[selectedCat] || [
    { q: "How does this work?", a: "We are currently expanding our documentation for this category. Please contact live support for immediate assistance." },
    { q: "Contacting Support", a: "You can reach our enterprise coordinators 24/7 via the 'Live Chat' button below." }
  ] : [];

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <SupportOverlay isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link href="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors mb-6 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Dashboard
            </Link>
            <h1 className="text-5xl font-black tracking-tight text-slate-950 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
              Find answers, learn about our enterprise standards, or reach out to our dedicated coordinator team.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-[400px]"
          >
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full h-16 rounded-[1.5rem] bg-white border border-slate-200 pl-14 pr-6 text-slate-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 transition-all font-medium shadow-xl shadow-slate-200/40"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400">
                ⌘K
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories Grid or Article View */}
        <div className="mb-20">
          {!selectedCat ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.05) }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedCat(cat.id)}
                  className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm flex flex-col gap-6 cursor-pointer hover:border-white hover:shadow-xl transition-all group"
                >
                  <div className={`h-14 w-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                    <div className="flex items-center justify-center scale-125">
                      {cat.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 mb-2 group-hover:text-emerald-700 transition-colors">{cat.title}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{cat.desc}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-all">
                    Explore Library
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-10 rounded-[3rem] border border-white"
            >
              <div className="flex items-center justify-between mb-10">
                <button 
                  onClick={() => { setSelectedCat(null); setOpenArticle(null); }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-950 transition-all text-xs font-bold uppercase tracking-widest"
                >
                  <ArrowLeft size={16} />
                  Back to Categories
                </button>
                <div className="px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 italic">
                  Knowledge Base: {CATEGORIES.find(c => c.id === selectedCat)?.title}
                </div>
              </div>

              <div className="space-y-4">
                {activeArticles.map((art, i) => (
                  <div key={i} className="rounded-2xl border border-slate-100 bg-white/50 overflow-hidden transition-all">
                    <button 
                      onClick={() => setOpenArticle(openArticle === i ? null : i)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-white transition-colors group"
                    >
                      <span className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{art.q}</span>
                      <ChevronRight size={18} className={`text-slate-300 transition-transform duration-300 ${openArticle === i ? 'rotate-90 text-emerald-500' : ''}`} />
                    </button>
                    {openArticle === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="px-6 pb-6 text-sm text-slate-500 font-medium leading-relaxed italic border-t border-slate-50 pt-4"
                      >
                        {art.a}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-black text-slate-950 mb-8 flex items-center gap-3">
              <HelpCircle className="text-emerald-500" />
              Common Questions
            </h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="group flex items-center justify-between p-5 rounded-2xl bg-white/50 border border-white hover:bg-white hover:border-emerald-100 transition-all cursor-pointer shadow-sm">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-slate-950 transition-colors">{faq}</span>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="p-10 rounded-[3rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/40 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform">
              <MessageCircle size={160} />
            </div>
            
            <h3 className="text-3xl font-black mb-4 relative z-10">Still need help?</h3>
            <p className="text-slate-400 font-medium mb-8 relative z-10 leading-relaxed max-w-sm">
              Our enterprise support coordinators are available 24/7 for urgent on-site maintenance facilitation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <button 
                onClick={() => setIsSupportOpen(true)}
                className="flex-1 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
              >
                <MessageCircle size={18} />
                Live Chat
              </button>
              <a 
                href="mailto:support@fxr.io"
                className="flex-1 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10 flex items-center justify-center transition-all active:scale-95"
              >
                Email Support
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
