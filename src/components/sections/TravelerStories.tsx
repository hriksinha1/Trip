import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PolaroidCard } from "../ui/PolaroidCard";
import { Button } from "../ui/Button";
import { editorialStories } from "../../data/stories";

export const TravelerStories: React.FC = () => {
  const scrollToDestinations = () => {
    const el = document.getElementById("destinations");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="stories"
      aria-labelledby="experiences-heading"
      className="w-full py-16 sm:py-24 overflow-x-clip scroll-mt-20"
    >
      <div data-shell className="shell">
        {/* Section Heading */}
        <SectionHeading
          id="experiences-heading"
          eyebrow="Travel inspiration"
          title="Experiences worth exploring"
          className="mb-12 sm:mb-16"
        />

        {/* Desktop Overlapping Composition (xl: >=1280px) */}
        <div className="hidden xl:flex items-center justify-center -space-x-4 max-w-[1400px] mx-auto py-6">
          {editorialStories.map((story) => (
            <div
              key={story.id}
              className="flex-1 min-w-0 max-w-[300px] shrink-0 transition-all duration-300"
            >
              <PolaroidCard
                place={story.place}
                caption={story.caption}
                imageId={story.imageId}
                rotationDesktop={story.rotationDesktop}
                offsetDesktop={story.offsetDesktop}
              />
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Scroll-snap Carousel (<1280px) */}
        <div
          tabIndex={0}
          aria-label="Experiences carousel"
          className="xl:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
        >
          {editorialStories.map((story) => (
            <div
              key={story.id}
              className="snap-start shrink-0 w-[72vw] sm:w-[44vw]"
            >
              <PolaroidCard
                place={story.place}
                caption={story.caption}
                imageId={story.imageId}
                rotationDesktop="rotate-0"
                offsetDesktop="translate-y-0"
              />
            </div>
          ))}
        </div>

        {/* Action Button & Honest Footnote */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <Button
            variant="primary"
            size="md"
            onClick={scrollToDestinations}
            className="px-8 py-3 font-semibold text-xs sm:text-sm shadow-md"
          >
            Explore destinations
          </Button>
          <p className="mt-4 text-xs text-neutral-500">
            Editorial inspiration, not customer reviews.
          </p>
        </div>
      </div>
    </section>
  );
};
