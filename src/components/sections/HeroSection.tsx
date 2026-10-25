import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TripSearch, TripSearchParams } from "./TripSearch";

interface HeroSectionProps {
  onSearchSubmit: (params: TripSearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => (
  <section id="home" aria-label="Welcome to Starttrips" className="w-full pt-3 sm:pt-4 pb-3">
    <div data-shell className="shell relative isolate min-h-[560px] h-[92svh] max-h-[860px] overflow-hidden rounded-[24px] sm:rounded-[28px] shadow-xl mask-feather-bottom">
      <SmartImage imageId="hero" priority fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/60 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 pb-8 pt-24 text-center sm:px-6 sm:pt-28">
        <h1
          className="font-display text-white font-medium tracking-tight text-[clamp(2.5rem,1.3rem+4.4vw,4.75rem)] leading-[1.02] drop-shadow-sm"
          style={{ textWrap: "balance" }}
        >
          Your next great getaway<br />starts here.
        </h1>
        <p className="mt-4 sm:mt-5 max-w-[48ch] text-[15px] sm:text-base text-white/90 font-sans leading-relaxed drop-shadow-xs">
          From sun-soaked beaches to misty mountain escapes, find a trip that feels made for you.
        </p>
        <div className="mt-6 sm:mt-8 w-full">
          <TripSearch onSearchSubmit={onSearchSubmit} />
        </div>
      </div>
    </div>
  </section>
);
