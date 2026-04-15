"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  ArrowLeft, 
  DollarSign, 
  Clock, 
  Zap, 
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Building2,
  Users
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface UserAnalytics {
  totalInvestment: number;
  avgResolutionTime: number;
  prosDispatched: number;
  facilityUpTime: number;
  categoryMix: { name: string; count: number; percentage: number }[];
  investmentHistory: { month: string; amount: number }[];
}

export default function AnalysisPage() {
  const [activeRange, setActiveRange] = useState("Last 30 Days");
  const [data, setData] = useState<UserAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getUserAnalytics()
      .then((res: any) => setData(res))
      .catch(err => console.error("Failed to load analytics", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <main className="min-h-screen bg-mesh flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 border-4 border-emerald-600/30 border-t-emerald-600 rounded-full animate-spin" />
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Compiling Data...</p>
      </div>
    </main>
  );

  const stats = [
    { label: "Total Asset Investment", value: `$${data?.totalInvestment.toLocaleString() || '0'}`, trend: "+12%", up: true, icon: <DollarSign size={20} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Avg. Resolution Time", value: `${data?.avgResolutionTime || '0'} hrs`, trend: "-18%", up: false, icon: <Clock size={20} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Facility Up-time", value: `${data?.facilityUpTime || '99.8'}%`, trend: "+0.4%", up: true, icon: <Zap size={20} />, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Verified Pros Dispatched", value: data?.prosDispatched.toString() || '0', trend: "0%", up: true, icon: <Users size={20} />, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const colors = ["bg-emerald-500", "bg-blue-500", "bg-amber-500", "bg-slate-400"];
  const categories = (data?.categoryMix || []).map((c, i) => ({
    ...c,
    color: colors[i % colors.length]
  }));

  const history = data?.investmentHistory || [];
  const maxAmount = Math.max(...history.map(h => h.amount), 1);

  return (
    <main className="min-h-screen bg-mesh pb-24 pt-10">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 border border-white text-slate-400 hover:text-slate-900 text-xs font-bold transition-all group backdrop-blur-sm shadow-sm active:scale-95">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Return to Dashboard
          </Link>
        </motion.div>

        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-emerald-600 border border-emerald-500 box-content rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-emerald-200 italic">Insights Alpha</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-950">
              Service Analysis
            </h1>
            <p className="mt-2 text-slate-500 font-medium max-w-md">
              A comprehensive data layer for your property maintenance trends and financial performance benchmarks.
            </p>
          </motion.div>

          {/* Time range selector */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-white/50 border border-white shadow-sm">
            {["Last 30 Days", "Q1 2024", "Year to Date"].map((range, i) => (
              <button 
                key={range} 
                onClick={() => setActiveRange(range)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeRange === range ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-white hover:text-slate-950"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Topline Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm transition-all hover:border-white"
            >
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 shadow-inner`}>
                {stat.icon}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-black text-slate-950">{stat.value}</p>
                <div className={`flex items-center gap-0.5 text-xs font-black ${stat.up ? "text-emerald-600" : "text-blue-600"}`}>
                  {stat.up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {stat.trend}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass p-10 rounded-[3rem] border border-white/50 shadow-sm"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-xl font-bold text-slate-950 flex items-center gap-2">
                  <TrendingUp className="text-emerald-500" size={20} />
                  Investment History
                </h3>
                <p className="text-sm font-medium text-slate-400 mt-1">Maintenance spending across portfolio.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  Actual
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <div className="h-2 w-2 rounded-full bg-slate-200" />
                  Budget
                </div>
              </div>
            </div>

            {/* Visual Bars Container */}
            <div className="flex items-end justify-between gap-4 h-[240px] mb-8">
              {history.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col gap-2 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(h.amount / maxAmount) * 100}%` }}
                    transition={{ delay: 0.5 + (i * 0.05), duration: 1, ease: "easeOut" }}
                    className={`w-full rounded-xl transition-all group-hover:bg-emerald-600 ${
                      i === history.length - 1 ? "bg-emerald-600 shadow-lg shadow-emerald-200" : "bg-emerald-500/20"
                    }`}
                  />
                  <div className="h-2 rounded-full bg-slate-50 w-full group-hover:bg-slate-100 transition-colors" />
                </div>
              ))}
            </div>
            
            <div className="flex justify-between px-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
              {history.map((h, i) => (
                <span key={i} className={i === history.length - 1 ? "text-emerald-500" : ""}>
                  {h.month}{i === history.length - 1 ? " (Current)" : ""}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-8 rounded-[2.5rem] border border-white/50 shadow-sm"
            >
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-8 flex items-center justify-between">
                Category Mix
                <PieChart size={16} className="text-slate-400" />
              </h3>
              <div className="space-y-6">
                {categories.map((cat, i) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-slate-600">{cat.name} ({cat.count} jobs)</span>
                      <span className="text-slate-950">{cat.percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${cat.percentage}%` }}
                        transition={{ delay: 0.6 + (i * 0.1), duration: 1 }}
                        className={`h-full ${cat.color} rounded-full`} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="p-8 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200"
            >
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={16} className="text-indigo-200" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Property Portfolio</span>
              </div>
              <p className="text-lg font-bold leading-tight mb-2">Multi-Property Insights arriving soon.</p>
              <p className="text-xs text-indigo-100 font-medium leading-relaxed mb-6 opacity-70">Elevate your management to see performance benchmarks across all your enterprise assets.</p>
              <Link 
                href="/pricing"
                className="w-full py-3.5 rounded-xl bg-white text-indigo-600 font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg flex items-center justify-center"
              >
                Request Upgrade
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
