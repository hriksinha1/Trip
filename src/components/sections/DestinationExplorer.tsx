import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Chip } from "../ui/Chip";
import { SmartImage } from "../ui/SmartImage";
import {
  destinationCategories,
  DestinationCategory,
  destinations,
  Destination,
} from "../../data/destinations";

interface DestinationExplorerProps {
  onSelectDestination: (destination: Destination) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onSelectDestination,
}) => {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredDestinations =
    activeCategory === "All"
      ? destinations
      : destinations.filter((d) => d.region === activeCategory);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!trackRef.current) return;
    const scrollAmount = trackRef.current.clientWidth * 0.75;
    trackRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="destinations"
      aria-labelledby="discover-world-heading"
      className="py-16 sm:py-24 overflow-x-clip scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
        {/* Section Heading */}
        <SectionHeading
          id="discover-world-heading"
          title="Discover the World"
          subtitle="From hidden beaches to buzzing cities explore handpicked destinations around the globe, curated for every kind of traveler."
          className="mb-8"
        />

        {/* Filter Chips Bar */}
        <div
          role="toolbar"
          aria-label="Filter destinations by region"
          className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-10 px-1"
        >
          {destinationCategories.map((category) => (
            <Chip
              key={category}
              label={category}
              active={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
      </div>

      {/* Carousel Track with Edge-to-Edge Peek on Desktop */}
      <div className="relative w-full">
        {/* Controls: Prev / Next Buttons */}
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex justify-end gap-2 mb-3">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll destinations left"
            className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll destinations right"
            className="w-9 h-9 rounded-full bg-white border border-neutral-300 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Track */}
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Destinations carousel"
          className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 sm:px-8 md:px-12 lg:px-20 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
        >
          {filteredDestinations.map((dest) => (
            <article
              key={dest.id}
              className="snap-start shrink-0 w-[clamp(260px,26vw,360px)] aspect-[6/7] rounded-[18px] sm:rounded-[22px] overflow-hidden relative group shadow-md transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Full-bleed Destination Image */}
              <SmartImage
                imageId={dest.imageId}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
                aria-hidden="true"
              />

              {/* Top-left Curated Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/20 text-[11px] font-medium text-white/90 select-none">
                  {dest.badge}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 flex flex-col justify-end text-left text-white">
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white mb-1.5 drop-shadow-xs">
                  {dest.name}, {dest.country}
                </h3>

                <p className="text-xs text-white/80 line-clamp-2 leading-relaxed mb-4 font-sans">
                  {dest.description}
                </p>

                {/* Tags and Action Arrow Button */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/15">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {dest.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full border border-white/35 bg-white/10 text-[11px] font-normal text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDestination(dest)}
                    aria-label={`View details for ${dest.name}, ${dest.country}`}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#151515] backdrop-blur-xs flex items-center justify-center transition-all duration-200 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
