"use client";

import { StylePaletteCard } from "@/components/experience/StylePaletteCard";
import { HoverWheelSequenceControls } from "@/components/ui/HoverWheelSequenceControls";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { useHoverWheelSequence } from "@/hooks/useHoverWheelSequence";
import { experienceStyleContent, experienceStyleMediaClassName } from "@/lib/experience-style-content";
import { stylePaletteSwatches } from "@/lib/style-palette";
import { sectionBodyClassName, sectionHeadlineClassName } from "@/lib/typography";

function StyleIntroText({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="relative z-0 text-center lg:text-left">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className={sectionHeadlineClassName}>{heading}</h2>
      <p className={sectionBodyClassName}>{body}</p>
    </div>
  );
}

export function StylePaletteScrollSection() {
  const swatchCount = stylePaletteSwatches.length;
  const { eyebrow, heading, body } = experienceStyleContent.styleColor;
  const {
    containerRef,
    activeIndex,
    isHovered,
    isTouchDevice,
    useInteractiveSequence,
    hoverHandlers,
    goToIndex,
  } = useHoverWheelSequence(swatchCount);

  if (!useInteractiveSequence) {
    return (
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <StyleIntroText eyebrow={eyebrow} heading={heading} body={body} />
        <div className={`flex w-full flex-col gap-3 ${experienceStyleMediaClassName}`}>
          {stylePaletteSwatches.map((swatch) => (
            <StylePaletteCard key={swatch.src} swatch={swatch} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <StyleIntroText eyebrow={eyebrow} heading={heading} body={body} />

      <div
        ref={containerRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Portfolio color palette. Swipe or tap dots to explore each swatch."
        className={`${experienceStyleMediaClassName} outline-none lg:justify-self-end ${
          isHovered ? "cursor-ns-resize" : ""
        }`}
        {...hoverHandlers}
      >
        <div
          className={`relative w-full overflow-hidden rounded-2xl transition-shadow duration-300 ${
            isHovered ? "shadow-[0_12px_32px_rgba(66,88,110,0.14)]" : ""
          }`}
          style={{ aspectRatio: "1 / 1.417" }}
        >
          {stylePaletteSwatches.map((swatch, index) => (
            <div
              key={swatch.src}
              className="absolute inset-0 transition-transform duration-[520ms] ease-[cubic-bezier(0.33,1,0.38,1)]"
              style={{
                transform: `translateY(${(index - activeIndex) * 100}%)`,
              }}
              aria-hidden={index !== activeIndex}
            >
              <StylePaletteCard swatch={swatch} />
            </div>
          ))}
        </div>

        <HoverWheelSequenceControls
          itemCount={swatchCount}
          activeIndex={activeIndex}
          isHovered={isHovered}
          isTouchDevice={isTouchDevice}
          onDotSelect={goToIndex}
          scrollHint="Scroll palette to explore"
        />
      </div>
    </div>
  );
}
