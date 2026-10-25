import React, { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { faqs, FAQItem } from "../../data/faqs";

interface FAQSectionProps {
  onPlanTripClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onPlanTripClick }) => {
  const [openId, setOpenId] = useState<string>("faq-1");
  const toggleItem = (id: string) => setOpenId((previous) => previous === id ? "" : id);

  return (
    <section id="faq" aria-labelledby="faq-section-heading" className="section w-full scroll-mt-20">
      <div data-shell className="shell">
        <SectionHeading
          id="faq-section-heading"
          title="Frequently asked questions"
          subtitle="Answers to common questions about planning a trip with Starttrips."
          className="section-heading-gap"
        />

        <div className="mx-auto max-w-[var(--text-max)] space-y-3">
          {faqs.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            return (
              <article key={item.id} className="overflow-hidden rounded-[14px] border border-[#E8E6E0] bg-white shadow-soft transition-colors">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="flex min-h-14 w-full items-center justify-between gap-4 p-4 sm:px-5 sm:py-4 text-left font-display text-[16px] sm:text-[17px] font-medium text-[#151515] transition-colors hover:bg-neutral-50/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-inset"
                  >
                    <span className="leading-snug">{item.question}</span>
                    <span className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-[#151515] text-white" : "bg-neutral-100 text-neutral-600"}`}>
                      {isOpen ? <Minus className="size-4" aria-hidden="true" /> : <ChevronDown className="size-4" aria-hidden="true" />}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="border-t border-neutral-100 px-4 pb-4 pt-3 text-[15px] leading-relaxed text-neutral-600 sm:px-5">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-6 sm:mt-8 flex justify-center">
          <Button variant="primary" size="md" onClick={onPlanTripClick}>
            Plan my trip
          </Button>
        </div>
      </div>
    </section>
  );
};
