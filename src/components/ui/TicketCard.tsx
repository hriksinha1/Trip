import React from "react";

interface TicketCardProps {
  value: string;
  caption: string;
  className?: string;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  value,
  caption,
  className = "",
}) => {
  return (
    <div
      className={`ticket-card relative flex flex-col w-full max-w-[380px] md:max-w-none mx-auto h-full select-none filter drop-shadow-lg ${className}`}
      style={
        {
          "--nr": "14px",
          "--notch-y": "150px",
          WebkitMaskImage: `
            radial-gradient(circle var(--nr) at 0 var(--notch-y), transparent calc(var(--nr) - 0.5px), black var(--nr)),
            radial-gradient(circle var(--nr) at 100% var(--notch-y), transparent calc(var(--nr) - 0.5px), black var(--nr)),
            radial-gradient(circle 6px at 12px 100%, transparent 5.5px, black 6px)
          `,
          WebkitMaskSize: "100% 100%, 100% 100%, 24px 100%",
          WebkitMaskRepeat: "no-repeat, no-repeat, repeat-x",
          WebkitMaskComposite: "source-in",
          maskImage: `
            radial-gradient(circle var(--nr) at 0 var(--notch-y), transparent calc(var(--nr) - 0.5px), black var(--nr)),
            radial-gradient(circle var(--nr) at 100% var(--notch-y), transparent calc(var(--nr) - 0.5px), black var(--nr)),
            radial-gradient(circle 6px at 12px 100%, transparent 5.5px, black 6px)
          `,
          maskSize: "100% 100%, 100% 100%, 24px 100%",
          maskRepeat: "no-repeat, no-repeat, repeat-x",
          maskComposite: "intersect",
        } as React.CSSProperties
      }
    >
      {/* Top half: Clean White with Big Number */}
      <div className="relative bg-white h-[150px] shrink-0 pt-7 pb-5 px-6 sm:px-8 rounded-t-[20px] text-center flex flex-col items-center justify-center">
        <span className="font-display text-5xl sm:text-6xl font-semibold tracking-tight text-[#151515] tabular-nums">
          {value}
        </span>
      </div>

      {/* Dashed Perforation Line at Notch Center */}
      <div
        className="relative w-full bg-[#F3F2EE] px-5 py-0 overflow-visible"
        aria-hidden="true"
      >
        <div className="w-full border-t border-dashed border-neutral-300 -translate-y-px" />
      </div>

      {/* Bottom half: Warm Neutral #F3F2EE with Service Caption */}
      <div className="relative bg-[#F3F2EE] flex-1 px-6 sm:px-8 pt-5 pb-8 flex items-center justify-center text-center">
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-sans font-normal">
          {caption}
        </p>
      </div>
    </div>
  );
};
