import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TripSearch, TripSearchParams } from "./TripSearch";

interface HeroSectionProps {
  onSearchSubmit: (params: TripSearchParams) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearchSubmit }) => {
  return (
    <section
      id="home"
      aria-label="Welcome to Starttrips"
      className="w-full pt-3 sm:pt-4 pb-8"
    >
      {/* Outer photographic block with shell width & feather mask */}
      <div
        data-shell
        className="shell relative min-h-[560px] h-[92svh] max-h-[860px] rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col justify-center items-center text-center shadow-xl mask-feather-bottom"
      >
        {/* Background Landscape Photo */}
        <SmartImage
          imageId="hero"
          priority={true}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Overlay: subtle dark gradient preserving scenery and text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center mt-12 sm:mt-16">
          <h1
            className="font-display text-white font-medium tracking-tight text-[clamp(2.5rem,6.8vw,5.5rem)] leading-[1.02] drop-shadow-sm"
            style={{ textWrap: "balance" }}
          >
            Your next great getaway
            <br />
            starts here.
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/90 max-w-[48ch] font-sans leading-relaxed drop-shadow-xs">
            From sun-soaked beaches to misty mountain escapes, find a trip that feels made for you.
          </p>

          {/* Search Bar Capsule */}
          <div className="mt-8 sm:mt-12 w-full">
            <TripSearch onSearchSubmit={onSearchSubmit} />
          </div>
        </div>
      </div>
    </section>
  );
};
