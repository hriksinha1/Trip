import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

interface PromotionalCTAProps {
  onPlanTripClick: () => void;
}

export const PromotionalCTA: React.FC<PromotionalCTAProps> = ({ onPlanTripClick }) => (
  <section id="plan" aria-labelledby="promo-heading" className="section w-full scroll-mt-20">
    <div data-full-bleed="promo" className="page-surface isolate flex min-h-[clamp(340px,34vw,480px)] flex-col items-center justify-center overflow-hidden bg-[#0E0E0E] py-[var(--block-pad)] text-center mask-feather-top">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <SmartImage imageId="promo_mountain" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-[#0E0E0E]" />
      </div>
      <div data-shell className="shell relative z-10 flex w-full flex-col items-center px-0">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-2 sm:px-4">
          <h2 id="promo-heading" className="font-display text-[clamp(2rem,1.2rem+3vw,3.5rem)] font-medium leading-[1.06] tracking-tight text-white drop-shadow-sm" style={{ textWrap: "balance" }}>
            Make your next getaway count
          </h2>
          <p className="mt-4 max-w-[56ch] font-sans text-[15px] leading-relaxed text-white/95 drop-shadow-sm sm:text-base">
            Explore beach breaks, mountain escapes, and thoughtfully planned trips across India.
          </p>
          <div className="mt-6 sm:mt-7">
            <Button variant="onPhoto" size="lg" onClick={onPlanTripClick} className="font-semibold shadow-[var(--shadow-card)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
              Plan my trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
