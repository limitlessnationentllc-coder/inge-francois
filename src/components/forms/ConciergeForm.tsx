"use client";

import { useState } from "react";

const REQUEST_TYPES = [
  "Personal Styling",
  "Executive Wardrobe Consultation",
  "Designer Sourcing",
  "Hard-to-Find Piece",
  "Special-Occasion Styling",
  "Private Shopping Appointment",
  "Gift Sourcing",
  "Home & Lifestyle Curation",
  "Other",
];

export function ConciergeForm({ prefillPiece }: { prefillPiece?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      requestType: form.get("requestType"),
      message: form.get("message"),
    };
    try {
      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
        <p className="font-display text-2xl italic text-ivory">Your request has been received.</p>
        <p className="mt-3 font-sans text-sm text-ivory-dim">
          An INGÉ Concierge specialist will reach out personally within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Full Name" name="name" type="text" required />
        <Field label="Email Address" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="requestType" className="font-sans text-[11px] uppercase tracking-house text-smoke">
          Type of Request
        </label>
        <select
          id="requestType"
          name="requestType"
          required
          defaultValue=""
          className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold [&>option]:bg-noir"
        >
          <option value="" disabled>
            Select a request type
          </option>
          {REQUEST_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="font-sans text-[11px] uppercase tracking-house text-smoke">
          Tell Us What You&apos;re Looking For
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={prefillPiece ? `I'd like to request: ${prefillPiece}\n\n` : undefined}
          className="mt-2 w-full resize-none border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-2 w-full bg-gold py-4 font-sans text-xs uppercase tracking-house text-noir transition hover:bg-gold-soft disabled:opacity-50 sm:w-auto sm:px-12"
      >
        {status === "loading" ? "Sending…" : "Request a Private Appointment"}
      </button>
      {status === "error" && <p className="font-sans text-xs text-cherry-bright">Something went wrong — please try again, or email us directly.</p>}
    </form>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="font-sans text-[11px] uppercase tracking-house text-smoke">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-ivory/25 bg-transparent py-3 font-sans text-ivory outline-none focus:border-gold"
      />
    </div>
  );
}
