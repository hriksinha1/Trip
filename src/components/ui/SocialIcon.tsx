import React from "react";

export type SocialPlatform = "instagram" | "tiktok" | "x" | "facebook";

interface SocialIconProps {
  platform: SocialPlatform;
  href?: string;
  label?: string;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  href,
  label,
  className = "",
}) => {
  const defaultLabels: Record<SocialPlatform, string> = {
    instagram: "Follow Nomira on Instagram",
    tiktok: "Watch Nomira stories on TikTok",
    x: "Follow Nomira on X",
    facebook: "Connect with Nomira on Facebook",
  };

  const defaultUrls: Record<SocialPlatform, string> = {
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    x: "https://x.com",
    facebook: "https://facebook.com",
  };

  const ariaLabel = label || defaultLabels[platform];
  const url = href || defaultUrls[platform];

  const renderSvg = () => {
    switch (platform) {
      case "instagram":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        );
      case "tiktok":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.11V9.4a6.33 6.33 0 0 0-.86-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.47 6.26 6.26 0 0 0 1.86-4.48V8.78a8.18 8.18 0 0 0 4.77 1.52v-3.45a4.85 4.85 0 0 1-.86-.16z" />
          </svg>
        );
      case "x":
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "facebook":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5c0-.988.245-1.49 1.52-1.49h2.47V2.5h-3.87c-3.666 0-4.12 2.658-4.12 4.98v2.03H6.5v3.98h2.698v8.01z" />
          </svg>
        );
    }
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full bg-white text-[#151515] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0E0E] ${className}`}
    >
      {renderSvg()}
    </a>
  );
};
