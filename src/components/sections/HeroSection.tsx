import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TripSearch } from "./TripSearch";

interface HeroSectionProps {
  onSearchSubmit: (query: { destination: string; checkIn: string; checkOut: string; persons: number; rooms: number }) => void;
  searchNotification: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  searchNotification,
}) => {
  return (
    <section
      id="home"
      aria-label="Welcome to Nomira"
      className="relative pt-3 sm:pt-4 px-3 sm:px-6 md:px-10 lg:px-14 pb-8"
    >
      {/* Outer rounded photographic container */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-[560px] h-[92svh] max-h-[860px] rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col justify-center items-center text-center shadow-xl mask-feather-bottom">
        {/* Background Hero Image */}
        <SmartImage
          imageId="hero"
          priority={true}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Overlay: subtle dark gradient preserving balloons and depth */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/20 to-black/55 pointer-events-none"
          aria-hidden="true"
        />

        {/* Hero Content Box */}
        <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center mt-12 sm:mt-16">
          <h1
            className="font-display text-white font-medium tracking-tight text-[clamp(2.75rem,7.2vw,5.75rem)] leading-[0.98] sm:leading-[1.02] drop-shadow-sm"
            style={{ textWrap: "balance" }}
          >
            Find your next
            <br />
            unforgettable trip
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-white/85 max-w-[46ch] font-sans leading-relaxed drop-shadow-xs">
            Discover hidden gems, chill spots, and wild adventures, all in one place.
          </p>

          {/* Search Bar Capsule */}
          <div className="mt-8 sm:mt-12 w-full">
            <TripSearch onSearchSubmit={onSearchSubmit} />
          </div>

          {/* Polite Accessibility Live Region */}
          {searchNotification && (
            <div
              aria-live="polite"
              role="status"
              className="mt-4 px-4 py-1.5 rounded-full bg-white/90 text-[#151515] text-xs font-medium shadow-sm transition-all"
            >
              {searchNotification}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
