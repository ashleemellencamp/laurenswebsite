"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type PortfolioLightboxProps = {
  images: { src: string; alt: string }[];
  activeIndex: number | null;
  galleryTitle: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

const SWIPE_THRESHOLD = 48;

function LightboxArrowButton({
  direction,
  label,
  onClick,
}: {
  direction: "prev" | "next";
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 hidden -translate-y-1/2 sm:flex ${
        direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
      aria-label={label}
    >
      <span className="flex size-11 items-center justify-center rounded-full border border-white/25 transition hover:bg-white/10">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className={`text-white ${direction === "prev" ? "rotate-180" : ""}`}
        >
          <path
            d="M5 12H19M19 12L13 6M19 12L13 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}

export function PortfolioLightbox({
  images,
  activeIndex,
  galleryTitle,
  onClose,
  onChangeIndex,
}: PortfolioLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const isOpen = activeIndex !== null;
  const currentImage = activeIndex !== null ? images[activeIndex] : null;
  const hasPrev = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < images.length - 1;
  const touchStartXRef = useRef<number | null>(null);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && hasPrev) {
        onChangeIndex(activeIndex - 1);
      } else if (event.key === "ArrowRight" && hasNext) {
        onChangeIndex(activeIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, hasNext, hasPrev, isOpen, onChangeIndex, onClose]);

  const showPrev = useCallback(() => {
    if (activeIndex !== null && hasPrev) {
      onChangeIndex(activeIndex - 1);
    }
  }, [activeIndex, hasPrev, onChangeIndex]);

  const showNext = useCallback(() => {
    if (activeIndex !== null && hasNext) {
      onChangeIndex(activeIndex + 1);
    }
  }, [activeIndex, hasNext, onChangeIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const area = imageAreaRef.current;
    if (!area) return;

    function onTouchStart(event: TouchEvent) {
      touchStartXRef.current = event.touches[0]?.clientX ?? null;
    }

    function onTouchMove(event: TouchEvent) {
      if (touchStartXRef.current === null) return;
      event.preventDefault();
    }

    function onTouchEnd(event: TouchEvent) {
      if (touchStartXRef.current === null) return;

      const endX = event.changedTouches[0]?.clientX;
      if (endX === undefined) {
        touchStartXRef.current = null;
        return;
      }

      const delta = touchStartXRef.current - endX;
      if (Math.abs(delta) >= SWIPE_THRESHOLD) {
        if (delta > 0 && hasNext) {
          showNext();
        } else if (delta < 0 && hasPrev) {
          showPrev();
        }
      }

      touchStartXRef.current = null;
    }

    area.addEventListener("touchstart", onTouchStart, { passive: true });
    area.addEventListener("touchmove", onTouchMove, { passive: false });
    area.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      area.removeEventListener("touchstart", onTouchStart);
      area.removeEventListener("touchmove", onTouchMove);
      area.removeEventListener("touchend", onTouchEnd);
    };
  }, [isOpen, hasNext, hasPrev, showNext, showPrev]);

  if (!isOpen || !currentImage || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      style={{
        paddingTop: "max(1rem, env(safe-area-inset-top))",
        paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${galleryTitle} photo viewer`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10 flex min-h-11 items-center rounded-full border border-white/20 px-5 font-serif text-xs uppercase tracking-[0.05em] text-white transition hover:bg-white/10"
        aria-label="Close photo viewer"
      >
        Close
      </button>

      {hasPrev && (
        <LightboxArrowButton direction="prev" label="Previous photo" onClick={showPrev} />
      )}

      {hasNext && (
        <LightboxArrowButton direction="next" label="Next photo" onClick={showNext} />
      )}

      <div
        ref={imageAreaRef}
        className="relative flex h-full w-full max-w-5xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[min(85dvh,900px)] w-full max-w-3xl">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
            priority
            draggable={false}
          />
        </div>

        {(hasPrev || hasNext) && (
          <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 font-sans text-[0.62rem] uppercase tracking-[0.12em] text-white/50 sm:hidden">
            Swipe to browse
          </p>
        )}
      </div>
    </div>,
    document.body,
  );
}
