"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { CherryEmblem } from "./CherryEmblem";
import { ensureGsapRegistered, gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * ACT I + II — "The Drip" and "Cherry to Couture"
 * -----------------------------------------------------------------------
 * A single pinned, scrubbed GSAP timeline drives a 7-scene macro
 * transformation: drip → cherry → lacquer → bag → heel → suit → doors
 * open / wordmark resolves / CTA. Every scene is built from native
 * SVG + CSS (gradients, stroke-draw silhouettes, typography) — no video
 * required. Swap-in point for later: replace any <Scene> panel's visual
 * with a <video> element (see STAGE_MEDIA below) without touching the
 * timeline logic.
 *
 * ⚠️ ScrollTrigger creation-order law: this is the FIRST component on the
 * page to create ScrollTrigger instances. Ambient/background triggers in
 * HomeSections (rendered after this component) must keep being created
 * after this effect runs — do not reorder Hero below other sections.
 * -----------------------------------------------------------------------
 */

const SILHOUETTES: Record<string, string> = {
  bag: "M18 26 H46 L44 56 H20 Z M24 26 V19 A8 8 0 0 1 40 19 V26",
  heel: "M14 48 H50 C50 40 44 40 40 36 L20 32 C16 34 14 40 14 48 Z M20 32 V24",
  suit: "M20 14 L32 8 L44 14 L40 20 L36 16 V58 H28 V16 L24 20 Z",
};

// Swap-in point for real cinematic footage later: each <Scene> below can
// render a <video> in place of its native gradient/silhouette content
// without touching the timeline logic that drives it.

export function Hero() {
  const reducedMotion = useReducedMotion();

  // useReducedMotion defaults to `true` on the server and during hydration
  // (see its getServerSnapshot), so this always renders the accessible,
  // fully-usable static hero first — no pin, no scrub, no scroll-jacking —
  // then upgrades to the cinematic version once the real browser
  // preference is known, with no separate mount effect required.
  if (reducedMotion) {
    return <StaticHero />;
  }

  return <CinematicHero />;
}

function StaticHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center gap-8 gloss-cherry px-6 text-center">
      <CherryEmblem variant="gloss" size={72} />
      <p className="font-sans text-xs uppercase tracking-house text-gold-soft">From Cherry to Couture</p>
      <h1 className="max-w-3xl font-display text-4xl italic leading-[1.1] text-ivory sm:text-6xl">
        Command the room.
        <br />
        Before you say a word.
      </h1>
      <p className="max-w-md font-sans text-sm text-ivory-dim">A new expression of modern luxury. Curated. Intentional. Exclusively <span className="wordmark-caps">INGÉ</span>.</p>
      <a
        href="#house"
        className="mt-4 border border-gold px-10 py-4 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
      >
        Enter the House
      </a>
    </section>
  );
}

