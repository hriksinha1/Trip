import React from "react";

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  active,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 whitespace-nowrap shrink-0 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#151515] focus-visible:ring-offset-1 ${
        active
          ? "bg-[#151515] text-white shadow-xs"
          : "bg-white border border-[#E8E6E0] text-[#151515] hover:border-neutral-400 hover:bg-[#F9F8F5]"
      } ${className}`}
    >
      {label}
    </button>
  );
};
