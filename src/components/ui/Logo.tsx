import React from "react";
import { site } from "../../data/site";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark";
  showWordmark?: boolean;
}

/**
 * Brand Logo component for Starttrips.
 * NOTE: The "S" monogram below is a clean PLACEHOLDER. If the owner provides
 * an official logo image, setting `site.logoSrc` will render it automatically.
 */
export const Logo: React.FC<LogoProps> = ({
  className = "",
  theme = "light",
  showWordmark = true,
}) => {
  const isLight = theme === "light";

  if (site.logoSrc) {
    return (
      <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
        <img
          src={site.logoSrc}
          alt="Starttrips logo"
          className="h-7 w-auto object-contain"
        />
        {showWordmark && (
          <span
            className={`font-display text-lg font-semibold tracking-tight transition-colors ${
              isLight ? "text-white" : "text-[#151515]"
            }`}
          >
            {site.name}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Neutral Monogram Placeholder Mark */}
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
          isLight
            ? "bg-white text-[#151515] border-white/20"
            : "bg-[#151515] text-white border-neutral-800"
        }`}
        aria-hidden="true"
      >
        <span className="font-display font-bold text-sm leading-none">S</span>
      </div>

      {showWordmark && (
        <span
          className={`font-display text-lg font-semibold tracking-tight transition-colors ${
            isLight ? "text-white" : "text-[#151515]"
          }`}
          style={{ letterSpacing: "-0.01em" }}
        >
          {site.name}
        </span>
      )}
    </div>
  );
};
