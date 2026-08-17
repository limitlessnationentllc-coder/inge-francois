import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/cinematic/Reveal";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";
import { DEPARTMENTS } from "@/lib/data/departments";

export const metadata: Metadata = {
  title: "The House",
  description: "The story of INGÉ FRANÇOIS — a private luxury house, curated with intent.",
};

export default function TheHousePage() {
  return (
    <div className="bg-noir pt-16 md:pt-20">
      <section className="flex min-h-[60vh] flex-col items-center justify-center gap-6 gloss-cherry px-6 py-24 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <CherryEmblem variant="gloss" size={64} />
          <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The House</span>
          <h1 className="max-w-2xl font-display text-4xl italic text-ivory sm:text-6xl">Built like a house. Curated like a wardrobe.</h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 font-sans text-base leading-relaxed text-ivory-dim">
        <Reveal className="flex flex-col gap-6">
          <p>
            INGÉ FRANÇOIS began with a single conviction: that luxury shouldn&apos;t be shouted, it should be selected.
            Not everything. Not everyone. The right pieces, for the people who already command a room and simply need
            their wardrobe to keep pace.
          </p>
          <p>
            The house opened as a curated boutique — designer shoes, handbags, tailored womenswear, menswear, jewelry,
            and a small edit of home and beauty — sourced with the same restraint a private client would expect from a
            personal stylist, not a department store.
          </p>
          <p>
            What sits alongside the curation is something we&apos;re building slowly and deliberately: INGÉ Originals,
            the house&apos;s own proprietary designs. A first collection, small on purpose. The beginning of a fashion
            house that speaks entirely in its own voice — the same black-cherry, oxblood-lacquer language that opens
            every visit to INGÉ.
          </p>
          <p>
            The house is still being built. What it becomes — beyond fashion, beyond this first collection — will
            arrive the same way everything here does: intentionally, and only when it&apos;s ready to meet the
            standard the name now carries.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-ivory/10 bg-charcoal px-5 py-20 md:px-10 lg:px-16">
        <Reveal className="mb-10 text-center">
          <h2 className="font-display text-2xl italic text-ivory sm:text-3xl">The Rooms of the House</h2>
        </Reveal>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
          {DEPARTMENTS.map((d) => (
            <Reveal key={d.slug}>
              <Link href={`/${d.slug}`} className="flex items-baseline gap-4 border-b border-ivory/10 py-3 font-sans text-sm text-ivory-dim hover:text-gold">
                <span className="text-xs text-smoke">{d.number}</span>
                {d.frenchName}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-24 text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <p className="font-display text-2xl italic text-ivory sm:text-3xl">Curated. Intentional. Exclusively INGÉ.</p>
          <Link href="/concierge" className="border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir">
            Speak With Concierge
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
