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

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeSection, onPlanTripClick }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href]:not([tabindex="-1"]), button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      window.setTimeout(() => {
        // Do not steal focus from the enquiry dialog when the menu CTA opens it.
        if (!document.querySelector('[role="dialog"]')) previousFocusRef.current?.focus();
      }, 0);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Starttrips navigation menu"
      tabIndex={-1}
      onClick={(event) => { if (event.target === event.currentTarget) onCloseRef.current(); }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0E0E0E]/97 p-5 sm:p-6 text-white modal-backdrop-animate focus:outline-none"
    >
      <div className="flex items-center justify-between">
        <a href="#home" onClick={() => onCloseRef.current()} aria-label="Starttrips home">
          <Logo theme="light" />
        </a>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => onCloseRef.current()}
          aria-label="Close navigation menu"
          className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile site navigation" className="flex flex-col gap-2 my-auto py-6">
        {navLinks.map((link) => {
          const active = activeSection === link.id;
          return (
            <a
              key={link.id}
              href={link.href}
              aria-current={active ? "page" : undefined}
              onClick={() => onCloseRef.current()}
              className={`flex min-h-12 items-center rounded-xl px-4 py-3 text-xl font-medium transition-colors duration-200 ${active ? "bg-white text-[#151515] font-semibold" : "text-neutral-300 hover:text-white hover:bg-white/5"}`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <div className="flex flex-col gap-3 border-t border-white/10 pt-6">
        <Button variant="onPhoto" size="lg" onClick={() => {
          // Keep the hamburger as the enquiry dialog's return-focus target.
          document.querySelector<HTMLButtonElement>('[aria-label="Open navigation menu"]')?.focus();
          onCloseRef.current();
          onPlanTripClick();
        }} className="w-full font-semibold">
          Plan my trip
        </Button>
        <p className="text-center text-[13px] text-neutral-400">
          Beach breaks, hill escapes and heritage trails across India.
        </p>
      </div>
    </div>
  );
};
