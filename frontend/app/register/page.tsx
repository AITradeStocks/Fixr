"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { setCustomerSession } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(f: string, v: string) { setForm(p => ({ ...p, [f]: v })); setError(""); }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.password) { setError("Name, email and password are required"); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (form.password !== form.confirm) { setError("Passwords don't match"); return; }
    setLoading(true);
    try {
      const result = await api.register({ name: form.name, email: form.email, password: form.password, phone: form.phone || undefined }) as any;
      setCustomerSession(result.token, result.user);
      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message || "Registration failed");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600">
            <span className="text-lg font-bold text-white">F</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">Book and track home services jobs</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          {[
            { label: "Full name *", field: "name", type: "text", placeholder: "John Smith" },
            { label: "Email *", field: "email", type: "email", placeholder: "you@example.com" },
            { label: "Phone", field: "phone", type: "tel", placeholder: "+1 512 555 0100" },
            { label: "Password *", field: "password", type: "password", placeholder: "Min. 6 characters" },
            { label: "Confirm password *", field: "confirm", type: "password", placeholder: "Re-enter password" },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="text-sm font-medium text-slate-700">{label}</label>
              <input
                type={type}
                value={form[field as keyof typeof form]}
                onChange={e => update(field, e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                placeholder={placeholder}
                className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-50 transition-colors"
              />
            </div>
          ))}

          {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors">
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 hover:underline font-medium">Log in</a>
        </p>
        <p className="mt-2 text-center text-sm text-slate-500">
          <a href="/" className="text-slate-400 hover:text-slate-600">← Back to home</a>
        </p>
      </div>
    </main>
  );
}
