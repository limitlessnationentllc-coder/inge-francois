"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Global smooth-scroll driver. Lenis animates native `window` scroll (no
 * CSS-transform wrapper), so ScrollTrigger's default `window` scroller
 * keeps working unmodified — we just pump Lenis off GSAP's ticker and ask
 * ScrollTrigger to re-read scroll position on every Lenis tick.
 *
 * `respectReducedMotion` (Lenis default: true) already flattens the lerp to
 * track input 1:1 for prefers-reduced-motion users, so no extra branching
 * is needed here — the cinematic components handle their own reduced-motion
 * fallback separately (see useReducedMotion + Hero.tsx).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ensureGsapRegistered();

    const lenis = new Lenis({
      duration: 1.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
