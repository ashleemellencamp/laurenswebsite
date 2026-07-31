"use client";

import { useEffect, useRef, useState } from "react";

const WHEEL_SCROLL_RATIO = 0.85;
const WHEEL_DELTA_CAP = 72;
const START_SNAP_THRESHOLD = 1.5;
const EDGE_TOLERANCE = 0.5;

export type PortfolioGalleryScrollPhase =
  | "idle"
  | "browsing"
  | "at-start"
  | "at-end";

export function usePortfolioGalleryScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const galleryUnitRef = useRef<HTMLDivElement>(null);
  const isGalleryHoveredRef = useRef(false);
  const leaveInteractionRef = useRef<() => void>(() => {});
  const canWheelScrollRef = useRef(true);

  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [phase, setPhase] = useState<PortfolioGalleryScrollPhase>("idle");
  const [canWheelScroll, setCanWheelScroll] = useState(true);
  const [scrollEdges, setScrollEdges] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const container = scrollRef.current;
    const track = trackRef.current;
    const galleryUnit = galleryUnitRef.current;
    if (!container || !track || !galleryUnit) return;

    const reducedMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const coarsePointerMedia = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    );

    const syncInteractionMode = () => {
      const enabled =
        !reducedMotionMedia.matches && !coarsePointerMedia.matches;
      canWheelScrollRef.current = enabled;
      setCanWheelScroll(enabled);
    };

    syncInteractionMode();
    reducedMotionMedia.addEventListener("change", syncInteractionMode);
    coarsePointerMedia.addEventListener("change", syncInteractionMode);

    const getMaxScroll = () =>
      Math.max(0, container.scrollWidth - container.clientWidth);

    const getPhase = (): PortfolioGalleryScrollPhase => {
      const maxScroll = getMaxScroll();

      if (maxScroll <= EDGE_TOLERANCE) {
        return isGalleryHoveredRef.current ? "at-start" : "idle";
      }

      const scrollLeft = container.scrollLeft;
      const atStart = scrollLeft <= EDGE_TOLERANCE;
      const atEnd = scrollLeft >= maxScroll - EDGE_TOLERANCE;

      if (!isGalleryHoveredRef.current) return "idle";
      if (atStart && atEnd) return "at-start";
      if (atEnd) return "at-end";
      if (atStart) return "at-start";
      return "browsing";
    };

    const updatePhaseFromScroll = () => {
      const maxScroll = getMaxScroll();
      const scrollLeft = container.scrollLeft;

      setScrollEdges({
        atStart: scrollLeft <= EDGE_TOLERANCE,
        atEnd:
          maxScroll <= EDGE_TOLERANCE ||
          scrollLeft >= maxScroll - EDGE_TOLERANCE,
      });
      setPhase(getPhase());
    };

    const softSnapToStart = () => {
      if (container.scrollLeft <= START_SNAP_THRESHOLD) {
        container.scrollLeft = 0;
      }
    };

    const isPointerOverTrack = (event: WheelEvent) => {
      const node = event.target;
      if (!(node instanceof Node)) return false;
      return track.contains(node);
    };

    const normalizeWheelDelta = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        return event.deltaY * 16;
      }

      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        return event.deltaY * container.clientWidth;
      }

      return event.deltaY;
    };

    const cappedWheelDelta = (event: WheelEvent) => {
      const delta = normalizeWheelDelta(event) * WHEEL_SCROLL_RATIO;
      return Math.sign(delta) * Math.min(Math.abs(delta), WHEEL_DELTA_CAP);
    };

    const handleWheel = (event: WheelEvent) => {
      if (!canWheelScrollRef.current || !isPointerOverTrack(event)) return;

      const { deltaX, deltaY } = event;

      if (Math.abs(deltaY) < 0.5 && Math.abs(deltaX) > Math.abs(deltaY)) {
        return;
      }

      const maxScroll = getMaxScroll();
      if (maxScroll <= EDGE_TOLERANCE) return;

      const delta = cappedWheelDelta(event);
      if (delta === 0) return;

      const current = container.scrollLeft;
      const intended = current + delta;
      const next = Math.max(0, Math.min(intended, maxScroll));
      const horizontalDelta = next - current;
      const overflow = intended - next;

      const scrollingForward = delta > 0;
      const atStart = current <= EDGE_TOLERANCE;
      const atEnd = current >= maxScroll - EDGE_TOLERANCE;

      if (scrollingForward && atEnd) {
        updatePhaseFromScroll();
        return;
      }

      if (!scrollingForward && atStart) {
        updatePhaseFromScroll();
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (horizontalDelta !== 0) {
        container.scrollLeft = next;
      }

      if (Math.abs(overflow) > EDGE_TOLERANCE) {
        window.scrollBy({ top: overflow, behavior: "auto" });
      }

      updatePhaseFromScroll();
    };

    const handleScroll = () => {
      updatePhaseFromScroll();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryHoveredRef.current) return;

      const maxScroll = getMaxScroll();
      if (maxScroll <= EDGE_TOLERANCE) return;

      const step = Math.min(container.clientWidth * 0.65, 420);

      if (event.key === "ArrowRight") {
        event.preventDefault();
        container.scrollLeft = Math.min(container.scrollLeft + step, maxScroll);
        updatePhaseFromScroll();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        container.scrollLeft = Math.max(container.scrollLeft - step, 0);
        updatePhaseFromScroll();
      }
    };

    leaveInteractionRef.current = () => {
      softSnapToStart();
      updatePhaseFromScroll();
    };

    updatePhaseFromScroll();

    container.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    container.addEventListener("scroll", handleScroll, { passive: true });
    galleryUnit.addEventListener("keydown", handleKeyDown);

    const resizeObserver = new ResizeObserver(updatePhaseFromScroll);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("wheel", handleWheel, { capture: true });
      container.removeEventListener("scroll", handleScroll);
      galleryUnit.removeEventListener("keydown", handleKeyDown);
      resizeObserver.disconnect();
      reducedMotionMedia.removeEventListener("change", syncInteractionMode);
      coarsePointerMedia.removeEventListener("change", syncInteractionMode);
    };
  }, []);

  function setGalleryHovered(next: boolean) {
    isGalleryHoveredRef.current = next;
    setIsGalleryHovered(next);

    if (!next) {
      leaveInteractionRef.current();
      return;
    }

    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;

      const maxScroll = Math.max(
        0,
        container.scrollWidth - container.clientWidth,
      );
      const scrollLeft = container.scrollLeft;
      const atEnd = scrollLeft >= maxScroll - EDGE_TOLERANCE;
      const atStart = scrollLeft <= EDGE_TOLERANCE;

      setPhase(
        atEnd && !atStart ? "at-end" : atStart ? "at-start" : "browsing",
      );
    });
  }

  const galleryUnitHandlers = {
    onMouseEnter: () => setGalleryHovered(true),
    onMouseLeave: () => setGalleryHovered(false),
    onFocus: () => setGalleryHovered(true),
    onBlur: () => setGalleryHovered(false),
  };

  return {
    scrollRef,
    trackRef,
    galleryUnitRef,
    isGalleryHovered,
    isAtStart: scrollEdges.atStart,
    isAtEnd: scrollEdges.atEnd,
    phase,
    canWheelScroll,
    isGalleryScrollActive: canWheelScroll && isGalleryHovered,
    galleryUnitHandlers,
  };
}

export function getPortfolioGalleryScrollHint({
  canWheelScroll,
  isHovered,
  phase,
}: {
  canWheelScroll: boolean;
  isHovered: boolean;
  phase: PortfolioGalleryScrollPhase;
}) {
  if (!canWheelScroll) {
    return "Swipe to browse";
  }

  if (!isHovered) {
    return "Hover gallery to explore";
  }

  if (phase === "at-end") {
    return "Keep scrolling for more";
  }

  return "Scroll gallery to explore";
}
