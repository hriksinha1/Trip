import React from "react";
import { SmartImage } from "../ui/SmartImage";

export const BrandStatement: React.FC = () => {
  // Aliases existing destination image keys for regional thumbnail cluster
  const destinationThumbnails = ["dest_goa", "dest_coorg", "dest_chikmagalur", "dest_gokarna"];

  return (
    <section
      id="about"
      aria-labelledby="brand-statement-heading"
      className="w-full py-20 sm:py-28 select-none overflow-hidden"
    >
      <div
        data-shell
        className="shell relative min-h-[50vh] md:min-h-[60vh] flex flex-col justify-center items-center text-center px-4"
      >
        {/* Subtle background ambient blur constrained to prevent horizontal viewport overflow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100%)] h-[300px] bg-neutral-200/40 rounded-full blur-3xl pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Eyebrow */}
        <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-widest font-sans mb-4 sm:mb-6">
          Travel made simple
        </span>

        {/* Big Display H2 Statement */}
        <h2
          id="brand-statement-heading"
          className="font-display text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#151515] leading-[1.08] sm:leading-[1.1] max-w-[18ch]"
          style={{ textWrap: "balance" }}
        >
          Less planning stress. More stories worth telling.
        </h2>

        {/* Destination Thumbnail Cluster & Editorial Caption */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center">
          {/* 4 Overlapping Destination Thumbnails (no stock portrait faces) */}
          <div className="flex items-center justify-center -space-x-3 mb-4">
            {destinationThumbnails.map((thumbId, index) => (
              <div
                key={thumbId}
                className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-white overflow-hidden shadow-xs shrink-0"
                style={{ zIndex: 10 - index }}
              >
                <SmartImage
                  imageId={thumbId}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Caption */}
          <p className="text-sm text-neutral-600 max-w-[44ch] leading-relaxed font-sans">
            Beach breaks, hill escapes and heritage trails across India, shaped around how you like to travel.
          </p>
        </div>
      </div>
    </section>
  );
};
