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
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
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
      <header className={`fixed inset-x-0 z-40 transition-[top] duration-200 ease-out ${isScrolled ? "top-2" : "top-0"}`}>
        <div
          data-header-scrolled={isScrolled ? "true" : "false"}
          data-shell
          className={`shell transition-[background-color,box-shadow,border-color,border-radius] duration-200 ${isScrolled ? "rounded-[20px] border border-white/10 bg-[#0E0E0E]/95 shadow-lg" : "rounded-b-2xl border border-transparent bg-transparent"}`}
        >
          <div className="grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-3 px-[var(--header-inset)] py-3">
            <a href="#home" className="flex items-center gap-2 justify-self-start rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Starttrips home">
              <Logo theme="light" />
            </a>

            <nav aria-label="Main navigation" className="hidden lg:flex justify-self-center items-center gap-1 rounded-full border border-white/15 bg-black/40 p-1.5 shadow-sm backdrop-blur-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`inline-flex min-h-9 items-center whitespace-nowrap rounded-full px-3.5 text-[13px] xl:text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${isActive ? "bg-white text-[#151515] font-semibold" : "text-white/85 hover:bg-white/10 hover:text-white"}`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center justify-self-end gap-2.5">
              <Button
                variant="onPhoto"
                size="sm"
                onClick={onPlanTripClick}
                className="header-plan-cta min-h-10 px-4 font-semibold"
              >
                Plan my trip
              </Button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label="Open navigation menu"
                className="lg:hidden inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/35 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeSection={activeSection}
        onPlanTripClick={onPlanTripClick}
      />
    </>
  );
};
