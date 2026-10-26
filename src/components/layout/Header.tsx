import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { navLinks } from "../../data/navigation";

interface HeaderProps {
  onPlanTripClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlanTripClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["home", "trips", "about", "stats", "destinations", "stories", "faq", "contact"];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 });

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 w-full">
        <div
          data-header-scrolled={isScrolled ? "true" : "false"}
          data-header-bar
          className={"w-full border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-200 ease-out " + (
            isScrolled
              ? "border-white/10 bg-[#0E0E0E]/95 shadow-[var(--shadow-header)] backdrop-blur-lg"
              : "border-white/10 bg-[#0E0E0E]/30 backdrop-blur-sm"
          )}
        >
          <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-[var(--page-inset)] py-2.5 sm:py-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <a href="#home" className="flex min-h-11 min-w-0 items-center justify-self-start gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Starttrips home">
              <Logo theme="light" />
            </a>

            <nav aria-label="Main navigation" className="hidden items-center justify-self-center gap-0.5 rounded-full border border-white/15 bg-black/45 p-1 shadow-[var(--shadow-xs)] backdrop-blur-md lg:flex">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={"relative inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-2.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white xl:px-3 " + (
                      isActive
                        ? "bg-white text-[#151515] font-semibold shadow-sm"
                        : "text-white/90 hover:bg-white/10 hover:text-white active:bg-white/20"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center justify-self-end gap-2.5">
              <Button variant="onPhoto" size="md" onClick={onPlanTripClick} className="header-plan-cta min-h-11 px-4 font-semibold shadow-[var(--shadow-xs)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0">
                Plan my trip
              </Button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white shadow-[var(--shadow-xs)] transition-colors hover:bg-white/15 active:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} activeSection={activeSection} onPlanTripClick={onPlanTripClick} />
    </>
  );
};
