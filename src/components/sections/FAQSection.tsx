import React, { useState } from "react";
import { ChevronDown, Minus } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { faqs, FAQItem } from "../../data/faqs";

interface FAQSectionProps {
  onPlanTripClick: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onPlanTripClick }) => {
  // First item open by default
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-section-heading"
      className="w-full py-16 sm:py-24 scroll-mt-20"
    >
      <div data-shell className="shell">
        {/* Section Heading */}
        <SectionHeading
          id="faq-section-heading"
          title="Frequently Asked Questions"
          subtitle="Answers to common questions about planning a trip with Starttrips."
          className="mb-10 sm:mb-14"
        />

        {/* Accordion Container (constrained to --text-max) */}
        <div className="max-w-[var(--text-max)] mx-auto space-y-3 sm:space-y-3.5">
          {faqs.map((item: FAQItem) => {
            const isOpen = openId === item.id;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-[14px] border border-[#E8E6E0] shadow-soft overflow-hidden transition-colors"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4 font-display font-medium text-base sm:text-lg text-[#151515] hover:bg-neutral-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-inset"
                  >
                    <span className="leading-snug">{item.question}</span>

                    {/* Right-aligned icon indicator */}
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-[#151515] text-white"
                          : "bg-neutral-100 text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                </h3>

                {/* Collapsible Answer Region with Smooth Height */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-neutral-600 leading-relaxed font-sans border-t border-neutral-100/60 pt-3">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button Below */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            variant="primary"
            size="md"
            onClick={onPlanTripClick}
            className="px-6 py-2.5 font-semibold text-xs sm:text-sm shadow-md"
          >
            Still have a question? Plan my trip
          </Button>
        </div>
      </div>
    </section>
  );
};
