"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth";
import type { Session } from "@/lib/auth";
import { Menu, X, LogOut, LayoutDashboard, ChevronRight, User } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    router.push("/");
  };

  const isContractor = session?.role === "contractor";
  const isCustomer = session?.role === "customer";
  const isAdmin = session?.role === "admin";
  const isAdminPage = pathname.startsWith("/admin");

  // Admin portal & Contractor dashboard exclusion cases
  if (pathname === "/admin" || pathname.startsWith("/contractor/dashboard")) return null;

  const navLinks = isAdmin
    ? [
        { href: "/admin/jobs", label: "Job Queue" },
        { href: "/admin/supply", label: "Analytics" },
        { href: "/admin/contractors", label: "Contractors" },
      ]
    : isCustomer
    ? [
        { href: "/#services", label: "Services" },
        { href: "/dashboard", label: "My Jobs" },
      ]
    : isContractor
    ? [{ href: "/contractor/jobs", label: "Job Feed" }]
    : [
        { href: "/#services", label: "Services" },
        { href: "/#how-it-works", label: "How it Works" },
        { href: "/pricing", label: "Pricing" },
      ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isAdminPage ? "glass py-3 shadow-sm border-b" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href={isAdmin ? "/admin/jobs" : "/"} className="flex items-center gap-2 group">
          <div className="h-9 w-9 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-emerald-200 transition-transform group-hover:scale-105">
            F
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-950">
            Fixr {isAdmin && <span className="text-xs font-normal text-slate-400 ml-1">admin</span>}
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-emerald-600" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!session && (
            <Link href="/contractor/onboarding" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">
              For Contractors
            </Link>
          )}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-100 italic">
                {isAdmin ? "Admin Mode" : isContractor ? `Pro: ${session.contractorName}` : `Hi, ${session.user?.name.split(" ")[0]}`}
              </span>
              <Link
                href={isAdmin ? "/admin/jobs" : isContractor ? "/contractor/jobs" : "/dashboard"}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold transition-all shadow-md"
              >
                <LayoutDashboard size={14} />
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">
                Log in
              </Link>
              <Link
                href="/booking"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-semibold transition-all shadow-lg shadow-emerald-100 active:scale-[0.98]"
              >
                Get Started
                <ChevronRight size={14} />
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 right-0 border-b animate-slide-down p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-slate-900">
              {link.label}
            </Link>
          ))}
          {!session && (
            <Link href="/contractor/onboarding" onClick={() => setIsMenuOpen(false)} className="text-base font-medium text-slate-900">
              For Contractors
            </Link>
          )}
          <hr className="border-slate-100" />
          {session ? (
            <>
              <Link href={isAdmin ? "/admin/jobs" : isContractor ? "/contractor/jobs" : "/dashboard"} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-base font-semibold text-slate-900">
                <LayoutDashboard size={18} />
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-2 text-base font-semibold text-red-600">
                <LogOut size={18} />
                Log out
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="w-full py-3 rounded-xl border border-slate-200 text-center font-semibold text-slate-900">
                Log in
              </Link>
              <Link href="/booking" onClick={() => setIsMenuOpen(false)} className="w-full py-3 rounded-xl bg-emerald-600 text-white text-center font-semibold">
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
