"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSession, clearSession } from "@/lib/auth";
import type { Session } from "@/lib/auth";

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setSession(getSession());
    setMenuOpen(false);
  }, [pathname]);

  function handleLogout() {
    clearSession();
    router.push("/");
  }

  const isContractor = session?.role === "contractor";
  const isCustomer = session?.role === "customer";
  const isAdmin = session?.role === "admin";
  const isAdminPage = pathname.startsWith("/admin");

  // Hide navbar on admin entry login page
  if (pathname === "/admin") return null;

  const navLinks = isAdmin
    ? [
        { href: "/admin/jobs", label: "Job queue" },
        { href: "/admin/supply", label: "Analytics" },
        { href: "/admin/contractors", label: "Contractors" },
        { href: "/admin/leads", label: "CRM leads" },
      ]
    : isCustomer
    ? [
        { href: "/", label: "Book a job" },
        { href: "/dashboard", label: "My jobs" },
      ]
    : isContractor
    ? [{ href: "/contractor/jobs", label: "Job feed" }]
    : [
        { href: "/", label: "Home" },
        { href: "/contractor/onboarding", label: "Join as contractor" },
      ];

  const bgClass = isAdminPage ? "border-slate-800 bg-slate-950/95" : "border-slate-100 bg-white/95";
  const textClass = isAdminPage ? "text-white" : "text-slate-950";
  const linkActive = isAdminPage ? "bg-slate-800 text-white font-medium" : "bg-slate-100 text-slate-950 font-medium";
  const linkInactive = isAdminPage ? "text-slate-400 hover:text-white hover:bg-slate-800" : "text-slate-500 hover:text-slate-950 hover:bg-slate-50";
  const btnClass = isAdminPage ? "border-slate-700 text-slate-400 hover:bg-slate-800" : "border-slate-200 text-slate-500 hover:bg-slate-50";

  return (
    <nav className={`sticky top-0 z-50 border-b backdrop-blur-sm ${bgClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <a href={isAdmin ? "/admin/jobs" : "/"} className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-sm font-bold text-white">F</span>
          <span className={`text-lg font-semibold tracking-tight ${textClass}`}>
            Fixr {isAdmin && <span className="text-xs font-normal text-slate-400 ml-1">admin</span>}
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className={`rounded-xl px-3 py-2 text-sm transition-colors ${pathname === link.href ? linkActive : linkInactive}`}>
              {link.label}
            </a>
          ))}

          {/* Not logged in */}
          {!session && (
            <>
              <a href="/login" className={`ml-1 rounded-xl border px-3 py-2 text-sm transition-colors ${btnClass}`}>
                Log in
              </a>
              <a href="/register" className="ml-1 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                Sign up
              </a>
              <a href="/contractor/login" className={`ml-1 rounded-xl border px-3 py-2 text-sm transition-colors ${btnClass}`}>
                Contractor
              </a>
              <a href="/admin" className={`ml-1 rounded-xl border px-3 py-2 text-sm transition-colors ${btnClass}`}>
                Admin
              </a>
            </>
          )}

          {/* Customer greeting */}
          {isCustomer && session.user && (
            <span className="mx-2 text-sm text-slate-400">
              Hi, <span className="font-medium text-slate-700">{session.user.name.split(" ")[0]}</span>
            </span>
          )}

          {/* Contractor greeting */}
          {isContractor && (
            <span className="mx-2 text-sm text-slate-400">
              Hi, <span className="font-medium text-slate-700">{session.contractorName}</span>
            </span>
          )}

          {/* Logout */}
          {(isCustomer || isContractor || isAdmin) && (
            <button onClick={handleLogout}
              className={`ml-1 rounded-xl border px-3 py-2 text-sm transition-colors ${btnClass}`}>
              {isAdmin ? "Exit admin" : isContractor ? "Log out" : "Log out"}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          className={`md:hidden rounded-xl border p-2 transition-colors ${btnClass}`}>
          {menuOpen
            ? <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={`md:hidden border-t px-4 py-3 space-y-1 ${isAdminPage ? "border-slate-800 bg-slate-900" : "border-slate-100 bg-white"}`}>
          {isCustomer && session?.user && (
            <p className="px-3 py-2 text-sm text-slate-500">Hi, <span className="font-medium">{session.user.name}</span></p>
          )}
          {isContractor && (
            <p className="px-3 py-2 text-sm text-slate-500">Hi, <span className="font-medium">{session?.contractorName}</span></p>
          )}
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className={`block rounded-xl px-3 py-2.5 text-sm ${pathname === link.href ? linkActive : isAdminPage ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>
              {link.label}
            </a>
          ))}
          {!session && (
            <>
              <a href="/login" className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Log in</a>
              <a href="/register" className="block rounded-xl px-3 py-2.5 text-sm text-emerald-600 font-medium hover:bg-emerald-50">Sign up</a>
              <a href="/contractor/login" className="block rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">Contractor login</a>
              <a href="/admin" className="block rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50">Admin panel</a>
            </>
          )}
          {isAdmin && (
            <>
              <a href="/admin/jobs" className={`block rounded-xl px-3 py-2.5 text-sm ${isAdminPage ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Jobs</a>
              <a href="/admin/supply" className={`block rounded-xl px-3 py-2.5 text-sm ${isAdminPage ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Analytics</a>
              <a href="/admin/contractors" className={`block rounded-xl px-3 py-2.5 text-sm ${isAdminPage ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>Contractors</a>
              <a href="/admin/leads" className={`block rounded-xl px-3 py-2.5 text-sm ${isAdminPage ? "text-slate-400 hover:bg-slate-800" : "text-slate-600 hover:bg-slate-50"}`}>CRM leads</a>
            </>
          )}
          {(isCustomer || isContractor || isAdmin) && (
            <button onClick={handleLogout}
              className={`w-full text-left rounded-xl px-3 py-2.5 text-sm ${isAdminPage ? "text-red-400 hover:bg-red-900/20" : "text-red-600 hover:bg-red-50"} transition-colors`}>
              {isAdmin ? "Exit admin" : "Log out"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
