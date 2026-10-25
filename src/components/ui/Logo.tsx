import React from "react";

interface LogoProps {
  className?: string;
  theme?: "light" | "dark";
  showWordmark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  theme = "light",
  showWordmark = true,
}) => {
  const isLight = theme === "light";
  const fillColor = isLight ? "#FFFFFF" : "#151515";

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric 'N' Logo Mark - two interlocking angular forms */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Left upright angled segment */}
        <path
          d="M4 22.5V5.5C4 4.67 4.67 4 5.5 4H10L10 20C10 21.38 8.88 22.5 7.5 22.5H4Z"
          fill={fillColor}
        />
        {/* Diagonal interlocking bar */}
        <path
          d="M9 4.5L22.5 21.5C23.2 22.38 22.58 23.7 21.45 23.7H17L7.5 11.5C6.9 10.75 7.43 9.6 8.38 9.6L9 4.5Z"
          fill={fillColor}
          fillOpacity={isLight ? "0.9" : "0.85"}
        />
        {/* Right upright segment */}
        <path
          d="M18 7.5C18 6.12 19.12 5 20.5 5H24V22C24 22.83 23.33 23.5 22.5 23.5H18V7.5Z"
          fill={fillColor}
        />
      </svg>

      {showWordmark && (
        <span
          className={`font-display text-lg tracking-tight font-bold uppercase transition-colors ${
            isLight ? "text-white" : "text-[#151515]"
          }`}
          style={{ letterSpacing: "-0.01em" }}
        >
          NOMIRA
        </span>
      )}
    </div>
  );
};
