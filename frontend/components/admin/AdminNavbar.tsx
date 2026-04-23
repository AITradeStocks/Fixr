"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession, clearSession } from "@/lib/auth";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Target, 
  Package, 
  LogOut,
  Bell,
  Settings,
  ShieldCheck,
  ChevronRight,
  Activity,
  AlertCircle,
  Clock,
  CheckCircle2,
  Trash2,
  UserPlus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";

const NAV_ITEMS = [
  { label: "Jobs", href: "/admin/jobs", icon: Briefcase },
  { label: "Contractors", href: "/admin/contractors", icon: Users },
  { label: "Leads", href: "/admin/leads", icon: Target },
  { label: "Supply", href: "/admin/supply", icon: Package },
];

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  { id: "1", type: "warning", title: "Supply Alert", message: "48h Integrity violation detected for Unit #7A2", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
  { id: "2", type: "success", title: "System Growth", message: "3 New contractors activated in the last hour", timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), read: false },
  { id: "3", type: "info", title: "Global Sync", message: "AWS Node US-EAST-1 synchronization complete", timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), read: true },
];

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const session = getSession();
    setIsAdmin(session?.role === "admin");
    
    const fetch = async () => {
      try {
        const actions = await api.getAdminActions() as any[];
        if (actions && actions.length > 0) {
          const mapped: Notification[] = actions.map((a: any) => {
            let type: Notification["type"] = "info";
            let title = "System Event";
            
            if (a.actionType === "force-status") {
              type = "warning";
              title = "Manual Override";
            } else if (a.actionType === "manual-assign") {
              type = "success";
              title = "Job Dispatch";
            }

            return {
              id: a.id,
              type,
              title,
              message: a.note || `Action: ${a.actionType}`,
              timestamp: a.createdAt,
              read: false
            };
          });
          
          setNotifications(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newEntries = mapped.filter(m => !existingIds.has(m.id));
            if (newEntries.length === 0) return prev;
            return [...newEntries, ...prev].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 20);
          });
        }
      } catch (e) {
        console.error("Notification sync failed", e);
      }
    };
    
    fetch();
    const interval = setInterval(fetch, 15000);
    return () => clearInterval(interval);
  }, [pathname]);

  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  function flushNotifications() {
    setNotifications([]);
    setShowNotifications(false);
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    // Add artificial delay for "Enterprise decommissioning" feel
    await new Promise(r => setTimeout(r, 800));
    clearSession();
    router.push("/admin");
  }

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="h-12 w-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <div className="text-center">
            <h2 className="text-white font-black uppercase tracking-widest text-lg">Secure De-authorization</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Clearing session tokens & cache...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/admin/jobs" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <span className="text-lg font-black text-white">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white tracking-tight">Fixr Control</span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest leading-none">Enterprise</span>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all group overflow-hidden ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/5 rounded-lg border border-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon size={16} className={isActive ? "text-emerald-400" : "group-hover:text-emerald-400/70 transition-colors"} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* System Status */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-white/5">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Systems Nominal</span>
            </div>

            <div className="h-6 w-px bg-white/10 mx-2 hidden md:block" />

            <div className="flex items-center gap-2">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 transition-colors relative rounded-xl ${
                    showNotifications ? "bg-white/10 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] border border-slate-950" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <>
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setShowNotifications(false)} 
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-80 z-20 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl shadow-3xl"
                      >
                        <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                          <h3 className="text-xs font-black text-white uppercase tracking-widest">Active Intelligence</h3>
                            <button 
                              onClick={flushNotifications}
                              className="text-[9px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-400 transition-colors"
                            >
                              Flush Registry
                            </button>
                        </div>
                        <div className="max-h-[350px] overflow-y-auto no-scrollbar divide-y divide-white/5">
                          {notifications.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No active alerts</p>
                            </div>
                          ) : (
                            notifications.map((n) => {
                              const Icon = n.type === "warning" ? AlertCircle : (n.type === "success" ? CheckCircle2 : Activity);
                              const color = n.type === "warning" ? "text-orange-400" : (n.type === "success" ? "text-emerald-400" : "text-blue-400");
                              
                              return (
                                <div key={n.id} className={`px-6 py-5 hover:bg-white/5 transition-all group cursor-default ${!n.read ? "bg-emerald-500/[0.02]" : ""}`}>
                                  <div className="flex gap-4">
                                    <div className={`mt-1 shrink-0 ${color}`}>
                                      <Icon size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-1">
                                        <p className="text-[10px] font-black text-white uppercase tracking-wider">{n.title}</p>
                                        <span className="text-[8px] font-bold text-slate-600 uppercase">
                                          {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                      </div>
                                      <p className="text-xs font-medium text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                                        {n.message}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                        <Link 
                          href="/admin/jobs" 
                          onClick={() => setShowNotifications(false)}
                          className="block w-full py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-white/[0.02] hover:bg-white/5 hover:text-white transition-all border-t border-white/5"
                        >
                          View Full Registry
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
