import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TripSearch, TripSearchParams } from "./TripSearch";

interface HeroSectionProps {
  onSearchSubmit: (params: TripSearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => (
  <section id="home" aria-label="Welcome to Starttrips" className="relative w-full scroll-mt-0">
    <div data-full-bleed="hero" className="page-surface relative isolate min-h-[560px] h-[92svh] max-h-[860px]">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <SmartImage imageId="hero" priority fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/24 to-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#FAF9F6]/30" />
      </div>

      <div data-shell className="shell relative z-10 flex h-full min-h-[560px] flex-col items-center justify-center px-0 pb-8 pt-24 text-center sm:pt-28">
        <div className="flex w-full max-w-4xl flex-col items-center px-2 sm:px-4">
          <h1 className="font-display text-[clamp(2.5rem,1.3rem+4.4vw,4.75rem)] font-medium leading-[1.02] tracking-tight text-white drop-shadow-sm" style={{ textWrap: "balance" }}>
            Your next great getaway<br className="hidden sm:block" />starts here.
          </h1>
          <p className="mt-4 max-w-[48ch] font-sans text-[15px] leading-relaxed text-white/95 drop-shadow-sm sm:mt-5 sm:text-base">
            From sun-soaked beaches to misty mountain escapes, find a trip that feels made for you.
          </p>
          <div className="mt-6 w-full sm:mt-8">
            <TripSearch onSearchSubmit={onSearchSubmit} />
          </div>
        </div>
      </div>
    </div>
  </section>
