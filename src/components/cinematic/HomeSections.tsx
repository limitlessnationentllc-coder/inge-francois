import Link from "next/link";
import type { Product } from "@/types/product";
import { DEPARTMENTS } from "@/lib/data/departments";
import { PlaceholderPlate } from "@/components/product/PlaceholderPlate";
import { ProductCard } from "@/components/product/ProductCard";
import { CherryEmblem } from "./CherryEmblem";
import { Reveal } from "./Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/**
 * ACT III — "The House of INGÉ"
 * The visitor moves through the house: an intro statement, the department
 * gallery, featured pieces, and teasers for Private Collection, Concierge,
 * Originals, and the brand story — closing with the private-client
 * invitation. All reveals use the shared `<Reveal>` clip-path primitive,
 * created after Hero.tsx per the ScrollTrigger creation-order law.
 */

export function IntroLine() {
  return (
    <section id="house" className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-noir px-6 py-32 text-center">
      <Reveal>
        <CherryEmblem variant="line" size={36} className="mx-auto mb-6 text-gold" />
        <h2 className="max-w-3xl font-display text-3xl italic leading-snug text-ivory sm:text-5xl">
          A new expression of modern luxury.
          <br />
          Curated. Intentional. Exclusively <span className="wordmark-caps">INGÉ</span>.
        </h2>
      </Reveal>
    </section>
  );
}

export function HouseGallery() {
  return (
    <section aria-labelledby="house-departments-heading" className="bg-noir px-5 py-24 md:px-10 lg:px-16">
      <Reveal className="mb-12">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The House</span>
        <h2 id="house-departments-heading" className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">
          Every room, considered.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DEPARTMENTS.map((dept) => (
          <Reveal key={dept.slug}>
            <Link href={`/${dept.slug}`} className="group relative block aspect-[3/4] overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                <PlaceholderPlate seed={`dept-${dept.slug}`} department={dept.slug} alt={dept.frenchName} className="h-full w-full" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-noir-deep/90 via-noir-deep/10 to-transparent p-5">
                <span className="font-sans text-[10px] uppercase tracking-house text-gold-soft">{dept.number}</span>
                <h3 className="mt-1 font-display text-2xl italic text-ivory">{dept.frenchName}</h3>
                <p className="mt-1 font-sans text-xs text-ivory-dim">{dept.tagline}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function FeaturedCollections({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <section aria-labelledby="featured-heading" className="bg-charcoal px-5 py-24 md:px-10 lg:px-16">
      <Reveal className="mb-12 flex items-end justify-between">
        <div>
          <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Featured</span>
          <h2 id="featured-heading" className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">
            Newly Entered the House
          </h2>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {products.map((p) => (
          <Reveal key={p.id}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function PrivateCollectionTeaser() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-noir-deep px-6 py-28 text-center">
      <div className="absolute inset-0 gloss-cherry opacity-40" aria-hidden />
      <Reveal className="relative flex flex-col items-center gap-6">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The Private Collection</span>
        <h2 className="max-w-2xl font-display text-3xl italic text-ivory sm:text-5xl">Not listed. Not repeated.</h2>
        <p className="max-w-md font-sans text-sm text-ivory-dim">
          Rare, limited, and privately sourced pieces — available only by request.
        </p>
        <Link
          href="/private-collection"
          className="mt-2 border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
        >
          View the Collection
        </Link>
      </Reveal>
    </section>
  );
}

export function ConciergeTeaser() {
  return (
    <section className="grid grid-cols-1 items-center bg-noir md:grid-cols-2">
      <Reveal className="relative aspect-[4/3] md:aspect-auto md:h-full">
        <div className="h-full w-full gloss-cherry" aria-hidden />
      </Reveal>
      <Reveal className="flex flex-col items-start gap-6 px-8 py-20 md:px-16">
        <span className="wordmark-caps font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Concierge</span>
        <h2 className="font-display text-3xl italic text-ivory sm:text-4xl">Luxury, personally considered.</h2>
        <p className="max-w-md font-sans text-sm text-ivory-dim">
          Personal styling, executive wardrobe consultation, designer sourcing, and private appointments — for clients who
          need more than a storefront.
        </p>
        <Link
          href="/concierge"
          className="border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
        >
          Speak With Concierge
        </Link>
      </Reveal>
    </section>
  );
}

export function OriginalsTeaser() {
  return (
    <section className="grid grid-cols-1 items-center bg-charcoal md:grid-cols-2">
      <Reveal className="order-2 flex flex-col items-start gap-6 px-8 py-20 md:order-1 md:px-16">
        <span className="wordmark-caps font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Originals</span>
        <h2 className="font-display text-3xl italic text-ivory sm:text-4xl">Where the house begins to speak for itself.</h2>
        <p className="max-w-md font-sans text-sm text-ivory-dim">
          Proprietary <span className="wordmark-caps">INGÉ</span> designs — the first pieces conceived, not merely curated. A small collection today; the
          foundation of an original fashion house tomorrow.
        </p>
        <Link
          href="/originals"
          className="border border-gold px-8 py-3.5 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
        >
          Discover <span className="wordmark-caps">INGÉ</span> Originals
        </Link>
      </Reveal>
      <Reveal className="relative order-1 aspect-[4/3] md:order-2 md:aspect-auto md:h-full">
        <PlaceholderPlate seed="originals-teaser" department="originals" alt="INGÉ Originals Founding Collection" className="h-full w-full" />
      </Reveal>
    </section>
  );
}

export function HouseStoryTeaser() {
  return (
    <section className="flex flex-col items-center gap-6 bg-noir px-6 py-28 text-center">
      <Reveal className="flex flex-col items-center gap-6">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The House</span>
        <h2 className="max-w-2xl font-display text-3xl italic text-ivory sm:text-4xl">
          Built like a house. Curated like a wardrobe.
        </h2>
        <p className="max-w-lg font-sans text-sm text-ivory-dim">
          <span className="wordmark-caps">INGÉ</span> FRANÇOIS began as a private boutique — a single point of view on what luxury should feel like for the people
          who already command a room. What comes next is being built the same way: deliberately.
        </p>
        <Link href="/the-house" className="font-sans text-xs uppercase tracking-house text-gold underline underline-offset-8 hover:text-gold-soft">
          Read the House Story
        </Link>
      </Reveal>
    </section>
  );
}

export function PrivateClientInvitation() {
  return (
    <section className="flex flex-col items-center gap-8 border-t border-ivory/10 bg-noir-deep px-6 py-28 text-center">
      <Reveal className="flex flex-col items-center gap-6">
        <CherryEmblem variant="gloss" size={56} />
        <span className="wordmark-caps font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Private Clientele</span>
        <h2 className="max-w-xl font-display text-3xl italic text-ivory sm:text-4xl">Before anyone else.</h2>
        <p className="max-w-md font-sans text-sm text-ivory-dim">
          Early access, private drops, sourcing, and styling appointments — reserved for the house&apos;s private clientele.
        </p>
        <NewsletterForm />
        <Link href="/private-clientele" className="font-sans text-xs uppercase tracking-house text-gold underline underline-offset-8 hover:text-gold-soft">
          Apply for Access
        </Link>
      </Reveal>
    </section>
  );
}
