import type { Metadata } from "next";
import { Reveal } from "@/components/cinematic/Reveal";
import { CherryEmblem } from "@/components/cinematic/CherryEmblem";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

export const metadata: Metadata = {
  title: "INGÉ Private Clientele",
  description: "Early access, private drops, sourcing, and styling appointments — apply for access.",
};

const BENEFITS = [
  "Early access to new arrivals",
  "Invitations to private drops",
  "Priority sourcing requests",
  "Complimentary styling appointments",
  "Invitations to house events",
  "Access to members-only pieces",
];

export default function PrivateClientelePage() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-16 bg-noir px-6 pb-24 pt-32 text-center md:pt-40">
      <Reveal className="flex flex-col items-center gap-6">
        <CherryEmblem variant="gloss" size={60} />
        <span className="font-sans text-[11px] uppercase tracking-house text-gold-soft">INGÉ Private Clientele</span>
        <h1 className="max-w-2xl font-display text-4xl italic text-ivory sm:text-6xl">Before anyone else.</h1>
        <p className="max-w-md font-sans text-sm text-ivory-dim">
          A private tier for the house&apos;s most engaged clients. Applications are reviewed personally; the tier is
          intentionally small.
        </p>
      </Reveal>

      <Reveal className="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
        {BENEFITS.map((b) => (
          <div key={b} className="flex items-center gap-3 font-sans text-sm text-ivory-dim">
            <span className="h-1 w-1 rounded-full bg-gold" />
            {b}
          </div>
        ))}
      </Reveal>

      <Reveal className="w-full">
        <WaitlistForm />
      </Reveal>
    </div>
  );
}
