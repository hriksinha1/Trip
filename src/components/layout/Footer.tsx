import React from "react";
import { Logo } from "../ui/Logo";
import { SocialIcon } from "../ui/SocialIcon";
import { Button } from "../ui/Button";
import { exploreLinks, supportLinks } from "../../data/navigation";
import { site } from "../../data/site";

interface FooterProps {
  onOpenLegalDialog: (type: "terms" | "privacy") => void;
  onPlanTripClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegalDialog,
  onPlanTripClick,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      aria-label="Starttrips Footer"
      data-shell
      className="shell bg-[#0E0E0E] text-white pt-10 sm:pt-14 pb-10 px-6 sm:px-10 lg:px-12 rounded-b-[24px] sm:rounded-b-[28px]"
    >
      {/* Main 4-column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-white/10">
        {/* Column 1: Brand & Socials */}
        <div className="flex flex-col items-start space-y-4">
          <a href="#home" aria-label="Starttrips Home">
            <Logo theme="light" />
          </a>
          <p className="text-sm text-[#9A9A9A] leading-relaxed max-w-[34ch] font-sans">
            Starttrips plans beach breaks, hill escapes and heritage trips across India.
          </p>

          <div className="flex items-center gap-2.5 pt-2" aria-label="Official channels">
            {site.socials.instagram && (
              <SocialIcon platform="instagram" href={site.socials.instagram} />
            )}
            {site.whatsappNumber && (
              <SocialIcon platform="whatsapp" href={`https://wa.me/${site.whatsappNumber}`} />
            )}
            {site.contactEmail && (
              <SocialIcon platform="email" href={`mailto:${site.contactEmail}`} />
            )}
          </div>
        </div>

        {/* Column 2: Explore Links */}
        <div>
          <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm text-[#9A9A9A]">
            {exploreLinks.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-xs"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Support Links */}
        <div>
          <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
            Support
          </h3>
          <ul className="space-y-2.5 text-sm text-[#9A9A9A]">
            {supportLinks.map((item, index) => (
              <li key={index}>
                {item.label === "Plan my trip" ? (
                  <button
                    type="button"
                    onClick={onPlanTripClick}
                    className="hover:text-white transition-colors duration-150 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-xs"
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="hover:text-white transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-xs"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Plan your trip conversion block (Replaces fake newsletter) */}
        <div className="flex flex-col">
          <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-2">
            Plan your trip
          </h3>
          <p className="text-sm text-[#9A9A9A] leading-relaxed mb-4 font-sans">
            Tell us where you'd like to go and we'll help arrange your itinerary.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="onPhoto"
              size="md"
              onClick={onPlanTripClick}
              className="w-full sm:w-auto font-semibold text-sm"
            >
              Plan my trip
            </Button>

            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-xs text-neutral-300 hover:text-white underline underline-offset-4 py-1"
            >
              Message on Instagram ({site.instagramHandle})
            </a>

            {site.whatsappNumber && (
              <a
                href={`https://wa.me/${site.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-4 py-1"
              >
                Chat on WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9A9A9A] gap-4">
        <p>© {currentYear} Starttrips. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => onOpenLegalDialog("terms")}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Terms & Conditions
          </button>
          <button
            type="button"
            onClick={() => onOpenLegalDialog("privacy")}
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
