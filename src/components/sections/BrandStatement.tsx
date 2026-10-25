import React from "react";
import { SmartImage } from "../ui/SmartImage";

export const BrandStatement: React.FC = () => {
  const avatarIds = ["avatar_1", "avatar_2", "avatar_3", "avatar_4"];

  return (
    <section
      id="about"
      aria-labelledby="brand-statement-heading"
      className="relative min-h-[55vh] md:min-h-[70vh] flex flex-col justify-center items-center text-center py-20 sm:py-28 px-4 sm:px-6 md:px-10 max-w-[1280px] mx-auto overflow-hidden select-none"
    >
      {/* Subtle background ambient blur */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-neutral-200/40 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Eyebrow */}
      <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-widest font-sans mb-4 sm:mb-6">
        Travel made simple, stories made unforgettable.
      </span>

      {/* Big Display H2 Statement */}
      <h2
        id="brand-statement-heading"
        className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#151515] leading-[1.08] sm:leading-[1.1] max-w-[18ch]"
        style={{ textWrap: "balance" }}
      >
        We make planning effortless so you can focus on what really matters
      </h2>

      {/* Traveler Avatar Cluster & Quote */}
      <div className="mt-10 sm:mt-14 flex flex-col items-center">
        {/* 4 Overlapping Circular Portraits */}
        <div className="flex items-center justify-center -space-x-3 mb-4">
          {avatarIds.map((avatarId, index) => (
            <div
              key={avatarId}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full ring-2 ring-white overflow-hidden shadow-xs shrink-0"
              style={{ zIndex: 10 - index }}
            >
              <SmartImage
                imageId={avatarId}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Muted Subtitle */}
        <p className="text-xs sm:text-sm text-neutral-500 max-w-[38ch] leading-relaxed font-sans">
          Founded by travelers, for travelers, because every journey deserves a personal touch.
        </p>
      </div>
    </section>
  );
};