function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const dripRef = useRef<SVGPathElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const silhouetteRefs = useRef<Record<string, SVGPathElement | null>>({});
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinRef.current,
          anticipatePin: 1,
        },
      });

      // Scene 0 — The Drip
      if (dripRef.current) {
        gsap.set(dripRef.current, { scaleY: 0.15, transformOrigin: "50% 0%", opacity: 0 });
        tl.to(dripRef.current, { opacity: 1, duration: 0.25 }, 0)
          .to(dripRef.current, { scaleY: 1, duration: 0.55, ease: "power2.in" }, 0.15)
          .to(dripRef.current, { opacity: 0, duration: 0.2 }, 0.72);
      }
      if (poolRef.current) {
        gsap.set(poolRef.current, { scale: 0, opacity: 0 });
        tl.to(poolRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, 0.62).to(
          poolRef.current,
          { opacity: 0, duration: 0.2 },
          0.9
        );
      }

      // Scenes 1–5 — the macro transformation chain (cherry → lacquer → bag → heel → suit)
      const scenes = sceneRefs.current.filter(Boolean) as HTMLDivElement[];
      scenes.forEach((scene, i) => {
        const start = i + 0.85;
        gsap.set(scene, { opacity: 0 });
        tl.fromTo(scene, { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }, start);
        if (i < scenes.length - 1) {
          tl.to(scene, { opacity: 0, duration: 0.3 }, start + 0.65);
        }
      });

      // stroke-draw silhouettes, synced to their scene's on-time
      Object.entries(silhouetteRefs.current).forEach(([, path], idx) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        tl.to(path, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" }, idx + 1.9);
      });

      // Final scene — doors close over the last macro scene, the house
      // wordmark lights up behind them, then they open to reveal it.
      const doorsStart = scenes.length + 0.9;
      if (finaleRef.current) {
        gsap.set(finaleRef.current, { opacity: 0 });
        tl.set(finaleRef.current, { opacity: 1 }, doorsStart - 0.05);
      }
      if (doorLeftRef.current && doorRightRef.current) {
        gsap.set(doorLeftRef.current, { xPercent: -100 });
        gsap.set(doorRightRef.current, { xPercent: 100 });
        tl.to([doorLeftRef.current, doorRightRef.current], { xPercent: 0, duration: 0.3, ease: "power2.inOut" }, doorsStart - 0.35)
          .to(doorLeftRef.current, { xPercent: -100, duration: 0.6, ease: "power3.inOut" }, doorsStart)
          .to(doorRightRef.current, { xPercent: 100, duration: 0.6, ease: "power3.inOut" }, doorsStart);
      }
      const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (chars.length) {
        gsap.set(chars, { yPercent: 120, opacity: 0 });
        tl.to(chars, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power4.out" }, doorsStart + 0.35);
      }

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="cinematic" className="relative" style={{ height: "700vh" }}>
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden bg-noir-deep">
        {/* Scene 0 — The Drip */}
        <svg
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          width="60"
          height="220"
          viewBox="0 0 60 220"
          aria-hidden
        >
          <defs>
            <linearGradient id="dripGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8a1c2e" />
              <stop offset="60%" stopColor="var(--inge-cherry)" />
              <stop offset="100%" stopColor="var(--inge-cherry-deep)" />
            </linearGradient>
          </defs>
          <path
            ref={dripRef}
            d="M30 0 C 30 60, 10 110, 30 170 C 50 200, 45 215, 30 220 C 15 215, 10 200, 30 170 C 50 110, 30 60, 30 0 Z"
            fill="url(#dripGrad)"
          />
        </svg>
        <div
          ref={poolRef}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full gloss-cherry blur-[2px]"
          aria-hidden
        />

        {/* Scenes 1–5 */}
        <Scene setRef={(el) => (sceneRefs.current[0] = el)} className="gloss-cherry">
          <CherryEmblem variant="gloss" size={180} title="Black cherry, hand glazed" />
          <SceneLabel eyebrow="Act I" title="Cherry" copy="Hand-glazed. Black cherry. The house begins here." />
        </Scene>

        <Scene setRef={(el) => (sceneRefs.current[1] = el)} className="bg-cherry-deep">
          <div className="absolute inset-0 bg-gradient-to-br from-cherry-bright/40 via-transparent to-transparent" />
          <SceneLabel eyebrow="Act II" title="Patent Leather" copy="The glaze becomes lacquer. The lacquer becomes leather." />
        </Scene>

        <Scene setRef={(el) => (sceneRefs.current[2] = el)} className="bg-noir">
          <SilhouetteIcon d={SILHOUETTES.bag} setRef={(el) => (silhouetteRefs.current.bag = el)} />
          <SceneLabel eyebrow="Act II" title="The Bag" copy="Structure, cut from a single hide." />
        </Scene>

        <Scene setRef={(el) => (sceneRefs.current[3] = el)} className="bg-noir">
          <SilhouetteIcon d={SILHOUETTES.heel} setRef={(el) => (silhouetteRefs.current.heel = el)} />
          <SceneLabel eyebrow="Act II" title="The Heel" copy="Ninety-five millimeters of intent." />
        </Scene>

        <Scene setRef={(el) => (sceneRefs.current[4] = el)} className="bg-noir">
          <SilhouetteIcon d={SILHOUETTES.suit} setRef={(el) => (silhouetteRefs.current.suit = el)} />
          <SceneLabel eyebrow="Act II" title="The Suit" copy="Tailoring that commands the room." />
          <p className="mt-8 font-display text-2xl italic text-gold-soft sm:text-3xl">From Cherry to Couture</p>
        </Scene>

        {/* Final scene — doors + wordmark + CTA */}
        <div ref={finaleRef} className="absolute inset-0 flex items-center justify-center gloss-cherry">
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <div className="wordmark-caps flex overflow-hidden font-display text-6xl italic tracking-house text-ivory sm:text-8xl" aria-label="INGÉ">
              {"INGÉ".split("").map((c, i) => (
                <span key={i} className="inline-block overflow-hidden">
                  <span ref={(el) => { charRefs.current[i] = el; }} className="inline-block">
                    {c}
                  </span>
                </span>
              ))}
            </div>
            <p className="font-sans text-xs uppercase tracking-house text-gold-soft">A new expression of modern luxury</p>
            <Link
              href="#house"
              className="mt-2 border border-gold px-10 py-4 font-sans text-xs uppercase tracking-house text-gold transition hover:bg-gold hover:text-noir"
            >
              Enter the House
            </Link>
          </div>
        </div>

        {/* Door leaves — default off-screen via CSS so a failed/late GSAP
            init on a real device never leaves them covering the hero in
            solid black; gsap.set()/tweens layer inline transforms on top
            once JS runs successfully. */}
        <div ref={doorLeftRef} className="absolute inset-y-0 left-0 z-10 w-1/2 -translate-x-full bg-noir-deep" />
        <div ref={doorRightRef} className="absolute inset-y-0 right-0 z-10 w-1/2 translate-x-full bg-noir-deep" />
      </div>
    </section>
  );
}

function Scene({
  children,
  className,
  setRef,
}: {
  children: React.ReactNode;
  className?: string;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={setRef} className={`absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center ${className ?? ""}`}>
      {children}
    </div>
  );
}

function SceneLabel({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">{eyebrow}</span>
      <h2 className="font-display text-4xl italic text-ivory sm:text-6xl">{title}</h2>
      <p className="max-w-sm font-sans text-sm text-ivory-dim">{copy}</p>
    </div>
  );
}

function SilhouetteIcon({ d, setRef }: { d: string; setRef: (el: SVGPathElement | null) => void }) {
  return (
    <svg viewBox="0 0 64 64" width="140" height="140" fill="none" stroke="var(--inge-gold)" strokeWidth="1" aria-hidden>
      <path ref={setRef} d={d} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
