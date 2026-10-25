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
  const featuredTrips = trips.filter((trip) => trip.featured);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const checkScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    const overflowing = scrollWidth > clientWidth + 2;
    setIsOverflowing(overflowing);
    setCanScrollPrev(scrollLeft > 2);
    setCanScrollNext(overflowing && scrollLeft < scrollWidth - clientWidth - 2);

    if (featuredTrips.length > 0) {
      const first = track.firstElementChild as HTMLElement | null;
      const cardWidth = first?.getBoundingClientRect().width || 1;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap || "0") || 0;
      setActiveIndex(Math.min(featuredTrips.length - 1, Math.max(0, Math.round(scrollLeft / (cardWidth + gap)))));
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    checkScroll();
    track.addEventListener("scroll", checkScroll, { passive: true });
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, [featuredTrips.length]);

  const scrollToCard = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const targetLeft = track.scrollLeft + card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <section id="trips" aria-labelledby="popular-trips-heading" className="section w-full scroll-mt-20">
      <div data-shell className="shell">
        <SectionHeading
          id="popular-trips-heading"
          title="Our popular trips"
          subtitle="Beach breaks, hill escapes and coastal getaways across India, picked to make planning easier."
          className="section-heading-gap"
        />

        <div
          ref={trackRef}
          tabIndex={0}
          aria-label="Popular trips list"
          className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:auto-rows-fr gap-[var(--card-gap)] overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
        >
          {featuredTrips.map((trip) => (
            <article
              key={trip.id}
              className="snap-start shrink-0 w-[78vw] sm:w-auto min-w-0 flex h-full flex-col group"
            >
              <div className="relative aspect-[4/5] sm:aspect-[4/3] xl:aspect-[5/6] rounded-[var(--radius-card)] overflow-hidden bg-neutral-100 shadow-xs">
                {trip.isRecommended && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-white/95 text-[11px] font-semibold text-neutral-800 shadow-xs select-none">
                    Featured
                  </span>
                )}
                <SmartImage
                  imageId={trip.imageId}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 46vw, 78vw"
                  className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="pt-4 flex flex-1 flex-col">
                <div>
                  <p className="text-[13px] font-medium text-neutral-500 mb-1">{trip.location}</p>
                  <h3 className="font-display text-[20px] sm:text-[21px] font-semibold tracking-tight leading-snug line-clamp-2">
                    {trip.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-neutral-600 line-clamp-2 leading-relaxed min-h-[3.15rem]">
                    {trip.description}
                  </p>
                  <div className="mt-3 space-y-1.5 text-[13px] text-neutral-500">
                    <div className="flex items-start gap-2">
                      <Calendar className="mt-0.5 size-4 shrink-0 text-neutral-400" aria-hidden="true" />
                      <span>Best time: {trip.bestTime}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="mt-0.5 size-4 shrink-0 text-neutral-400" aria-hidden="true" />
                      <span>{trip.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-4">
                  <div className="border-t border-neutral-200/80 pt-3">
                    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
                      <span className="text-xs text-neutral-500">From</span>
                      <span className="font-sans font-semibold text-[18px] text-[#151515] tabular-nums">{formatPrice(trip.priceFrom)}</span>
                      <span className="text-[13px] text-neutral-500">/ person</span>
                    </div>
                    {site.showSampleLabels && (
                      <span className="mt-1 inline-flex rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] tracking-wide text-neutral-500">
                        Indicative price
                      </span>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onEnquireNow(trip)}
                    className="mt-3 w-full whitespace-normal text-center leading-tight"
                  >
                    Enquire about this trip
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {isOverflowing && (
          <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={!canScrollPrev}
              aria-label="Previous trip"
              className="min-h-11 min-w-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {featuredTrips.map((trip, index) => (
                <button
                  key={trip.id}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  aria-label={`Go to trip ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  className="flex min-h-11 min-w-7 items-center justify-center"
                >
                  <span className={`block rounded-full transition-all ${activeIndex === index ? "w-5 h-2 bg-[#151515]" : "size-2 bg-neutral-300"}`} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollToCard(Math.min(featuredTrips.length - 1, activeIndex + 1))}
              disabled={!canScrollNext}
              aria-label="Next trip"
              className="min-h-11 min-w-11 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        <p className="mt-5 text-center text-[13px] text-neutral-500">
          Prices are indicative starting points per person and may change. Enquire for current rates.
        </p>
      </div>
    </section>
  );
};
