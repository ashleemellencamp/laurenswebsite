"use client";

import { useEffect, useRef, useState } from "react";

/** Wheel delta needed before advancing one item. */
const WHEEL_STEP_THRESHOLD = 48;

/** Minimum time each item stays visible before advancing. */
const MIN_ITEM_DWELL_MS = 320;

export function useHoverWheelSequence(itemCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);
  const lastStepAtRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [useInteractiveSequence, setUseInteractiveSequence] = useState(true);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(itemCount - 1, 0)));
  }, [itemCount]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setUseInteractiveSequence(!prefersReduced && itemCount > 1);
  }, [itemCount]);

  useEffect(() => {
    if (!useInteractiveSequence) return;

    const container = containerRef.current;
    if (!container) return;

    function stepIndex(direction: 1 | -1) {
      const now = performance.now();
      if (now - lastStepAtRef.current < MIN_ITEM_DWELL_MS) return;

      const current = activeIndexRef.current;
      const next = Math.min(Math.max(current + direction, 0), itemCount - 1);
      if (next === current) return;

      lastStepAtRef.current = now;
      activeIndexRef.current = next;
      setActiveIndex(next);
    }

    function onWheel(event: WheelEvent) {
      if (!isHoveredRef.current) return;

      event.preventDefault();
      wheelAccumulatorRef.current += event.deltaY;

      if (Math.abs(wheelAccumulatorRef.current) < WHEEL_STEP_THRESHOLD) return;

      stepIndex(wheelAccumulatorRef.current > 0 ? 1 : -1);
      wheelAccumulatorRef.current = 0;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        stepIndex(1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        stepIndex(-1);
      }
    }

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("keydown", onKeyDown);
    };
  }, [useInteractiveSequence, itemCount]);

  function setHovered(next: boolean) {
    isHoveredRef.current = next;
    if (!next) {
      wheelAccumulatorRef.current = 0;
    }
    setIsHovered(next);
  }

  const hoverHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  return {
    containerRef,
    activeIndex,
    isHovered,
    useInteractiveSequence,
    hoverHandlers,
  };
}
