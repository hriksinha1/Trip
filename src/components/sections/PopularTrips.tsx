import React, { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";
import { trips, Trip } from "../../data/trips";

interface PopularTripsProps {
  onBookNow: (trip: Trip) => void;
}

export const PopularTrips: React.FC<PopularTripsProps> = ({ onBookNow }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    setIsOverflowing(scrollWidth > clientWidth + 10);

    const cardWidth = scrollWidth / trips.length;
    const newIndex = Math.min(
      trips.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const cardEl = trackRef.current.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  const scrollPrev = () => {
    scrollToCard(Math.max(0, activeIndex - 1));
  };

  const scrollNext = () => {
    scrollToCard(Math.min(trips.length - 1, activeIndex + 1));
  };

  return (
    <section
      id="trips"
      aria-labelledby="popular-trips-heading"
      className="py-14 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1280px] mx-auto scroll-mt-20"
    >
      {/* Section Header */}
      <SectionHeading
        id="popular-trips-heading"
        title="Our Popular Trips"
        subtitle="Discover where everyone's heading this season, from tropical escapes to urban adventures, these trips are stealing the spotlight."
        className="mb-10 sm:mb-14"
      />

      {/* Cards Container: 4-col grid on wide desktop, scroll-snap track on mobile/tablet */}
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label="Popular trips carousel"
        className="flex xl:grid xl:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto xl:overflow-x-visible snap-x snap-mandatory no-scrollbar pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
      >
        {trips.map((trip) => {
          return (
            <article
              key={trip.id}
              className="snap-start shrink-0 w-[78vw] sm:w-[44vw] xl:w-auto flex flex-col group"
            >
              {/* Image Container with Recommended Pill */}
              <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-neutral-100 shadow-xs">
                {trip.isRecommended && (
                  <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-neutral-800 shadow-xs select-none">
                    Recommended
                  </span>
                )}
                <SmartImage
                  imageId={trip.imageId}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Text content below image (on page background, no boxed card) */}
              <div className="pt-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium text-neutral-500 mb-1">
                    {trip.location}
                  </p>
                  <h3 className="font-display text-lg sm:text-xl font-semibold text-[#151515] tracking-tight leading-snug">
                    {trip.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {trip.description}
                  </p>

                  {/* Metadata Rows: Dates & Duration */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-neutral-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span>{trip.dates}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Price & Book Button */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-neutral-200/60">
                  <div>
                    <span className="font-display text-base font-bold text-[#151515]">
                      {trip.priceRange}
                    </span>
                    <span className="text-xs text-neutral-500 ml-1">/ Person</span>
                  </div>

                  <Button
                    variant={trip.isPrimaryButton ? "primary" : "outline"}
                    size="sm"
                    onClick={() => onBookNow(trip)}
                    className="font-medium text-xs px-4 py-1.5"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pager: Visible only when carousel track actually overflows */}
      {isOverflowing && (
        <div className="mt-8 flex items-center justify-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            aria-label="Previous trip"
            className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-1.5 px-2">
            {trips.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Go to trip ${i + 1}`}
                className={`transition-all duration-200 rounded-full ${
                  activeIndex === i
                    ? "w-6 h-2 bg-[#151515]"
                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            aria-label="Next trip"
            className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Honesty note */}
      <p className="mt-6 text-center text-xs text-neutral-400">
        Sample trips and indicative prices for demonstration only.
      </p>
    </section>
  );
};
