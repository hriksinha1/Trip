import React, { useState } from "react";
import { images, ImageItem } from "../../data/images";

interface SmartImageProps {
  imageId?: string;
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  imageId,
  src: customSrc,
  alt: customAlt,
  className = "",
  priority = false,
  objectPosition: customPosition,
  width: customWidth,
  height: customHeight,
  aspectRatio,
}) => {
  const [hasError, setHasError] = useState(false);
  const registeredImage: ImageItem | undefined = imageId ? images[imageId] : undefined;

  const src = customSrc || registeredImage?.src;
  const alt = customAlt !== undefined ? customAlt : registeredImage?.alt || "";
  const objectPosition = customPosition || registeredImage?.objectPosition || "center";
  const fallbackGradient =
    registeredImage?.fallback || "linear-gradient(135deg, #1b382b 0%, #29523e 50%, #182b22 100%)";
  const label = registeredImage?.label || "";
  const isPlaceholder = registeredImage?.status === "placeholder" || !src;
  const isDev = Boolean(import.meta.env?.DEV);

  const width = customWidth || registeredImage?.width;
  const height = customHeight || registeredImage?.height;

  // Typographic Card for placeholders or error states (intentional styling)
  if (isPlaceholder || hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden flex flex-col justify-end p-5 select-none ${className}`}
        style={{
          background: fallbackGradient,
          aspectRatio: aspectRatio,
        }}
        role="img"
        aria-label={alt || label || "Scenic destination"}
      >
        {/* Subtle texture wash */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

        {/* Typographic Label */}
        <div className="relative z-10">
          {label && (
            <p className="font-display font-medium text-white/95 text-base sm:text-lg tracking-tight drop-shadow-xs">
              {label}
            </p>
          )}

          {/* Dev-only helper informing where the owner can drop verified assets */}
          {isDev && imageId && (
            <span className="inline-block mt-1 text-[10px] uppercase font-mono tracking-wider text-white/60 bg-black/40 px-2 py-0.5 rounded-xs">
              Needs: public/images/{imageId}.webp
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={{
        objectPosition,
        aspectRatio: aspectRatio,
      }}
      className={`object-cover ${className}`}
    />
  );
};
