"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

/** Safe default: treat as reduced-motion until the real client preference is known. */
function getServerSnapshot() {
  return true;
}

/**
 * Tracks `prefers-reduced-motion` via useSyncExternalStore, so server
 * render, hydration, and the eventual client value never disagree in a way
 * that produces a hydration mismatch — components render the static
 * fallback first and upgrade to motion only once the real preference is
 * known.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
