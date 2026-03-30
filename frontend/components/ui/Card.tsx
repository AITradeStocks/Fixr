import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[28px] border border-slate-200 bg-white ${className}`}>{children}</div>;
}
