import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

interface PromotionalCTAProps {
  onPlanTripClick: () => void;
}

export const PromotionalCTA: React.FC<PromotionalCTAProps> = ({ onPlanTripClick }) => {
  return (
    <section
      id="plan"
      aria-labelledby="promo-heading"
      className="w-full pt-12 sm:pt-16 scroll-mt-20"
    >
      {/* Container strictly matching shell width, rounded top only, joining directly to footer */}
      <div
        data-shell
        className="shell relative rounded-t-[24px] sm:rounded-t-[28px] overflow-hidden min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-16 sm:py-24 mask-feather-top bg-[#0E0E0E]"
      >
        {/* Background Indian hill/mountain sunset photo */}
        <SmartImage
          imageId="promo_mountain"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlay fading seamlessly into #0E0E0E at the bottom */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0E0E0E] pointer-events-none"
          aria-hidden="true"
        />

        {/* Content Box */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2
            id="promo-heading"
            className="font-display text-white font-medium tracking-tight text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.04] sm:leading-[1.08] drop-shadow-sm"
            style={{ textWrap: "balance" }}
          >
            Make Your Next Getaway Count
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-white/90 max-w-[56ch] font-sans leading-relaxed drop-shadow-xs">
            Explore beach breaks, mountain escapes, and thoughtfully planned trips across India.
          </p>

          <div className="mt-8 sm:mt-10">
            <Button
              variant="onPhoto"
              size="lg"
              onClick={onPlanTripClick}
              className="font-semibold text-sm sm:text-base px-8 py-3.5 shadow-xl hover:bg-neutral-100"
            >
              Plan My Trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
