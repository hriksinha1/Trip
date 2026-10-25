import React, { useRef, useState, useEffect } from "react";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";
import { trips, Trip } from "../../data/trips";
import { site } from "../../data/site";

interface PopularTripsProps {
  onEnquireNow: (trip: Trip) => void;
}

export const PopularTrips: React.FC<PopularTripsProps> = ({ onEnquireNow }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const featuredTrips = trips.filter((t) => t.featured);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const checkScroll = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollPrev(scrollLeft > 10);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 10);
    setIsOverflowing(scrollWidth > clientWidth + 10);

    const cardWidth = scrollWidth / featuredTrips.length;
    const newIndex = Math.min(
      featuredTrips.length - 1,
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
  }, [featuredTrips.length]);

  const scrollToCard = (index: number) => {
    if (!trackRef.current) return;
    const cardEl = trackRef.current.children[index] as HTMLElement;
    if (cardEl) {
      cardEl.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return (
    <section
      id="trips"
      aria-labelledby="popular-trips-heading"
      className="w-full py-14 sm:py-20 scroll-mt-20"
    >
      <div data-shell className="shell">
        {/* Section Header */}
        <SectionHeading
          id="popular-trips-heading"
          title="Our Popular Trips"
          subtitle="Beach breaks, hill escapes and coastal getaways across India, picked to make planning easy."
          className="mb-10 sm:mb-14"
        />

        {/* Cards Container: scroll-snap on <sm, 2 columns on sm-xl, 4 columns on >=xl */}
        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Popular trips list"
          className="flex sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
        >
          {featuredTrips.map((trip) => {
            return (
              <article
                key={trip.id}
                className="snap-start shrink-0 w-[78vw] sm:w-auto flex flex-col group min-w-0"
              >
                {/* Image Frame */}
                <div className="relative aspect-[4/5] rounded-[16px] overflow-hidden bg-neutral-100 shadow-xs">
                  {trip.isRecommended && (
                    <span className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-neutral-800 shadow-xs select-none">
                      Recommended
                    </span>
                  )}
                  <SmartImage
                    imageId={trip.imageId}
                    fill
                    sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 78vw"
                    className="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Content below image */}
                <div className="pt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-medium text-neutral-500 mb-1">
                      {trip.location}
                    </p>
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-[#151515] tracking-tight leading-snug">
                      {trip.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {trip.description}
                    </p>

                    {/* Metadata Rows: Best Time & Duration */}
                    <div className="mt-3.5 space-y-1.5 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                        <span>Best time: {trip.bestTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
                        <span>{trip.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Price & Enquire Button */}
                  <div className="mt-4 pt-3 flex items-center justify-between gap-2 border-t border-neutral-200/60">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-neutral-500">From</span>
                        {/* Indian Rupee rendered in Poppins semibold */}
                        <span className="font-sans font-semibold text-base text-[#151515] tabular-nums">
                          {formatPrice(trip.priceFrom)}
                        </span>
                        {site.showSampleLabels && (
                          <span className="text-[10px] text-neutral-400 uppercase tracking-wider bg-neutral-100 px-1.5 py-0.5 rounded-xs">
                            Indicative
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-neutral-500">/ person</span>
                    </div>

                    <Button
                      variant={trip.isPrimaryButton ? "primary" : "outline"}
                      size="sm"
                      onClick={() => onEnquireNow(trip)}
                      className="font-medium text-xs px-4 py-1.5"
                    >
                      Enquire Now
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Pager: Visible on mobile (<640px) when carousel track overflows */}
        {isOverflowing && (
          <div className="mt-6 flex items-center justify-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={!canScrollPrev}
              aria-label="Previous trip"
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {featuredTrips.map((_, i) => (
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
              onClick={() => scrollToCard(Math.min(featuredTrips.length - 1, activeIndex + 1))}
              disabled={!canScrollNext}
              aria-label="Next trip"
              className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Footnote */}
        <p className="mt-8 text-center text-xs text-neutral-500">
          Prices are indicative starting points per person and may change. Enquire for current rates.
        </p>
      </div>
    </section>
  );
};
