import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { navLinks } from "../../data/navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onPlanTripClick: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onPlanTripClick,
}) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Starttrips Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0E0E0E]/95 backdrop-blur-xl p-6 text-white modal-backdrop-animate"
    >
      {/* Top Bar inside sheet */}
      <div className="flex items-center justify-between">
        <a href="#home" onClick={() => onCloseRef.current()} aria-label="Starttrips home">
          <Logo theme="light" />
        </a>
        <button
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label="Close navigation menu"
          className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Stacked Nav Links */}
      <nav aria-label="Mobile site navigation" className="flex flex-col gap-2 my-auto py-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              onClick={() => onCloseRef.current()}
              className={`flex items-center text-xl font-medium px-4 py-3.5 rounded-xl transition-all duration-200 min-h-[48px] ${
                isActive
                  ? "bg-white text-[#151515] font-semibold"
                  : "text-neutral-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
        <Button
          variant="onPhoto"
          size="lg"
          onClick={() => {
            onCloseRef.current();
            onPlanTripClick();
          }}
          className="w-full text-base font-semibold"
        >
          Plan my trip
        </Button>
        <p className="text-center text-xs text-neutral-400">
          Beach breaks, hill escapes and heritage trails across India
        </p>
      </div>
    </div>
  );
};
