import React from "react";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
}) {
  const styles = {
    primary: "bg-emerald-600 text-white border border-emerald-600 hover:bg-emerald-700",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    ghost: "bg-transparent text-slate-700 border border-transparent hover:bg-slate-100",
    dark: "bg-slate-950 text-white border border-slate-950 hover:bg-slate-900"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
