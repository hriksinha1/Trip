import React from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PolaroidCard } from "../ui/PolaroidCard";
import { Button } from "../ui/Button";
import { editorialStories } from "../../data/stories";

export const TravelerStories: React.FC = () => {
  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="stories" aria-labelledby="experiences-heading" className="section w-full overflow-x-clip">
      <div data-shell className="shell">
        <SectionHeading
          id="experiences-heading"
          eyebrow="Travel inspiration"
          title="Experiences worth exploring"
          className="section-heading-gap"
        />

        <div className="hidden xl:grid grid-cols-5 items-start gap-[var(--card-gap)]">
          {editorialStories.map((story, index) => (
            <div
              key={story.id}
              className="min-w-0 transition-transform duration-300"
              style={{ transform: `rotate(${index % 2 === 0 ? -1.2 : 1.2}deg) translateY(${index % 2 === 0 ? 4 : 0}px)` }}
            >
              <PolaroidCard place={story.place} caption={story.caption} imageId={story.imageId} />
            </div>
          ))}
        </div>

        <div tabIndex={0} aria-label="Travel inspiration carousel" className="xl:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] rounded-xl">
          {editorialStories.map((story) => (
            <div key={story.id} className="snap-start shrink-0 w-[72vw] sm:w-[44vw]">
              <PolaroidCard place={story.place} caption={story.caption} imageId={story.imageId} rotationDesktop="rotate-0" offsetDesktop="translate-y-0" />
            </div>
          ))}
        </div>

        <div className="mt-7 sm:mt-9 flex flex-col items-center">
          <Button variant="primary" size="md" onClick={scrollToDestinations}>
            Explore destinations
          </Button>
          <p className="mt-3 text-xs text-neutral-500">Editorial inspiration, not customer reviews.</p>
        </div>
      </div>
    </section>
  );
};
