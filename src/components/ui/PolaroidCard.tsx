import React from "react";
import { SmartImage } from "./SmartImage";

interface PolaroidCardProps {
  place: string;
  caption: string;
  imageId: string;
  rotationDesktop?: string;
  offsetDesktop?: string;
  className?: string;
}

export const PolaroidCard: React.FC<PolaroidCardProps> = ({
  place,
  caption,
  imageId,
  rotationDesktop = "",
  offsetDesktop = "",
  className = "",
}) => {
  return (
    <div
      className={`group relative bg-white p-2.5 sm:p-3 pb-5 sm:pb-6 rounded-md transition-all duration-300 ease-out shadow-polaroid hover:shadow-xl hover:-translate-y-2 hover:rotate-0 hover:z-20 cursor-default select-none border border-neutral-100/80 ${rotationDesktop} ${offsetDesktop} ${className}`}
    >
      {/* Photo Frame (4:5 aspect ratio) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-neutral-100">
        <SmartImage
          imageId={imageId}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Caption Area (Editorial, no quotation marks) */}
      <div className="pt-3.5 sm:pt-4 px-1 text-left">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h3 className="font-display text-sm sm:text-base font-semibold text-[#151515] tracking-tight truncate">
            {place}
          </h3>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider shrink-0">
            Inspiration
          </span>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed font-sans line-clamp-3">
          {caption}
        </p>
      </div>
    </div>
  );
};
