import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { site } from "../../data/site";
import { Button } from "./Button";

interface StickyMobileCTAProps {
  onPlanTripClick: () => void;
  isAnyModalOpen: boolean;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ onPlanTripClick, isAnyModalOpen }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 450);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const footer = document.getElementById("contact");
    const observer = footer && "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setIsFooterVisible(Boolean(entry?.isIntersecting)), {
          root: null,
          rootMargin: "0px 0px -48px 0px",
          threshold: 0,
        })
      : null;
    if (footer && observer) observer.observe(footer);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
    };
  }, []);

  if (!isVisible || isFooterVisible || isAnyModalOpen) return null;

  return (
    <div role="group" aria-label="Mobile quick actions" className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-white/10 bg-[#0E0E0E]/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,.18)] backdrop-blur-md md:hidden" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
      <div className="flex min-w-0 flex-col">
        <span className="font-display text-sm font-semibold leading-tight tracking-tight text-white">Ready for a getaway?</span>
        <span className="text-[11px] text-neutral-400">Handpicked trips across India</span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {site.whatsappNumber && (
          <a href={"https://wa.me/" + site.whatsappNumber + "?text=" + encodeURIComponent("Hi Starttrips! I'd like to plan a trip.")} target="_blank" rel="noopener noreferrer" aria-label="Chat with Starttrips on WhatsApp" className="inline-flex size-11 items-center justify-center rounded-full bg-emerald-700 text-white shadow-[var(--shadow-xs)] transition-colors hover:bg-emerald-600 active:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <MessageCircle className="size-4" aria-hidden="true" />
          </a>
        )}
        <Button variant="onPhoto" size="sm" onClick={onPlanTripClick} className="min-h-11 px-4 text-xs font-semibold shadow-[var(--shadow-xs)]">Plan my trip</Button>
      </div>
    </div>
  );
};
