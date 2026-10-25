import React, { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PolaroidCard } from "../ui/PolaroidCard";
import { Button } from "../ui/Button";
import { stories, Story } from "../../data/stories";

interface TravelerStoriesProps {
  onSeeMoreStories: () => void;
}

export const TravelerStories: React.FC<TravelerStoriesProps> = ({
  onSeeMoreStories,
}) => {
  const [extraStories, setExtraStories] = useState<Story[]>([]);
  const [hasExpanded, setHasExpanded] = useState(false);

  const handleSeeMore = () => {
    if (!hasExpanded) {
      setExtraStories([
        {
          id: "story-6",
          author: "Maya Lin",
          quote: "Exploring the hidden bamboo groves at dawn was a transcendent experience.",
          imageId: "dest_kyoto",
          rotationDesktop: "-rotate-2",
          offsetDesktop: "translate-y-1",
        },
        {
          id: "story-7",
          author: "Liam & Sarah",
          quote: "Our honeymoon in the Greek isles felt like a movie scene from beginning to end.",
          imageId: "dest_santorini",
          rotationDesktop: "rotate-2",
          offsetDesktop: "-translate-y-2",
        },
      ]);
      setHasExpanded(true);
    } else {
      onSeeMoreStories();
    }
  };

  const allStories = [...stories, ...extraStories];

  return (
    <section
      id="stories"
      aria-labelledby="traveler-stories-heading"
      className="py-16 sm:py-24 overflow-x-clip scroll-mt-20"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-10 lg:px-14">
        {/* Section Heading */}
        <SectionHeading
          id="traveler-stories-heading"
          eyebrow="Real stories from real travelers"
          title="Moments that made every journey unforgettable"
          className="mb-12 sm:mb-16"
        />
      </div>

      {/* Desktop Scattered Polaroid Layout / Mobile Horizontal Carousel */}
      <div className="w-full relative px-4 sm:px-6">
        {/* Desktop Container: bleed with mild overlap and alternating angles */}
        <div className="hidden lg:flex items-center justify-center -space-x-4 xl:-space-x-6 max-w-[1400px] mx-auto py-6">
          {allStories.map((story) => (
            <div
              key={story.id}
              className="w-[240px] xl:w-[270px] shrink-0 transition-all duration-300"
            >
              <PolaroidCard
                author={story.author}
                quote={story.quote}
                imageId={story.imageId}
                rotationDesktop={story.rotationDesktop}
                offsetDesktop={story.offsetDesktop}
              />
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Scroll-snap Carousel */}
        <div
          tabIndex={0}
          aria-label="Traveler stories carousel"
          className="lg:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl"
        >
          {allStories.map((story) => (
            <div
              key={story.id}
              className="snap-start shrink-0 w-[72vw] sm:w-[48vw]"
            >
              <PolaroidCard
                author={story.author}
                quote={story.quote}
                imageId={story.imageId}
                rotationDesktop="rotate-0"
                offsetDesktop="translate-y-0"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Button & Disclaimer */}
      <div className="mt-12 sm:mt-16 flex flex-col items-center">
        <Button
          variant="primary"
          size="md"
          onClick={handleSeeMore}
          className="px-8 py-3 font-semibold text-xs sm:text-sm shadow-md"
        >
          {hasExpanded ? "Explore community stories" : "See more happiness"}
        </Button>
        <p className="mt-4 text-xs text-neutral-400">
          Sample stories for demonstration.
        </p>
      </div>
    </section>
  );
};
