import React from "react";
import { Compass, MapPin, MessageSquareText } from "lucide-react";
import { SmartImage } from "../ui/SmartImage";
import { statsFacts } from "../../data/stats";

const featureIcons = [MapPin, Compass, MessageSquareText];

export const StatisticsSection: React.FC = () => (
  <section id="stats" aria-label="How Starttrips helps you plan" className="section w-full">
    <div data-full-bleed="stats" className="page-surface isolate overflow-hidden shadow-[var(--shadow-block)]">
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <SmartImage imageId="stats_ocean" alt="Kerala backwaters surrounded by tropical greenery" fill className="object-cover object-center" priority={false} />
        <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(4,30,31,.66)_0%,rgba(4,36,34,.54)_48%,rgba(3,30,27,.68)_100%)]" />
      </div>
      <div data-shell className="shell relative z-10 py-6 sm:py-8 lg:py-10">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.16em] text-white/95 sm:mb-5 sm:text-[12px]">
          Planned around how you like to travel
        </p>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-4">
          {statsFacts.map((fact, index) => {
            const Icon = featureIcons[index] ?? Compass;
            const isProcess = !fact.value;
            return (
              <article
                key={fact.id}
                data-stats-type={isProcess ? "process" : "metric"}
                className={isProcess
                  ? "col-span-2 flex min-w-0 items-start gap-3 rounded-2xl border border-white/25 bg-[#082C29]/75 p-4 shadow-[var(--shadow-xs)] backdrop-blur-sm sm:items-center sm:p-5 lg:col-span-1 lg:flex-col lg:items-start lg:justify-center lg:p-5"
                  : "flex min-w-0 flex-col rounded-2xl border border-white/25 bg-white/[0.12] p-3.5 shadow-[var(--shadow-xs)] backdrop-blur-md sm:p-4 lg:p-5"}
              >
                <div className={"flex size-8 shrink-0 items-center justify-center rounded-full border border-white/45 text-white sm:size-9 " + (isProcess ? "" : "mb-2.5")} aria-hidden="true">
                  <Icon size={17} strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  {fact.value && <p className="font-display text-[clamp(2rem,1.6rem+1.2vw,2.75rem)] font-semibold leading-none tracking-tight text-white tabular-nums">{fact.value}</p>}
                  <h3 className={fact.value ? "mt-1.5 font-display text-[14px] font-semibold leading-tight text-white sm:text-[16px] lg:text-[17px]" : "font-display text-[16px] font-semibold leading-tight text-white sm:text-[18px]"} style={{ textWrap: "balance" }}>
                    {fact.title}
                  </h3>
                  <p className={fact.value ? "mt-1.5 text-[11px] leading-relaxed text-white/95 sm:text-[12px] lg:text-[13px]" : "mt-1.5 text-[12px] leading-relaxed text-white/95 sm:text-[13px]"}>
                    {fact.caption}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  </section>
