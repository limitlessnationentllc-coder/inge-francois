"use client";

import { useEffect, useRef, useState } from "react";
import { ensureGsapRegistered, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils/cn";

/**
 * Shared editorial reveal primitive for Act III (and department/product
 * pages): a clip-path wipe from `inset(0 0 100% 0)` to fully visible,
 * driven by a plain (non-scrubbed) ScrollTrigger. Reduced-motion users get
 * the fully-visible state immediately via the CSS media query on
 * `.reveal-clip` in globals.css — no JS branching needed here.
 *
 * Deliberately created by components that render AFTER Hero.tsx in the
 * tree, honoring the ScrollTrigger creation-order law (pinned hero scenes
 * first, ambient/background triggers after).
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    ensureGsapRegistered();
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      onEnter: () => setRevealed(true),
      onEnterBack: () => setRevealed(true),
    });

    return () => st.kill();
  }, []);

  return (
    <div ref={ref} data-revealed={revealed} className={cn("reveal-clip", className)}>
      {children}
    </div>
  );
}
