"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const EDGE_TOLERANCE = 0.5;
const SCROLL_STEP_MAX = 420;

export function usePortfolioGalleryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const galleryUnitRef = useRef<HTMLDivElement>(null);
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [scrollEdges, setScrollEdges] = useState({ atStart: true, atEnd: false });
  const [canScroll, setCanScroll] = useState(false);

  const updateScrollEdges = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    const scrollLeft = container.scrollLeft;

    setCanScroll(maxScroll > EDGE_TOLERANCE);
    setScrollEdges({
      atStart: scrollLeft <= EDGE_TOLERANCE,
      atEnd:
        maxScroll <= EDGE_TOLERANCE ||
        scrollLeft >= maxScroll - EDGE_TOLERANCE,
    });
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollEdges();
    container.addEventListener("scroll", updateScrollEdges, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollEdges);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollEdges);
      resizeObserver.disconnect();
    };
  }, [updateScrollEdges]);

  const scrollGallery = useCallback((direction: "prev" | "next") => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
    if (maxScroll <= EDGE_TOLERANCE) return;

    const step = Math.min(container.clientWidth * 0.65, SCROLL_STEP_MAX);
    const nextLeft =
      direction === "next"
        ? Math.min(container.scrollLeft + step, maxScroll)
        : Math.max(container.scrollLeft - step, 0);

    container.scrollTo({ left: nextLeft, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const galleryUnit = galleryUnitRef.current;
    const container = scrollRef.current;
    if (!galleryUnit || !container) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryHovered) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollGallery("next");
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollGallery("prev");
      }
    };

    galleryUnit.addEventListener("keydown", handleKeyDown);
    return () => galleryUnit.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryHovered, scrollGallery]);

  const galleryUnitHandlers = {
    onMouseEnter: () => setIsGalleryHovered(true),
    onMouseLeave: () => setIsGalleryHovered(false),
    onFocus: () => setIsGalleryHovered(true),
    onBlur: () => setIsGalleryHovered(false),
  };

  return {
    scrollRef,
    galleryUnitRef,
    isGalleryHovered,
    isAtStart: scrollEdges.atStart,
    isAtEnd: scrollEdges.atEnd,
    canScroll,
    scrollGallery,
    galleryUnitHandlers,
  };
}

export function getPortfolioGalleryScrollHint({
  isHovered,
  canScroll,
  isTouchDevice,
}: {
  isHovered: boolean;
  canScroll: boolean;
  isTouchDevice: boolean;
}) {
  if (!canScroll) {
    return "Tap a photo to view larger";
  }

  if (isTouchDevice) {
    return "Swipe or use arrows to browse";
  }

  if (!isHovered) {
    return "Hover gallery to explore";
  }

  return "Use arrows to browse";
}
