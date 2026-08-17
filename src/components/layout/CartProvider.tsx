"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { CartLine, Product, ProductVariant } from "@/types/product";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  totalCount: number;
  totalCents: number;
  currencyCode: string;
  addLine: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeLine: (variantId: string) => void;
  setQuantity: (variantId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "inge-francois:cart";
const EMPTY_LINES: CartLine[] = [];

// -----------------------------------------------------------------------
// A tiny module-level external store for cart lines, backed by
// localStorage. Modeled as a useSyncExternalStore source (rather than
// useState + a hydration effect) so the server render, the hydration
// render, and the eventual client-read-from-localStorage render never
// disagree — React handles the "safe on server, upgrade on client" swap
// internally instead of via a setState-in-effect cascade.
// -----------------------------------------------------------------------
let cachedLines: CartLine[] | null = null;
const listeners = new Set<() => void>();

function readFromStorage(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): CartLine[] {
  if (cachedLines === null) {
    cachedLines = readFromStorage();
  }
  return cachedLines;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY_LINES;
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function commit(next: CartLine[]) {
  cachedLines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable (private browsing, quota) — cart still works in-memory
  }
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addLine = useCallback((product: Product, variant: ProductVariant, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((l) => l.variantId === variant.id);
    const next = existing
      ? current.map((l) => (l.variantId === variant.id ? { ...l, quantity: l.quantity + quantity } : l))
      : [
          ...current,
          {
            productId: product.id,
            handle: product.handle,
            name: product.name,
            variantId: variant.id,
            variantTitle: variant.title,
            priceCents: variant.priceCents,
            currencyCode: variant.currencyCode,
            image: product.images[0],
            quantity,
          },
        ];
    commit(next);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((variantId: string) => {
    commit(getSnapshot().filter((l) => l.variantId !== variantId));
  }, []);

  const setQuantity = useCallback((variantId: string, quantity: number) => {
    const current = getSnapshot();
    commit(
      quantity <= 0
        ? current.filter((l) => l.variantId !== variantId)
        : current.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const totalCount = lines.reduce((sum, l) => sum + l.quantity, 0);
    const totalCents = lines.reduce((sum, l) => sum + l.priceCents * l.quantity, 0);
    return {
      lines,
      isOpen,
      totalCount,
      totalCents,
      currencyCode: lines[0]?.currencyCode ?? "USD",
      addLine,
      removeLine,
      setQuantity,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
    };
  }, [lines, isOpen, addLine, removeLine, setQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
