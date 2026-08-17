import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 font-sans text-sm leading-relaxed text-ivory-dim md:pt-40">
      <h1 className="font-display text-3xl italic text-ivory">Terms of Service</h1>
      <p className="mt-6 border border-gold-dim/40 bg-chocolate/50 px-4 py-3 text-xs uppercase tracking-wide text-gold-soft">
        Placeholder — replace with counsel-reviewed terms of service before launch.
      </p>
      <p className="mt-6">
        This page is a placeholder for INGÉ FRANÇOIS&apos;s terms of service. A real terms document — covering
        purchases, returns, authentication guarantees for Private Collection pieces, and dispute resolution — should be
        drafted with legal counsel before this site goes live.
      </p>
    </div>
  );
}
