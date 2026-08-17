"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/private-clientele", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), note: form.get("note") }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-gold-dim/50 px-8 py-10 text-center">
        <p className="font-display text-2xl italic text-ivory">Your application has been received.</p>
        <p className="mt-3 font-sans text-sm text-ivory-dim">INGÉ Private Clientele reviews applications personally.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto flex w-full max-w-md flex-col gap-6">
      <div>
        <label htmlFor="name" className="font-sans text-[11px] uppercase tracking-house text-smoke">
          Full Name
        </label>
        <input id="name" name="name" required className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold" />
      </div>
      <div>
        <label htmlFor="email" className="font-sans text-[11px] uppercase tracking-house text-smoke">
          Email Address
        </label>
        <input id="email" name="email" type="email" required className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold" />
      </div>
      <div>
        <label htmlFor="note" className="font-sans text-[11px] uppercase tracking-house text-smoke">
          What draws you to INGÉ? (Optional)
        </label>
        <textarea id="note" name="note" rows={3} className="mt-2 w-full resize-none border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold" />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 w-full bg-gold py-4 font-sans text-xs uppercase tracking-house text-noir transition hover:bg-gold-soft disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Apply for Access"}
      </button>
      {status === "error" && <p className="font-sans text-xs text-cherry-bright">Something went wrong — please try again.</p>}
    </form>
  );
}
