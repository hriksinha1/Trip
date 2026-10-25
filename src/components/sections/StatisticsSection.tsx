import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TicketCard } from "../ui/TicketCard";
import { statsFacts } from "../../data/stats";
import { images } from "../../data/images";

export const StatisticsSection: React.FC = () => {
  const accentColor = images.stats_ocean?.accent || "#064e3b";

  return (
    <section
      id="stats"
      aria-label="Starttrips Service Overview"
      className="w-full py-6 scroll-mt-20"
    >
      {/* Outer block strictly aligned with shell width */}
      <div
        data-shell
        className="shell relative rounded-[24px] sm:rounded-[28px] overflow-hidden min-h-[500px] lg:min-h-[560px] py-12 sm:py-16 px-4 sm:px-8 flex flex-col justify-center items-center shadow-xl"
      >
        {/* Background photo */}
        <SmartImage
          imageId="stats_ocean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient overlay wash */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#064e3b]/70 via-[#0f766e]/45 to-[#042f2e]/75"
          aria-hidden="true"
        />

        {/* Top small white caption */}
        <p className="relative z-10 text-xs sm:text-sm font-medium text-white/90 tracking-wide uppercase text-center mb-8 sm:mb-12 font-sans drop-shadow-xs">
          Planned around how you like to travel
        </p>

        {/* Three Ticket Cards Row (desktop) / Stack (mobile) */}
        <div className="relative z-10 w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {statsFacts.map((fact) => (
            <TicketCard
              key={fact.id}
              value={fact.value}
              caption={fact.caption}
              notchColor={accentColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
