"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "./CartProvider";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import { DEMO_PRODUCTS } from "@/lib/data/demo-products";

export function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, setQuantity, totalCents, currencyCode } = useCart();

  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <div className={cn("fixed inset-0 z-[60]", isOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={closeCart}
        className={cn("absolute inset-0 bg-noir-deep/70 transition-opacity duration-400", isOpen ? "opacity-100" : "opacity-0")}
      />
      <aside
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-charcoal shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-ivory/10 px-6 py-5">
          <h2 className="font-display text-xl italic text-ivory">Your Bag</h2>
          <button onClick={closeCart} aria-label="Close bag" className="text-ivory/70 hover:text-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l14 14M19 5 5 19" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="mt-10 text-center font-sans text-sm text-smoke">
              Your bag is empty.
              <br />
              <Link href="/la-femme" onClick={closeCart} className="mt-3 inline-block text-gold underline underline-offset-4">
                Enter the House
              </Link>
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map((line) => {
                const product = DEMO_PRODUCTS.find((p) => p.id === line.productId);
                return (
                  <li key={line.variantId} className="flex gap-4">
                    <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden">
                      <ProductImage image={line.image} department={product?.department ?? "la-femme"} className="h-full w-full" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <p className="font-display text-base italic text-ivory">{line.name}</p>
                        <p className="mt-0.5 font-sans text-xs uppercase tracking-wide text-smoke">{line.variantTitle}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-sans text-xs text-ivory/80">
                          <button
                            onClick={() => setQuantity(line.variantId, line.quantity - 1)}
                            className="h-6 w-6 border border-ivory/20 hover:border-gold"
                            aria-label={`Decrease quantity of ${line.name}`}
                          >
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button
                            onClick={() => setQuantity(line.variantId, line.quantity + 1)}
                            className="h-6 w-6 border border-ivory/20 hover:border-gold"
                            aria-label={`Increase quantity of ${line.name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="font-sans text-sm text-ivory">{formatPrice(line.priceCents * line.quantity, line.currencyCode)}</span>
                      </div>
                      <button onClick={() => removeLine(line.variantId)} className="mt-1 self-start font-sans text-[11px] uppercase tracking-wide text-smoke hover:text-gold">
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-ivory/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between font-sans text-sm text-ivory">
              <span className="uppercase tracking-wide text-smoke">Subtotal</span>
              <span>{formatPrice(totalCents, currencyCode)}</span>
            </div>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-gold py-3.5 text-center font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
            >
              View Bag &amp; Checkout
            </Link>
            <p className="mt-3 text-center font-sans text-[11px] text-smoke">
              Checkout activates once the house catalog connects to Shopify.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}
