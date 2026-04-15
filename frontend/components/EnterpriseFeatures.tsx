"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, CreditCard, Users, Clock, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: <Zap className="text-amber-500" />,
    title: "Instant AI Estimation",
    description: "Our proprietary AI analyzes your issue details to provide accurate market fixed-rates in real-time.",
    color: "bg-amber-50"
  },
  {
    icon: <ShieldCheck className="text-emerald-500" />,
    title: "Vetted Professionals",
    description: "Every contractor undergoes a rigorous 5-step vetting process including background checks and trade verification.",
    color: "bg-emerald-50"
  },
  {
    icon: <CreditCard className="text-blue-500" />,
    title: "Fixed-Price Guarantee",
    description: "No hidden fees or hourly variability. The price you see is the price you pay, guaranteed.",
    color: "bg-blue-50"
  },
  {
    icon: <Users className="text-purple-500" />,
    title: "Enterprise Solutions",
    description: "Multi-property management dashboards designed for facilities managers and real estate partners.",
    color: "bg-purple-50"
  },
  {
    icon: <Clock className="text-rose-500" />,
    title: "24/7 Dispatch",
    description: "Emergency services available round-the-clock with automated routing to the nearest available professional.",
    color: "bg-rose-50"
  },
  {
    icon: <Globe className="text-slate-500" />,
    title: "National Coverage",
    description: "Reliable service standards across every major metropolitan area, ensuring quality consistency.",
    color: "bg-slate-50"
  }
];

export function EnterpriseFeatures() {
  return (
    <section className="py-24 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-600 font-bold tracking-widest uppercase text-xs mb-3"
          >
            Efficiency at Scale
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-950 tracking-tight"
          >
            Built for reliability. <br />
            <span className="text-slate-400">Trusted by enterprises.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-slate-100 bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-950 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
