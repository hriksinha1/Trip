import React from "react";

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({ label, active, onClick, className = "" }) => (
  <button
    type="button"
    aria-pressed={active}
    onClick={onClick}
    className={`inline-flex h-11 shrink-0 cursor-pointer select-none items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-2 ${active ? "bg-[#151515] text-white shadow-xs" : "border border-[#DAD7CF] bg-white text-[#151515] hover:border-neutral-400 hover:bg-[#F3F2EE]"} ${className}`}
  >
    {label}
  </button>
);
