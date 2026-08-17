export {};

declare global {
  interface Window {
    /**
     * Set to true once the page has finished loading and all scroll-driven
     * state has settled — the signal a headless verification harness polls
     * for before taking measurements/screenshots. See
     * src/lib/devVerification.ts.
     */
    __ready?: boolean;
  }
}
