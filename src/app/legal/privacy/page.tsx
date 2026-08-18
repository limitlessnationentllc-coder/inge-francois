import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 pb-24 pt-[10.25rem] font-sans text-sm leading-relaxed text-ivory-dim md:pt-[12.25rem]">
      <h1 className="font-display text-3xl italic text-ivory">Privacy Policy</h1>
      <p className="mt-6 border border-gold-dim/40 bg-chocolate/50 px-4 py-3 text-xs uppercase tracking-wide text-gold-soft">
        Placeholder — replace with counsel-reviewed privacy policy language before launch.
      </p>
      <p className="mt-6">
        This page is a placeholder for <span className="wordmark-caps">INGÉ</span> FRANÇOIS&apos;s privacy policy. A real policy — covering what data is
        collected, how it is used, cookie and analytics disclosure, and applicable regional requirements (CCPA, GDPR,
        etc.) — should be drafted with legal counsel before this site goes live.
      </p>
    </div>
  );
}
