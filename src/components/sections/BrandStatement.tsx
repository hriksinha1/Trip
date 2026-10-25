import React from "react";
import { ArrowRight } from "lucide-react";
import { SmartImage } from "../ui/SmartImage";
import { Button } from "../ui/Button";

const collage = [
  { id: "dest_coorg", label: "Coorg", className: "row-span-2" },
  { id: "dest_gokarna", label: "Gokarna", className: "" },
  { id: "dest_hampi", label: "Hampi", className: "" },
];

export const BrandStatement: React.FC = () => {
  return (
    <section id="about" aria-labelledby="brand-statement-heading" className="section w-full">
      <div data-shell className="shell grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-8 md:gap-10 lg:gap-[clamp(32px,4vw,72px)]">
        <div className="flex flex-col items-start text-left">
          <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-[0.16em] font-sans mb-3">
            Travel made simple
          </span>
          <h2
            id="brand-statement-heading"
            className="font-display text-[clamp(2.25rem,1.2rem+2.8vw,3.75rem)] font-medium tracking-tight text-[#151515] leading-[1.04] max-w-[15ch]"
            style={{ textWrap: "balance" }}
          >
            Less planning stress. More stories worth telling.
          </h2>
          <p className="mt-5 text-[16px] sm:text-[17px] text-neutral-600 max-w-[62ch] leading-relaxed font-sans">
            Beach breaks, hill escapes and heritage trails across India, shaped around how you like to travel.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="md" onClick={() => document.getElementById("plan")?.scrollIntoView({ behavior: "smooth" })}>
              Plan my trip
            </Button>
            <a href="#destinations" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[#151515] underline underline-offset-4 decoration-neutral-300 hover:decoration-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-4 rounded-sm">
              Explore destinations <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="grid h-[clamp(300px,32vw,460px)] min-w-0 grid-cols-2 grid-rows-[repeat(2,minmax(0,1fr))] gap-3">
          {collage.map((photo) => (
            <figure key={photo.id} className={`relative min-w-0 overflow-hidden rounded-[var(--radius-card)] bg-[#E8E6E0] shadow-soft ${photo.className}`}>
              <SmartImage imageId={photo.id} alt={photo.label + " travel landscape in India"} fill className="object-cover" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
