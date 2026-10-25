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
      className={`relative flex flex-col w-full max-w-[360px] mx-auto filter drop-shadow-md select-none ${className}`}
    >
      {/* Top half: Clean White with Big Number */}
      <div className="relative bg-white pt-8 pb-7 px-6 sm:px-8 rounded-t-[18px] text-center flex items-center justify-center min-h-[140px] sm:min-h-[160px]">
        <div className="font-display text-5xl sm:text-6xl font-medium tracking-tight text-[#151515] tabular-nums">
          {value}
        </div>
      </div>

      {/* Middle Divider with Left & Right Notches */}
      <div className="relative w-full h-7 bg-white flex items-center overflow-visible">
        {/* Left circular notch cut-out into the ticket */}
        <div
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0d5059] shadow-inner"
          aria-hidden="true"
        />

        {/* Dashed divider line spanning between the notches */}
        <div
          className="w-full mx-5 border-t border-dashed border-neutral-300"
          aria-hidden="true"
        />

        {/* Right circular notch cut-out into the ticket */}
        <div
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0d5059] shadow-inner"
          aria-hidden="true"
        />
      </div>

      {/* Bottom half: Tinted with Caption */}
      <div className="relative bg-[#F3F2EE] pt-5 pb-6 px-6 sm:px-8 text-center flex-1 flex items-center justify-center">
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans font-normal">
          {caption}
        </p>
      </div>

      {/* Scalloped Bottom Edge (perforated ticket cutouts) */}
      <div className="w-full h-3 overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 360 12"
          preserveAspectRatio="none"
          className="w-full h-full fill-[#F3F2EE]"
        >
          <path d="M0,0 L360,0 L360,6 Q350,12 340,6 Q330,12 320,6 Q310,12 300,6 Q290,12 280,6 Q270,12 260,6 Q250,12 240,6 Q230,12 220,6 Q210,12 200,6 Q190,12 180,6 Q170,12 160,6 Q150,12 140,6 Q130,12 120,6 Q110,12 100,6 Q90,12 80,6 Q70,12 60,6 Q50,12 40,6 Q30,12 20,6 Q10,12 0,6 Z" />
        </svg>
      </div>
    </div>
  );
};
