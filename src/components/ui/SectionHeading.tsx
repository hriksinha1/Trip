import React from "react";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  id,
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className = "",
}) => {
  const isDark = theme === "dark";
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`text-xs sm:text-sm font-medium tracking-[0.14em] uppercase mb-2 font-sans ${isDark ? "text-neutral-300" : "text-neutral-500"}`}>
          {eyebrow}
        </span>
      )}
      <h2
        id={id}
        className={`font-display text-[clamp(2rem,1.1rem+2.2vw,3rem)] font-medium tracking-tight leading-[1.08] ${isDark ? "text-white" : "text-[#151515]"}`}
        style={{ textWrap: "balance" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-[15px] sm:text-base leading-relaxed font-sans max-w-[56ch] ${isDark ? "text-neutral-300" : "text-neutral-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
