"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { CherryEmblem } from "./CherryEmblem";
import { ensureGsapRegistered, gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * ACT I + II — "The Drip" and "Cherry to Couture"
 * -----------------------------------------------------------------------
 * A single autoplaying (not scroll-driven) GSAP timeline plays once on
 * arrival: drip → cherry → lacquer → bag → heel → suit → doors open /
 * wordmark resolves / CTA. It runs in a normal, fixed-height section —
 * no pin, no scrub, no scroll-jacking, so scrolling behaves exactly like
 * any other page on both mobile and desktop. A visible "Skip" control
 * jumps straight to the resting state, and repeat visits within the same
 * browser session skip the sequence automatically (sessionStorage).
 * Every scene is built from native SVG + CSS (gradients, stroke-draw
 * silhouettes, typography) — no video required.
 * -----------------------------------------------------------------------
 */

const SESSION_KEY = "inge-intro-played";

const SILHOUETTES: Record<string, string> = {
  bag: "M18 26 H46 L44 56 H20 Z M24 26 V19 A8 8 0 0 1 40 19 V26",
  heel: "M14 48 H50 C50 40 44 40 40 36 L20 32 C16 34 14 40 14 48 Z M20 32 V24",
  suit: "M20 14 L32 8 L44 14 L40 20 L36 16 V58 H28 V16 L24 20 Z",
};

// Which scene index (0-4) carries a stroke-draw silhouette, if any.
const SCENE_SILHOUETTE: Array<keyof typeof SILHOUETTES | null> = [null, null, "bag", "heel", "suit"];

export function Hero() {
  const reducedMotion = useReducedMotion();

  // useReducedMotion defaults to `true` on the server and during hydration
  // (see its getServerSnapshot), so this always renders the accessible,
  // fully-usable static hero first — no autoplay sequence at all — then
  // upgrades to the cinematic version once the real browser preference is
  // known, with no separate mount effect required.
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
  const introRef = useRef<HTMLDivElement>(null);
  const dripRef = useRef<SVGPathElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const silhouetteRefs = useRef<Record<string, SVGPathElement | null>>({});
  const doorLeftRef = useRef<HTMLDivElement>(null);
  const doorRightRef = useRef<HTMLDivElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Skip is only offered (and the sequence only plays) the first time in a
  // browser session — repeat visits land straight on the resting state.
  const [alreadyPlayed] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [showSkip, setShowSkip] = useState(!alreadyPlayed);

  useLayoutEffect(() => {
    ensureGsapRegistered();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          try {
            window.sessionStorage.setItem(SESSION_KEY, "1");
          } catch {
            // private browsing or storage disabled — sequence just replays next time
          }
          setShowSkip(false);
        },
      });
      timelineRef.current = tl;

      // Beat 0 — Arrival card. Visible by default via plain CSS (no JS
      // required), so a visitor never lands on a blank frame; this tween
      // just carries it out once the sequence starts.
      if (introRef.current) {
        gsap.set(introRef.current, { autoAlpha: 1 });
        tl.to(introRef.current, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, "+=1.1");
      }

      // Beat 1 — The Drip
      if (dripRef.current) {
        gsap.set(dripRef.current, { scaleY: 0.15, transformOrigin: "50% 0%", opacity: 0 });
        tl.to(dripRef.current, { opacity: 1, duration: 0.25 }, "-=0.15")
          .to(dripRef.current, { scaleY: 1, duration: 0.5, ease: "power2.in" }, "<")
          .to(dripRef.current, { opacity: 0, duration: 0.2 }, "+=0.05");
      }
      if (poolRef.current) {
        gsap.set(poolRef.current, { scale: 0, opacity: 0 });
        tl.to(poolRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" }, "-=0.1").to(poolRef.current, {
          opacity: 0,
          duration: 0.25,
        });
      }

      // Beats 2–6 — the macro transformation chain (cherry → lacquer → bag → heel → suit)
      const scenes = sceneRefs.current.filter(Boolean) as HTMLDivElement[];
      scenes.forEach((scene, i) => {
        gsap.set(scene, { opacity: 0 });
        tl.to(scene, { opacity: 1, duration: 0.4, ease: "power2.out" }, i === 0 ? "-=0.1" : undefined);

        const silhouetteKey = SCENE_SILHOUETTE[i];
        const path = silhouetteKey ? silhouetteRefs.current[silhouetteKey] : null;
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          tl.to(path, { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" }, "-=0.1");
        }

        if (i < scenes.length - 1) {
          tl.to(scene, { opacity: 0, duration: 0.35, ease: "power1.in" }, "+=0.7");
        } else {
          tl.to({}, { duration: 0.7 }); // hold on the last scene before the doors close over it
        }
      });

      // Final beat — doors close over the last macro scene, the house
      // wordmark lights up behind them, then they open to reveal it.
      if (finaleRef.current) {
        gsap.set(finaleRef.current, { opacity: 0 });
        tl.set(finaleRef.current, { opacity: 1 });
      }
      if (doorLeftRef.current && doorRightRef.current) {
        gsap.set(doorLeftRef.current, { xPercent: -100 });
        gsap.set(doorRightRef.current, { xPercent: 100 });
        tl.to([doorLeftRef.current, doorRightRef.current], { xPercent: 0, duration: 0.35, ease: "power2.inOut" }, "-=0.05")
          .to(doorLeftRef.current, { xPercent: -100, duration: 0.6, ease: "power3.inOut" }, "+=0.2")
          .to(doorRightRef.current, { xPercent: 100, duration: 0.6, ease: "power3.inOut" }, "<");
      }
      const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (chars.length) {
        gsap.set(chars, { yPercent: 120, opacity: 0 });
        tl.to(chars, { yPercent: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power4.out" }, "-=0.3");
      }

      // Repeat visits (same session): jump straight to the resting state,
      // no replay.
      if (alreadyPlayed) {
        tl.progress(1);
      }
    });

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSkip = () => {
    timelineRef.current?.progress(1);
  };

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-noir-deep">
      {/* Arrival card — visible by default via plain CSS, so the page
          never opens on solid black. Carried out by the autoplay timeline
          above once the sequence starts. */}
      <div
        ref={introRef}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 gloss-cherry px-6 text-center"
      >
        <CherryEmblem variant="gloss" size={96} title="Black cherry, hand glazed" />
        <p className="font-sans text-xs uppercase tracking-house text-gold-soft">From Cherry to Couture</p>
        <h1 className="max-w-2xl font-display text-4xl italic leading-[1.1] text-ivory sm:text-6xl">
          Command the room.
          <br />
          Before you say a word.
        </h1>
      </div>

      {showSkip && (
        <button
          type="button"
          onClick={handleSkip}
          className="absolute right-5 top-[6.25rem] z-30 border border-ivory/25 bg-noir/40 px-4 py-2 font-sans text-[11px] uppercase tracking-house text-ivory/80 backdrop-blur-sm transition hover:border-gold hover:text-gold md:right-8 md:top-[7.25rem]"
        >
          Skip Intro
        </button>
      )}

      {/* Beat 1 — The Drip */}
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

      {/* Beats 2–6 */}
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

      {/* Final beat — doors + wordmark + CTA. This is also the resting
          state: what a repeat visitor (or anyone who skips) lands on. */}
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
          init never leaves them covering the hero in solid black;
          gsap.set()/tweens layer inline transforms on top once JS runs. */}
      <div ref={doorLeftRef} className="absolute inset-y-0 left-0 z-10 w-1/2 -translate-x-full bg-noir-deep" />
      <div ref={doorRightRef} className="absolute inset-y-0 right-0 z-10 w-1/2 translate-x-full bg-noir-deep" />
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
