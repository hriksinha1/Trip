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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to sync active nav link with section in viewport
  useEffect(() => {
    const sectionIds = ["home", "trips", "about", "stats", "destinations", "stories", "faq", "contact"];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out py-3.5 sm:py-4 ${
          isScrolled
            ? "bg-[#0E0E0E]/90 backdrop-blur-md shadow-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* Inner Shell: strictly shares width with hero and sections */}
        <div
          data-shell
          className="shell flex items-center justify-between gap-4 px-3 sm:px-6"
        >
          {/* Left: Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg p-1 shrink-0"
            aria-label="Starttrips Home"
          >
            <Logo theme="light" />
          </a>

          {/* Center: Desktop Nav Capsule */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center bg-[rgba(20,20,20,0.45)] backdrop-blur-md border border-white/15 rounded-full px-2 py-1.5 shadow-sm"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-xs xl:text-sm font-medium transition-all duration-200 rounded-full px-3.5 xl:px-4 py-1.5 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    isActive
                      ? "bg-white text-[#151515] font-semibold shadow-xs"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Plan my trip CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Show CTA pill from sm up; below sm, sticky bottom bar handles it without cramping 320px screens */}
            <Button
              variant="onPhoto"
              size="sm"
              onClick={onPlanTripClick}
              className="hidden sm:inline-flex text-xs font-semibold px-4 py-2 shadow-sm"
            >
              Plan my trip
            </Button>

            {/* Hamburger Button for Mobile / Tablet */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Open navigation menu"
              className="lg:hidden p-2.5 rounded-full bg-black/30 backdrop-blur-md border border-white/15 text-white hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onPlanTripClick={onPlanTripClick}
      />
    </>
  );
};
