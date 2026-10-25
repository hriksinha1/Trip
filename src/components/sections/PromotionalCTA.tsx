import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

interface PromotionalCTAProps {
  onPlanTripClick: () => void;
}

export const PromotionalCTA: React.FC<PromotionalCTAProps> = ({ onPlanTripClick }) => {
  return (
    <section id="plan" aria-labelledby="promo-heading" className="section w-full scroll-mt-20">
      <div data-shell className="shell relative isolate overflow-hidden rounded-t-[var(--radius-block-lg)] min-h-[clamp(340px,34vw,480px)] flex flex-col justify-center items-center text-center px-5 sm:px-8 py-[var(--block-pad)] mask-feather-top bg-[#0E0E0E]">
        <SmartImage imageId="promo_mountain" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-[#0E0E0E] pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 id="promo-heading" className="font-display text-white font-medium tracking-tight text-[clamp(2rem,1.2rem+3vw,3.5rem)] leading-[1.06] drop-shadow-sm" style={{ textWrap: "balance" }}>
            Make your next getaway count
          </h2>
          <p className="mt-4 text-[15px] sm:text-base text-white/90 max-w-[56ch] font-sans leading-relaxed drop-shadow-xs">
            Explore beach breaks, mountain escapes, and thoughtfully planned trips across India.
          </p>
          <div className="mt-6 sm:mt-7">
            <Button variant="onPhoto" size="lg" onClick={onPlanTripClick} className="font-semibold">
              Plan my trip
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
