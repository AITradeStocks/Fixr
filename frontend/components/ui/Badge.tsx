import React from "react";

export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${className}`}>{children}</div>;
}
