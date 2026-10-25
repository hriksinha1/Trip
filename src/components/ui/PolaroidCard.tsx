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
    <article className={`group relative min-w-0 bg-white p-2.5 sm:p-3 pb-5 sm:pb-6 rounded-md transition-transform duration-300 ease-out shadow-polaroid border border-neutral-100/80 ${rotationDesktop} ${offsetDesktop} ${className}`}>
      <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xs bg-neutral-100">
        <SmartImage imageId={imageId} fill className="object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
      </div>
      <div className="pt-3.5 sm:pt-4 px-1 text-left">
        <h3 className="font-display text-[15px] sm:text-base font-semibold text-[#151515] tracking-tight leading-snug line-clamp-2">
          {place}
        </h3>
        <p className="mt-1.5 text-[13px] text-neutral-600 leading-relaxed font-sans line-clamp-3">
          {caption}
        </p>
      </div>
    </article>
  );
};
