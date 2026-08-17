"use client";

import { useState } from "react";

/**
 * Newsletter / private-client-list signup. Posts to /api/newsletter, a
 * stubbed route handler that validates the address and logs the signup —
 * see src/app/api/newsletter/route.ts for where to wire a real ESP
 * (Klaviyo, Shopify's own customer list, etc.) later.
 */
export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return <p className="font-sans text-sm text-gold-soft">You are on the list. Welcome to the house.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-stretch gap-0 border-b border-ivory/25 focus-within:border-gold">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`flex-1 bg-transparent py-3 font-sans text-ivory placeholder:text-smoke outline-none ${compact ? "text-sm" : "text-base"}`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="whitespace-nowrap px-2 font-sans text-xs uppercase tracking-house text-gold transition hover:text-gold-soft disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Subscribe"}
      </button>
      {status === "error" && <p className="mt-2 text-xs text-cherry-bright">Something went wrong — please try again.</p>}
    </form>
  );
}
