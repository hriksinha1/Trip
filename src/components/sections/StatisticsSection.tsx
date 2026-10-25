import React from "react";
import { Compass, MapPin, MessageSquareText } from "lucide-react";
import { SmartImage } from "../ui/SmartImage";
import { statsFacts } from "../../data/stats";

const featureIcons = [MapPin, Compass, MessageSquareText];

export const StatisticsSection: React.FC = () => {
  return (
    <section id="stats" aria-label="How Starttrips helps you plan" className="section w-full">
      <div data-shell className="shell">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-block-lg)] shadow-[var(--shadow-block)]">
          <SmartImage imageId="stats_ocean" alt="Kerala backwaters surrounded by tropical greenery" fill className="object-cover" priority={false} />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,36,34,.48)_0%,rgba(4,36,34,.72)_100%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <p className="text-center text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-white mb-5 sm:mb-9">
              Planned around how you like to travel
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-white/25">
              {statsFacts.map((fact, index) => {
                const Icon = featureIcons[index] ?? Compass;
                return (
                  <article key={fact.id} className="flex gap-4 border-b border-white/25 py-3 last:border-b-0 first:pt-0 last:pb-0 md:flex-col md:items-start md:border-b-0 md:px-6 md:py-2 md:first:pt-2 md:last:pb-2 md:first:pl-0 md:last:pr-0">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/60 text-white" aria-hidden="true">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-[19px] sm:text-[25px] leading-tight font-semibold text-white" style={{ textWrap: "balance" }}>
                        {fact.value ? <><span className="block text-[clamp(1.75rem,1.2rem+2vw,3rem)] md:text-[clamp(2rem,1.2rem+2vw,3rem)] tabular-nums">{fact.value}</span><span className="block mt-1">{fact.title}</span></> : fact.title}
                      </h3>
                      <p className="mt-2 md:mt-3 max-w-[34ch] text-[14px] sm:text-[15px] leading-relaxed text-white/95">
                        {fact.caption}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
