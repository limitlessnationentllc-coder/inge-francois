"use client";

import { ScrollTrigger } from "./gsap";

/**
 * Dev/verification contract for the cinematic homepage.
 *
 * A headless harness (or a human doing visual QA) can load
 * `/?jump=2400` to land the page pre-scrolled to `scrollY = 2400` with
 * every scrub-driven ScrollTrigger timeline force-settled to match —
 * instead of the lerped/animated position it would otherwise be mid-tween
 * toward. This lets a screenshot prove the page works at any scroll depth
 * without waiting out animation or eyeballing motion.
 */
export function applyJumpParam(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const jump = params.get("jump");
  if (jump === null) return;

  const y = Number(jump);
  if (Number.isNaN(y)) return;

  window.scrollTo(0, y);
  // allow layout/lenis to catch up one frame before settling ST state
  requestAnimationFrame(() => settleScrollDrivenState());
}

/** Forces every ScrollTrigger-driven timeline to match its trigger's true progress. */
export function settleScrollDrivenState(): void {
  ScrollTrigger.update();
  ScrollTrigger.getAll().forEach((st) => {
    st.update();
    const anim = st.animation;
    if (anim && st.vars.scrub) {
      anim.progress(st.progress);
    }
  });
}

/** Marks the page ready for a verification harness once everything has settled. */
export async function markPageReady(): Promise<void> {
  if (typeof window === "undefined") return;

  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => undefined);
  }

  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  ScrollTrigger.refresh();
  applyJumpParam();
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

  window.__ready = true;
}
