import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Chip } from "../ui/Chip";
import { SmartImage } from "../ui/SmartImage";
import { destinationCategories, DestinationCategory, destinations, Destination } from "../../data/destinations";

interface DestinationExplorerProps {
  onSelectDestination: (destination: Destination) => void;
}

const formatDestinationName = (destination: Destination) =>
  destination.name.toLowerCase().includes(destination.state.toLowerCase())
    ? destination.name
    : `${destination.name}, ${destination.state}`;

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({ onSelectDestination }) => {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory>("All");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const filteredDestinations = activeCategory === "All"
    ? destinations
    : destinations.filter((destination) => destination.categories.includes(activeCategory));

  const checkScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollLeft(track.scrollLeft > 2);
    setCanScrollRight(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: 0, behavior: "auto" });
    checkScroll();
  }, [activeCategory, filteredDestinations.length, checkScroll]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(track);
    checkScroll();
    return () => {
      track.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  const scrollByAmount = (direction: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: (direction === "left" ? -1 : 1) * track.clientWidth * 0.75, behavior: "smooth" });
  };

  const renderCarouselControls = (className: string) => (
    <div className={`items-center gap-2 ${className}`}>
      <button type="button" onClick={() => scrollByAmount("left")} disabled={!canScrollLeft} aria-label="Scroll destinations left" className="inline-flex size-11 lg:size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]">
        <ChevronLeft className="size-4" aria-hidden="true" />
      </button>
      <button type="button" onClick={() => scrollByAmount("right")} disabled={!canScrollRight} aria-label="Scroll destinations right" className="inline-flex size-11 lg:size-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]">
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <section id="destinations" aria-labelledby="discover-world-heading" className="section w-full scroll-mt-20">
      <div data-shell className="shell">
        <div className="mb-[var(--heading-gap)] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="discover-world-heading"
            align="left"
            title="Find your kind of escape"
            subtitle="From sun-soaked beaches to misty hills and heritage cities, explore places across India worth planning a trip around."
            className="min-w-0 flex-1"
          />
          {renderCarouselControls("hidden shrink-0 sm:flex")}
        </div>

        <div role="toolbar" aria-label="Filter destinations by travel style" className="mb-5 flex items-center justify-start gap-2 overflow-x-auto no-scrollbar px-1 pb-2">
          {destinationCategories.map((category) => (
            <Chip key={category} label={category} active={activeCategory === category} onClick={() => setActiveCategory(category)} />
          ))}
        </div>

        {renderCarouselControls("mb-3 flex justify-end sm:hidden")}
      </div>

      <div className="relative w-full">
        <div ref={trackRef} tabIndex={0} aria-label="Destinations carousel" className="bleed-pad no-scrollbar flex snap-x snap-mandatory gap-[var(--card-gap)] overflow-x-auto pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515]">
          {filteredDestinations.length === 0 ? (
            <div className="w-full py-12 text-center text-sm text-neutral-500">No destinations found for this category.</div>
          ) : filteredDestinations.map((destination) => (
            <article key={destination.id} className="group relative aspect-[6/7] w-[78vw] shrink-0 snap-start overflow-hidden rounded-[20px] bg-neutral-200 sm:w-[clamp(260px,22vw,400px)]">
              <SmartImage imageId={destination.imageId} fill sizes="(min-width: 1280px) 22vw, (min-width: 640px) 34vw, 78vw" className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
              <div className="absolute left-4 top-4 z-10">
                <span className="rounded-full border border-white/20 bg-black/45 px-3 py-1 text-xs font-medium text-white">{destination.badge}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col justify-end p-5 sm:p-6 text-left text-white">
                <h3 className="mb-1.5 font-display text-[22px] sm:text-2xl font-semibold tracking-tight leading-tight" style={{ textWrap: "balance" }}>
                  {formatDestinationName(destination)}
                </h3>
                <p className="mb-4 line-clamp-2 text-[15px] leading-relaxed text-white/90">{destination.description}</p>
                <div className="flex items-center justify-between gap-2 border-t border-white/20 pt-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {destination.tags.map((tag) => <span key={tag} className="rounded-full border border-white/35 bg-white/10 px-2.5 py-1 text-xs text-white/95">{tag}</span>)}
                  </div>
                  <button type="button" onClick={() => onSelectDestination(destination)} aria-label={`View details for ${formatDestinationName(destination)}`} className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white hover:text-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                    <ArrowRight className="size-4" aria-hidden="true" />
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
