import type { Metadata } from "next";
import { ConciergeForm } from "@/components/forms/ConciergeForm";
import { Reveal } from "@/components/cinematic/Reveal";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";

export const metadata: Metadata = {
  title: "INGÉ Concierge",
  description: "Personal styling, executive wardrobe consultation, designer sourcing, and private appointments.",
  alternates: { canonical: "/concierge" },
};

const SERVICES = [
  "Personal Styling",
  "Executive Wardrobe Planning",
  "Designer Sourcing",
  "Hard-to-Find Pieces",
  "Special-Occasion Styling",
  "Private Shopping Appointments",
  "Gift Sourcing",
  "Home & Lifestyle Curation",
];

interface PageProps {
  searchParams: Promise<{ piece?: string }>;
}

export default async function ConciergePage({ searchParams }: PageProps) {
  const { piece } = await searchParams;

  return (
    <div className="bg-noir pt-[6.25rem] md:pt-[7.25rem]">
      <section className="flex min-h-[55vh] flex-col items-center justify-center gap-6 gloss-cherry px-6 py-24 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <CherryEmblem variant="gloss" size={64} />
          <span className="wordmark-caps font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Concierge</span>
          <h1 className="max-w-2xl font-display text-4xl italic text-ivory sm:text-6xl">Luxury, personally considered.</h1>
          <p className="max-w-md font-sans text-sm text-ivory-dim">
            For clients who want more than a storefront — a private point of contact inside the house.
          </p>
        </Reveal>
      </section>

      <section className="grid grid-cols-1 gap-12 px-5 py-20 md:px-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-16">
        <Reveal>
          <h2 className="font-display text-2xl italic text-ivory">What Concierge Handles</h2>
          <ul className="mt-6 flex flex-col gap-3 font-sans text-sm text-ivory-dim">
            {SERVICES.map((s) => (
              <li key={s} className="flex items-center gap-3 border-b border-ivory/10 pb-3">
                <span className="h-1 w-1 rounded-full bg-gold" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-sans text-sm text-ivory-dim">
            Rare and privately sourced inventory across the house — Private Collection pieces,{" "}
            <span className="wordmark-caps">INGÉ</span> Originals limited
            runs, and anything marked <em className="text-gold-soft not-italic">Available by Request</em> — is offered
            exclusively through Concierge.
          </p>
        </Reveal>

        <Reveal>
          <ConciergeForm prefillPiece={piece} />
        </Reveal>
      </section>
    </div>
  );
}
