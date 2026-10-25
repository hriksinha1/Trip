import React from "react";
import { SmartImage } from "../ui/SmartImage";
import { TicketCard } from "../ui/TicketCard";
import { statsFacts } from "../../data/stats";

export const StatisticsSection: React.FC = () => {
  return (
    <section
      id="stats"
      aria-label="Starttrips Service Overview"
      className="w-full py-8 sm:py-12 scroll-mt-20"
    >
      {/* Outer block strictly aligned with shell width */}
      <div
        data-shell
        className="shell relative rounded-[24px] sm:rounded-[32px] overflow-hidden min-h-[500px] lg:min-h-[560px] py-14 sm:py-20 px-4 sm:px-8 flex flex-col justify-center items-center shadow-xl"
      >
        {/* Background real ocean / backwaters photo */}
        <SmartImage
          imageId="stats_ocean"
          fill
          className="object-cover"
        />

        {/* Ambient emerald & deep water gradient wash for contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#064e3b]/80 via-[#0f766e]/60 to-[#042f2e]/85 backdrop-blur-[1px]"
          aria-hidden="true"
        />

        {/* Top small white caption */}
        <div className="relative z-10 text-center mb-8 sm:mb-12 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm font-semibold text-white/95 tracking-widest uppercase font-sans drop-shadow-xs">
            Planned around how you like to travel
          </p>
        </div>

        {/* Three Ticket Cards Row (desktop) / Stack (mobile) - Equal Heights */}
        <div className="relative z-10 w-full max-w-[1080px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {statsFacts.map((fact) => (
            <TicketCard
              key={fact.id}
              value={fact.value}
              caption={fact.caption}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
