import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../../data/site";
import { Button } from "./Button";

interface StickyMobileCTAProps {
  onPlanTripClick: () => void;
  isAnyModalOpen: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({
  onPlanTripClick,
  isAnyModalOpen,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after user scrolls past hero threshold (~450px)
      setIsVisible(window.scrollY > 450);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide while any dialog or menu is open or before scrolled past hero
  if (!isVisible || isAnyModalOpen) return null;

  return (
    <div
      aria-label="Mobile quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0E0E0E]/95 backdrop-blur-md border-t border-white/10 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl modal-content-animate"
      style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex flex-col">
        <span className="font-display text-sm font-semibold text-white tracking-tight leading-tight">
          Ready for a getaway?
        </span>
        <span className="text-[11px] text-neutral-400">
          Handpicked trips across India
        </span>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {site.whatsappNumber && (
          <a
            href={`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("Hi Starttrips! I'd like to plan a trip.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Starttrips on WhatsApp"
            className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        )}
        <Button
          variant="onPhoto"
          size="sm"
          onClick={onPlanTripClick}
          className="text-xs font-semibold px-4 py-2"
        >
          Plan my trip
        </Button>
      </div>
    </div>
  );
};
