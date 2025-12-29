"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: string[];
  title?: string;
  description?: string;
  className?: string;
};

export function ImageGallery({
  images,
  title,
  description,
  className,
}: ImageGalleryProps) {
  if (!images.length) return null;

  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeAspect, setActiveAspect] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(
    null
  );
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSlideDirection(null);
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        setSlideDirection("next");
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setSlideDirection("prev");
        setActiveIndex((current) =>
          current === null
            ? current
            : (current - 1 + images.length) % images.length
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, images.length]);

  const hasHeader = Boolean(title || description);
  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const swipeThreshold = 50;
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    if (Math.abs(deltaX) < swipeThreshold || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      setSlideDirection("next");
      setActiveIndex((current) =>
        current === null ? current : (current + 1) % images.length
      );
      return;
    }

    setSlideDirection("prev");
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (activeIndex === null || !activeImage) {
      setActiveAspect(null);
      return;
    }

    let cancelled = false;
    const img = new window.Image();
    img.src = activeImage;
    img.onload = () => {
      if (!cancelled && img.naturalHeight > 0) {
        setActiveAspect(img.naturalWidth / img.naturalHeight);
      }
    };

    return () => {
      cancelled = true;
    };
  }, [activeIndex, activeImage]);

  useEffect(() => {
    if (!slideDirection) return;
    const timeoutId = window.setTimeout(() => {
      setSlideDirection(null);
    }, 240);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [slideDirection]);

  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start py-6",
        className
      )}
    >
      <style>{`
        @media (max-width: 639px) {
          .image-gallery-track {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }

          .image-gallery-item {
            flex: 0 0 auto;
          }
        }

        @keyframes image-gallery-slide-left {
          from {
            opacity: 0;
            transform: translateX(16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes image-gallery-slide-right {
          from {
            opacity: 0;
            transform: translateX(-16px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .image-gallery-slide-left {
          animation: image-gallery-slide-left 240ms ease-out;
        }

        .image-gallery-slide-right {
          animation: image-gallery-slide-right 240ms ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .image-gallery-slide-left,
          .image-gallery-slide-right {
            animation: none;
          }
        }
      `}</style>
      {hasHeader ? (
        <div className="max-w-3xl text-center px-4">
          {title ? <h2 className="text-3xl font-semibold">{title}</h2> : null}
          {description ? (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          "image-gallery-track flex items-center gap-2 w-full max-w-screen-2x1 px-4",
          "h-[400px] sm:h-[420px] lg:h-[480px]",
          hasHeader ? "mt-8" : "mt-4"
        )}
      >
        {images.map((src, idx) => (
          <button
            key={`${src}-${idx}`}
            className={cn(
              "image-gallery-item relative group flex-grow w-50 sm:w-48 lg:w-64 rounded-lg overflow-hidden h-full shadow-lg hover:shadow-2xl hover:w-xs",
              "cursor-pointer border-0 bg-transparent p-0 text-left",
              isMounted ? "transition-all duration-500" : "transition-none"
            )}
            type="button"
            onClick={() => {
              setSlideDirection(null);
              setActiveIndex(idx);
            }}
            aria-label={`Open image ${idx + 1} of ${images.length}`}
          >
            <Image
              className="h-full w-full object-cover object-center"
              src={src}
              alt={`gallery-image-${idx + 1}`}
              fill
              sizes="(min-width: 1280px) 320px, (min-width: 1024px) 280px, 50vw"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && activeImage ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative inline-flex h-[70vh] max-w-[90vw] sm:h-[80vh]"
            style={activeAspect ? { aspectRatio: activeAspect } : undefined}
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <Image
              className={cn(
                "object-contain",
                slideDirection === "next"
                  ? "image-gallery-slide-left"
                  : slideDirection === "prev"
                    ? "image-gallery-slide-right"
                    : ""
              )}
              src={activeImage}
              alt={`gallery-image-${activeIndex + 1}`}
              fill
              quality={100}
              sizes="(min-width: 1024px) 80vw, 100vw"
            />
            <button
              type="button"
              className="absolute left-[-5] top-1/2 -translate-x-full -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-lg font-semibold text-white/90 shadow-sm transition hover:bg-black/50"
              onClick={() =>
                setActiveIndex((current) => {
                  setSlideDirection("prev");
                  return current === null
                    ? current
                    : (current - 1 + images.length) % images.length;
                })
              }
              aria-label="Previous image"
            >
              {"<"}
            </button>
            <button
              type="button"
              className="absolute right-[-5] top-1/2 translate-x-full -translate-y-1/2 rounded-full bg-black/30 px-3 py-2 text-lg font-semibold text-white/90 shadow-sm transition hover:bg-black/50"
              onClick={() =>
                setActiveIndex((current) => {
                  setSlideDirection("next");
                  return current === null
                    ? current
                    : (current + 1) % images.length;
                })
              }
              aria-label="Next image"
            >
              {">"}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
