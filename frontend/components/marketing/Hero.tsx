import { Badge } from "@/components/ui/Badge";

export function Hero() {
  return (
    <div>
      <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
        AI-powered pricing • Booked jobs • Verified contractors
      </Badge>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
        Book trusted home services instantly.
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500 md:text-lg">
        Describe the issue, get an instant price estimate, and dispatch the right contractor fast.
      </p>
    </div>
  );
}
