"use client";

import { usePathname } from "next/navigation";
import { AdminNavbar } from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show the navbar on the main admin login page
  const isLoginPage = pathname === "/admin";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <AdminNavbar />
      <div className="relative">
        {/* Subtle background glow for enterprise feel */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20">
          <div className="absolute top-[-100px] left-1/4 w-[50%] h-full bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>
        
        <main className="relative">{children}</main>
      </div>
      
      {/* Global Admin Footer */}
      <footer className="border-t border-white/5 bg-slate-950/50 py-8 mt-12">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            Fixr Enterprise Solution · internal use only · © 2024
          </p>
        </div>
      </footer>
    </div>
  );
}
