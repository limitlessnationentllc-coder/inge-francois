import Link from "next/link";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";
import { NAV_ITEMS } from "@/lib/data/nav";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const SOCIALS = ["Instagram", "TikTok", "Facebook", "Pinterest", "YouTube"];

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-noir-deep px-6 pb-10 pt-16 md:px-16">
      <div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <CherryEmblem size={28} variant="line" className="text-gold" />
            <span className="font-display text-2xl tracking-house text-ivory">INGÉ</span>
          </Link>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-smoke">
            A private luxury house. Curated. Intentional. Exclusively INGÉ.
          </p>
          <p className="mt-6 font-sans text-[11px] uppercase tracking-house text-smoke">IngeFrancois.com</p>
        </div>

        <nav aria-label="Departments">
          <h3 className="font-sans text-[11px] uppercase tracking-house text-gold-soft">The House</h3>
          <ul className="mt-4 flex flex-col gap-2.5 font-sans text-sm text-ivory/80">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Client services">
          <h3 className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Client Services</h3>
          <ul className="mt-4 flex flex-col gap-2.5 font-sans text-sm text-ivory/80">
            <li>
              <Link href="/concierge" className="transition hover:text-gold">
                INGÉ Concierge
              </Link>
            </li>
            <li>
              <Link href="/private-clientele" className="transition hover:text-gold">
                Private Clientele
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition hover:text-gold">
                Bag &amp; Checkout
              </Link>
            </li>
            <li>
              <Link href="/account" className="transition hover:text-gold">
                Account
              </Link>
            </li>
          </ul>
          <h3 className="mt-8 font-sans text-[11px] uppercase tracking-house text-gold-soft">Follow</h3>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm text-ivory/80">
            {SOCIALS.map((s) => (
              <li key={s}>
                <span className="transition hover:text-gold" title="@IngeFrancois">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-sans text-[11px] uppercase tracking-house text-gold-soft">Private Client List</h3>
          <p className="mt-4 font-sans text-sm text-smoke">Early access, private drops, and invitations — before anyone else.</p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-[1600px] flex-col gap-3 border-t border-ivory/10 pt-6 font-sans text-[11px] text-smoke md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} INGÉ FRANÇOIS. All rights reserved.</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/the-house" className="hover:text-gold">
            The House
          </Link>
          <Link href="/legal/privacy" className="hover:text-gold">
            Privacy
          </Link>
          <Link href="/legal/terms" className="hover:text-gold">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
