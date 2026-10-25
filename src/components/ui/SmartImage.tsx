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

  const src = customSrc || registeredImage?.src || "";
  const alt = customAlt !== undefined ? customAlt : registeredImage?.alt || "";
  const objectPosition = customPosition || registeredImage?.objectPosition || "center";
  const fallbackGradient = registeredImage?.fallback || "linear-gradient(135deg, #27272a 0%, #3f3f46 100%)";
  const width = customWidth || registeredImage?.width;
  const height = customHeight || registeredImage?.height;

  if (hasError || !src) {
    return (
      <div
        className={`relative overflow-hidden flex items-center justify-center text-white/50 ${className}`}
        style={{
          background: fallbackGradient,
          aspectRatio: aspectRatio,
        }}
        role="img"
        aria-label={alt || "Scenic travel destination"}
      >
        <div className="absolute inset-0 bg-black/10" />
        <svg
          className="w-10 h-10 text-white/30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
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
