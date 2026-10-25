import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

interface PromotionalCTAProps {
  onBookNow: () => void;
}

export const PromotionalCTA: React.FC<PromotionalCTAProps> = ({ onBookNow }) => {
  return (
    <section
      id="deals"
      aria-labelledby="promo-heading"
      className="relative px-3 sm:px-6 md:px-10 lg:px-14 pt-12 sm:pt-16 max-w-[1440px] mx-auto scroll-mt-20"
    >
      {/* Container with rounded top corners, joining seamlessly to the footer below */}
      <div className="relative w-full rounded-t-[24px] sm:rounded-t-[28px] overflow-hidden min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-16 sm:py-24 mask-feather-top bg-[#0E0E0E]">
        {/* Background Fuji Mountain sunset photo */}
        <SmartImage
          imageId="promo_mountain"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic gradient overlay fading into #0E0E0E at bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-[#0E0E0E] pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2
            id="promo-heading"
            className="font-display text-white font-medium tracking-tight text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.04] sm:leading-[1.08] drop-shadow-sm"
            style={{ textWrap: "balance" }}
          >
            Limited Time Travel Promo
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/85 max-w-[56ch] font-sans leading-relaxed drop-shadow-xs">
            Grab your exclusive offer before it's gone! Simply log in, pick your destination, and unlock up to 30% off selected trips.
          </p>

          <div className="mt-8 sm:mt-10">
            <Button
              variant="onPhoto"
              size="lg"
              onClick={onBookNow}
              className="font-semibold text-sm sm:text-base px-8 py-3.5 shadow-xl hover:bg-neutral-100"
            >
              Book My Trip Now
            </Button>
          </div>

          <p className="mt-4 text-xs text-white/50">
            Sample offer for demonstration.
          </p>
        </div>
      </div>
    </section>
  );
};
