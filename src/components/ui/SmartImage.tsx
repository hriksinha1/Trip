import React, { useState, useEffect } from "react";
import { images, ImageItem } from "../../data/images";

export interface SmartImageProps {
  imageId?: string;
  src?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  objectPosition?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  sizes?: string;
  srcSet?: string;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  imageId,
  src: customSrc,
  alt: customAlt,
  className = "",
  priority = false,
  fill = false,
  objectPosition: customPosition,
  width: customWidth,
  height: customHeight,
  aspectRatio,
  sizes: customSizes,
  srcSet: customSrcSet,
}) => {
  const [hasError, setHasError] = useState(false);
  const registeredImage: ImageItem | undefined = imageId ? images[imageId] : undefined;

  const src = customSrc || registeredImage?.src;
  const srcSet = customSrcSet || registeredImage?.srcSet;
  const sizes = customSizes || registeredImage?.sizes;
  const alt = customAlt !== undefined ? customAlt : registeredImage?.alt || "";
  const objectPosition = customPosition || registeredImage?.objectPosition || "center";
  const fallbackGradient =
    registeredImage?.fallback || "linear-gradient(135deg, #1b382b 0%, #29523e 50%, #182b22 100%)";
  const label = registeredImage?.label || "";
  const isMissing = !src || registeredImage?.status === "placeholder";
  const isDev = Boolean(import.meta.env?.DEV);

  const width = fill ? undefined : customWidth || registeredImage?.width;
  const height = fill ? undefined : customHeight || registeredImage?.height;

  // Reset error state when src changes
  useEffect(() => {
    setHasError(false);
  }, [src]);

  const imageState = hasError ? "error" : isMissing ? "missing" : "photo";

  // Fallback state (missing file, intentional placeholder, or load error)
  if (isMissing || hasError) {
    const layoutClasses = fill
      ? "absolute inset-0 w-full h-full"
      : "relative w-full";

    const devOutline = isDev ? "outline outline-2 outline-dashed outline-red-500/80" : "";

    return (
      <div
        data-image-key={imageId || "custom"}
        data-image-state={imageState}
        className={`${layoutClasses} overflow-hidden flex flex-col justify-end p-5 select-none ${devOutline} ${className}`}
        style={{
          background: fallbackGradient,
          aspectRatio: fill ? undefined : aspectRatio,
        }}
        role="img"
        aria-label={alt || label || "Scenic destination"}
      >
        {/* Subtle backdrop overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Fallback label */}
        <div className="relative z-10">
          {label && (
            <p className="font-display font-medium text-white/95 text-base sm:text-lg tracking-tight drop-shadow-xs">
              {label}
            </p>
          )}

          {isDev && imageId && (
            <span className="inline-block mt-1 text-[10px] uppercase font-mono tracking-wider text-white/70 bg-black/50 px-2 py-0.5 rounded-xs">
              {hasError ? "Load error" : `Missing: public/images/${imageId}.webp`}
            </span>
          )}
        </div>
      </div>
    );
  }

  // Real photo state
  const imgClasses = fill
    ? `absolute inset-0 w-full h-full object-cover ${className}`
    : `object-cover ${className}`;

  return (
    <img
      data-image-key={imageId || "custom"}
      data-image-state={imageState}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
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
        aspectRatio: fill ? undefined : aspectRatio,
      }}
      className={imgClasses}
    />
  );
};
