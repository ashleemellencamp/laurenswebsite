"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

type PortfolioLightboxProps = {
  images: { src: string; alt: string }[];
  activeIndex: number | null;
  galleryTitle: string;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

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
      className={`absolute top-1/2 z-10 -translate-y-1/2 ${
        direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4"
      }`}
      aria-label={label}
    >
      <span className="flex size-[37px] items-center justify-center rounded-full border border-white/25 transition hover:bg-white/10">
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
  const isOpen = activeIndex !== null;
  const currentImage = activeIndex !== null ? images[activeIndex] : null;
  const hasPrev = activeIndex !== null && activeIndex > 0;
  const hasNext = activeIndex !== null && activeIndex < images.length - 1;

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

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${galleryTitle} photo viewer`}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full border border-white/20 px-4 py-2 font-serif text-xs uppercase tracking-[0.05em] text-white transition hover:bg-white/10"
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
        className="relative flex h-full w-full max-w-5xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-[min(85vh,900px)] w-full max-w-3xl">
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
