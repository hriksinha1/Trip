import React, { useState } from "react";
import { Logo } from "../ui/Logo";
import { SocialIcon } from "../ui/SocialIcon";
import { exploreLinks, supportLinks } from "../../data/navigation";

interface FooterProps {
  onOpenLegalDialog: (type: "terms" | "privacy" | "partner") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalDialog }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setStatus("error");
      setErrorMessage("Please enter an email address.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("success");
    setErrorMessage("");
    setEmail("");
  };

  return (
    <footer
      id="contact"
      aria-label="Site Footer"
      className="bg-[#0E0E0E] text-white pt-10 sm:pt-14 pb-10 px-6 sm:px-10 lg:px-14 rounded-b-[24px] sm:rounded-b-[28px]"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Main 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 lg:gap-8 pb-12 sm:pb-16 border-b border-white/10">
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col items-start space-y-4">
            <a href="#home" aria-label="Nomira Home">
              <Logo theme="light" />
            </a>
            <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed max-w-[34ch] font-sans">
              Nomira helps you discover handpicked destinations and authentic experiences that make every journey unforgettable.
            </p>

            <div className="flex items-center gap-2.5 pt-2" aria-label="Social media channels">
              <SocialIcon platform="instagram" />
              <SocialIcon platform="tiktok" />
              <SocialIcon platform="x" />
              <SocialIcon platform="facebook" />
            </div>
          </div>

          {/* Column 2: Explore Links */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9A9A9A]">
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
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#9A9A9A]">
              {supportLinks.map((item, index) => (
                <li key={index}>
                  {item.label === "Our Partners" ? (
                    <button
                      type="button"
                      onClick={() => onOpenLegalDialog("partner")}
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

          {/* Column 4: Newsletter */}
          <div className="flex flex-col">
            <h3 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-2">
              Stay in the loop
            </h3>
            <p className="text-xs sm:text-sm text-[#9A9A9A] leading-relaxed mb-4 font-sans">
              Get travel inspo, exclusive deals, and the latest Nomira updates straight to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="relative flex flex-col gap-2">
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your email address
              </label>
              <div className="relative flex items-center bg-white/10 border border-white/15 rounded-full p-1 pl-4 focus-within:border-white focus-within:ring-1 focus-within:ring-white transition-all">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  autoComplete="email"
                  placeholder="Enter your email address"
                  aria-invalid={status === "error"}
                  aria-describedby={status === "error" ? "newsletter-error" : undefined}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-white/60 focus:outline-none pr-2 font-sans"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-[#151515] font-semibold text-xs sm:text-sm hover:bg-neutral-100 transition-colors whitespace-nowrap shrink-0 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Subscribe
                </button>
              </div>

              {/* Status Announcements */}
              {status === "error" && (
                <p id="newsletter-error" role="alert" className="text-xs text-rose-400 mt-1 pl-2">
                  {errorMessage}
                </p>
              )}

              {status === "success" && (
                <p role="status" className="text-xs text-emerald-400 mt-1 pl-2 font-medium">
                  Thanks! You're on the list. (Demo: no email was actually sent.)
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9A9A9A] gap-4">
          <p>© {currentYear} Nomira. All rights reserved.</p>

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
      </div>
    </footer>
  );
};
