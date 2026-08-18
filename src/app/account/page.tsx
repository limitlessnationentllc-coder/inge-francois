import type { Metadata } from "next";
import Link from "next/link";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";

export const metadata: Metadata = { title: "Account", robots: { index: false, follow: true } };

export default function AccountPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-[8.25rem] text-center">
      <CherryEmblem variant="line" size={36} className="text-gold" />
      <h1 className="font-display text-3xl italic text-ivory sm:text-4xl">Account</h1>
      <p className="max-w-sm font-sans text-sm text-ivory-dim">
        Client accounts connect once the house is live on Shopify — orders, saved addresses, and private-client status
        will live here. Until then, <span className="wordmark-caps">INGÉ</span> Concierge can assist directly.
      </p>
      <Link href="/concierge" className="border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir">
        Speak With Concierge
      </Link>
    </div>
  );
}
