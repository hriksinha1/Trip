import React, { useEffect, useRef, useState } from "react";
import { SmartImage } from "../ui/SmartImage";
import { TicketCard } from "../ui/TicketCard";
import { stats } from "../../data/stats";

export const StatisticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState<{ [id: string]: number }>({
    "stat-explorers": 44,
    "stat-destinations": 300,
    "stat-discount": 30,
  });

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let hasAnimated = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          // Animate numbers up cleanly over 1.2s
          const startTime = performance.now();
          const duration = 1200;

          const animate = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Ease out quad
            const ease = 1 - (1 - progress) * (1 - progress);

            setCounts({
              "stat-explorers": Math.floor(44 * ease),
              "stat-destinations": Math.floor(300 * ease),
              "stat-discount": Math.floor(30 * ease),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                "stat-explorers": 44,
                "stat-destinations": 300,
                "stat-discount": 30,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      aria-label="Nomira Traveler Statistics"
      className="py-6 px-3 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto scroll-mt-20"
    >
      {/* Aerial teal ocean container */}
      <div className="relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden min-h-[500px] lg:min-h-[560px] py-12 sm:py-16 px-4 sm:px-8 flex flex-col justify-center items-center shadow-xl">
        {/* Background ocean photo */}
        <SmartImage
          imageId="stats_ocean"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Teal color wash overlay for contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#083344]/55 via-[#0e7490]/35 to-[#042f2e]/60"
          aria-hidden="true"
        />

        {/* Top small white caption */}
        <p className="relative z-10 text-xs sm:text-sm font-medium text-white/90 tracking-wide uppercase text-center mb-8 sm:mb-12 font-sans drop-shadow-xs">
          Trusted by thousands of travelers around the world
        </p>

        {/* Three Ticket Cards Row (desktop) / Stack (mobile) */}
        <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {stats.map((item) => {
            const currentNum = counts[item.id] ?? item.targetValue;
            const displayValue = `${currentNum}${item.suffix}`;

            return (
              <TicketCard
                key={item.id}
                value={displayValue}
                caption={item.caption}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
