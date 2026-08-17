"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";
import { NAV_ITEMS } from "@/lib/data/nav";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/utils/cn";

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalCount, toggleCart } = useCart();

  // Close the menu/search on navigation. Adjusted during render (React's
  // blessed pattern for "reset state when a prop changes") rather than in
  // an effect, since it only needs to run when pathname itself changes.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || menuOpen ? "bg-noir/90 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-3 text-ivory/90 transition hover:text-gold"
            aria-expanded={menuOpen}
            aria-controls="inge-nav-overlay"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span className="flex h-4 w-6 flex-col justify-between">
              <span className={cn("h-px w-full bg-current transition-transform", menuOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("h-px w-full bg-current transition-opacity", menuOpen && "opacity-0")} />
              <span className={cn("h-px w-full bg-current transition-transform", menuOpen && "-translate-y-[7px] -rotate-45")} />
            </span>
            <span className="hidden font-sans text-[11px] uppercase tracking-house text-inherit sm:inline">Menu</span>
          </button>

          <Link href="/" className="flex items-center gap-2.5" aria-label="INGÉ FRANÇOIS — home">
            <CherryEmblem size={26} variant="line" className="text-gold" />
            <span className="font-display text-xl tracking-house text-ivory md:text-2xl">INGÉ</span>
          </Link>

          <div className="flex items-center gap-4 md:gap-5">
            <SearchControl open={searchOpen} setOpen={setSearchOpen} />
            <Link href="/account" aria-label="Account" className="text-ivory/90 transition hover:text-gold">
              <UserIcon />
            </Link>
            <button type="button" onClick={toggleCart} aria-label={`Shopping bag, ${totalCount} item${totalCount === 1 ? "" : "s"}`} className="relative text-ivory/90 transition hover:text-gold">
              <BagIcon />
              {totalCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-medium text-noir">
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <NavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      id="inge-nav-overlay"
      className={cn(
        "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-noir-deep px-6 py-24 transition-[opacity,visibility] duration-500 md:justify-center md:px-16",
        open ? "visible opacity-100" : "invisible opacity-0"
      )}
      aria-hidden={!open}
    >
      <nav aria-label="Primary" className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-x-12 gap-y-2 pt-20 md:grid-cols-2 md:gap-y-3">
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-baseline gap-4 border-b border-ivory/10 py-3 font-display text-3xl italic text-ivory/90 transition hover:text-gold md:text-4xl"
            style={{ transitionDelay: open ? `${i * 25}ms` : "0ms" }}
          >
            <span className="font-sans text-xs not-italic text-smoke">{String(i + 1).padStart(2, "0")}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-6 pb-10 font-sans text-[11px] uppercase tracking-house text-smoke">
        <span>IngeFrancois.com</span>
        <span>@IngeFrancois</span>
        <Link href="/private-clientele" onClick={onClose} className="text-gold-soft hover:text-gold">
          INGÉ Private Clientele — Apply for Access
        </Link>
      </div>
    </div>
  );
}

function SearchControl({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = inputRef.current?.value.trim();
        if (open && q) {
          router.push(`/search?q=${encodeURIComponent(q)}`);
          setOpen(false);
        } else {
          setOpen(!open);
        }
      }}
      className="flex items-center"
    >
      <input
        ref={inputRef}
        type="search"
        name="q"
        placeholder="Search the house"
        className={cn(
          "font-sans text-sm text-ivory placeholder:text-smoke bg-transparent border-b border-transparent focus:border-gold outline-none transition-[width,opacity] duration-300",
          open ? "w-32 sm:w-44 opacity-100 mr-2" : "w-0 opacity-0 pointer-events-none"
        )}
      />
      <button type="submit" aria-label="Search" className="text-ivory/90 transition hover:text-gold">
        <SearchIcon />
      </button>
    </form>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 8h12l-1 13H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
