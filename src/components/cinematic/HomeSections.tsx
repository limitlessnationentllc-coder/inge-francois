import Link from "next/link";
import type { Product } from "@/types/product";
import { DEPARTMENTS } from "@/lib/data/departments";
import { PlaceholderPlate } from "@/components/product/PlaceholderPlate";
import { ProductCard } from "@/components/product/ProductCard";
import { CherryEmblem } from "./CherryEmblem";
import { Reveal } from "./Reveal";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

/** ACT III — The House of INGÉ */
export function IntroLine() {
  return (
    <section id="house" className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-noir px-6 py-32 text-center">
      <Reveal>
        <CherryEmblem variant="line" size={36} className="mx-auto mb-6 text-gold" />
        <h1 className="max-w-4xl font-display text-3xl italic leading-snug text-ivory sm:text-5xl">
          Private Luxury Boutique for Pre-Loved Designer Fashion
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ivory-dim sm:text-base">
          Discover <span className="wordmark-caps">INGÉ</span> in Stockbridge, Georgia — a curated private luxury boutique serving Henry County and South Metro Atlanta with new, gently used, and pre-loved designer fashion, handbags, shoes, jewelry, professional clothing, and private styling.
        </p>
        <p className="mt-4 font-sans text-[11px] uppercase tracking-house text-gold-soft">
          Stockbridge, GA · Henry County · South Metro Atlanta
        </p>
      </Reveal>
    </section>
  );
}

export function HouseGallery() {
  return (
    <section aria-labelledby="house-departments-heading" className="bg-noir px-5 py-24 md:px-10 lg:px-16">
      <Reveal className="mb-12">
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The House</span>
        <h2 id="house-departments-heading" className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">Every room, considered.</h2>
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
      <Reveal className="mb-12 flex items-end justify-between"><div><span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Featured</span><h2 id="featured-heading" className="mt-2 font-display text-3xl italic text-ivory sm:text-4xl">Newly Entered the House</h2></div></Reveal>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">{products.map((p) => (<Reveal key={p.id}><ProductCard product={p} /></Reveal>))}</div>
    </section>
  );
}

export function PrivateCollectionTeaser() { return <section className="bg-noir px-6 py-28 text-center"><Reveal><span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Private Collection</span><h2 className="mt-3 font-display text-4xl italic text-ivory">For those who know.</h2><p className="mx-auto mt-4 max-w-xl font-sans text-sm text-ivory-dim">Rare finds, limited pieces, and private access selected for the INGÉ client.</p></Reveal></section>; }
export function ConciergeTeaser() { return <section className="bg-charcoal px-6 py-28 text-center"><Reveal><span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Concierge</span><h2 className="mt-3 font-display text-4xl italic text-ivory">Private service, personal wardrobe.</h2><p className="mx-auto mt-4 max-w-xl font-sans text-sm text-ivory-dim">Private styling and sourcing for clients in Stockbridge, Henry County, South Metro Atlanta, and beyond.</p><Link href="/concierge" className="mt-7 inline-block border border-gold px-8 py-3 font-sans text-xs uppercase tracking-house text-gold">Request Concierge</Link></Reveal></section>; }
export function OriginalsTeaser() { return <section className="bg-noir px-6 py-28 text-center"><Reveal><span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Originals</span><h2 className="mt-3 font-display text-4xl italic text-ivory">The house becomes the designer.</h2><p className="mx-auto mt-4 max-w-xl font-sans text-sm text-ivory-dim">Original INGÉ designs are the next chapter of the fashion house.</p></Reveal></section>; }
export function BrandStoryTeaser() { return <section className="bg-cherry-deep px-6 py-28 text-center"><Reveal><CherryEmblem variant="line" size={40} className="mx-auto mb-5 text-gold" /><h2 className="font-display text-4xl italic text-ivory">Three children. One legacy.</h2><p className="mx-auto mt-4 max-w-xl font-sans text-sm text-ivory-dim">A mother, a vision, and a luxury house rooted in family, style, and purpose.</p></Reveal></section>; }
export function NewsletterSection() { return <section className="bg-noir px-6 py-24 text-center"><Reveal><h2 className="font-display text-3xl italic text-ivory">Enter the private list.</h2><p className="mx-auto mt-3 max-w-lg font-sans text-sm text-ivory-dim">New arrivals, pre-loved finds, private drops, and house news.</p><div className="mx-auto mt-7 max-w-md"><NewsletterForm /></div></Reveal></section>; }
