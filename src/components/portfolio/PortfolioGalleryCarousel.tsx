"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { PortfolioGallery } from "@/lib/portfolio-galleries";
import { sectionPaddingX } from "@/lib/section-padding";

import { PortfolioLightbox } from "./PortfolioLightbox";

type PortfolioGalleryCarouselProps = {
  gallery: PortfolioGallery;
  accentColor?: string;
};

const portraitFrameClass = "aspect-[2/3] w-[min(391px,70vw)]";
const WHEEL_SCROLL_SPEED = 0.38;
const WHEEL_DELTA_CAP = 48;
const SCROLL_EASE = 0.07;

export function PortfolioGalleryCarousel({
  gallery,
  accentColor,
}: PortfolioGalleryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let targetScroll = container.scrollLeft;
    let rafId: number | null = null;
    let lastFrameTime = 0;

    const getMaxScroll = () => container.scrollWidth - container.clientWidth;

    const clampScroll = (value: number) => {
      const maxScroll = getMaxScroll();
      return Math.max(0, Math.min(value, maxScroll));
    };

    const animate = (timestamp: number) => {
      if (lastFrameTime === 0) {
        lastFrameTime = timestamp;
      }

      const frameDelta = Math.min((timestamp - lastFrameTime) / 16.67, 2);
      lastFrameTime = timestamp;

      targetScroll = clampScroll(targetScroll);

      const distance = targetScroll - container.scrollLeft;

      if (Math.abs(distance) < 0.5) {
        container.scrollLeft = targetScroll;
        rafId = null;
        lastFrameTime = 0;
        return;
      }

      const ease = 1 - (1 - SCROLL_EASE) ** frameDelta;
      container.scrollLeft += distance * ease;
      rafId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
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
      const delta = normalizeWheelDelta(event) * WHEEL_SCROLL_SPEED;
      return Math.sign(delta) * Math.min(Math.abs(delta), WHEEL_DELTA_CAP);
    };

    const handleWheel = (event: WheelEvent) => {
      const { deltaX, deltaY } = event;

      if (Math.abs(deltaX) > Math.abs(deltaY)) return;

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      if (rafId === null) {
        targetScroll = container.scrollLeft;
      }

      const scrollingForward = deltaY > 0;
      const atStart = targetScroll <= 0 && container.scrollLeft <= 0;
      const atEnd =
        targetScroll >= maxScroll - 1 && container.scrollLeft >= maxScroll - 1;

      if ((scrollingForward && atEnd) || (!scrollingForward && atStart)) {
        return;
      }

      event.preventDefault();

      targetScroll += cappedWheelDelta(event);
      startAnimation();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const lightboxImages = gallery.images.flatMap((image) =>
    image.src ? [{ src: image.src, alt: image.alt ?? "" }] : [],
  );

  const openLightbox = (index: number) => {
    const image = gallery.images[index];
    if (!image?.src) return;

    const lightboxIndex = lightboxImages.findIndex(
      (item) => item.src === image.src,
    );

    if (lightboxIndex >= 0) {
      setActiveIndex(lightboxIndex);
    }
  };

  return (
    <>
      <div className={sectionPaddingX}>
        <div
          ref={scrollRef}
          role="region"
          aria-label={`${gallery.title} photo gallery`}
          className="gallery-scroll gallery-scroll-themed mt-10 overflow-x-auto overscroll-x-contain pb-3 lg:mt-12 lg:pb-4"
          style={
            accentColor
              ? ({ "--gallery-scrollbar": accentColor } as React.CSSProperties)
              : undefined
          }
        >
          <div className="flex w-max flex-nowrap gap-4 lg:gap-6">
            {gallery.images.map((image, index) => (
              <div
                key={image.id}
                className={`relative shrink-0 overflow-hidden rounded-2xl ${image.aspectClass ?? portraitFrameClass}`}
              >
                {image.src ? (
                  <button
                    type="button"
                    onClick={() => openLightbox(index)}
                    className="relative size-full cursor-zoom-in appearance-none border-0 bg-transparent p-0"
                    aria-label={`View larger: ${image.alt ?? gallery.title}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt ?? ""}
                      fill
                      draggable={false}
                      sizes="(max-width: 640px) 70vw, 391px"
                      className="pointer-events-none select-none object-cover"
                    />
                  </button>
                ) : (
                  <div aria-hidden className={`size-full ${image.tone ?? "bg-slate/70"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <PortfolioLightbox
        images={lightboxImages}
        activeIndex={activeIndex}
        galleryTitle={gallery.title}
        onClose={() => setActiveIndex(null)}
        onChangeIndex={setActiveIndex}
      />
    </>
  );
}
