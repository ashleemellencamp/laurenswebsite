import type { CSSProperties } from "react";

type HoverWheelSequenceControlsProps = {
  itemCount: number;
  activeIndex: number;
  isHovered: boolean;
  activeDotStyle?: CSSProperties;
  activeDotClassName?: string;
  inactiveDotClassName?: string;
  scrollHint?: string;
};

export function HoverWheelSequenceControls({
  itemCount,
  activeIndex,
  isHovered,
  activeDotStyle,
  activeDotClassName = "size-1.5 w-5 bg-slate",
  inactiveDotClassName = "size-1.5 bg-slate/20",
  scrollHint = "Scroll to explore",
}: HoverWheelSequenceControlsProps) {
  return (
    <div className="mt-3 flex items-center justify-between gap-4 lg:mt-4">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: itemCount }, (_, index) => (
          <span
            key={`hover-wheel-dot-${index}`}
            aria-hidden
            className={`rounded-full transition-all duration-300 ${
              index === activeIndex ? activeDotClassName : inactiveDotClassName
            }`}
            style={index === activeIndex ? activeDotStyle : undefined}
          />
        ))}
      </div>
      <p
        className={`font-sans text-[0.62rem] uppercase tracking-[0.12em] text-body/60 transition-opacity duration-300 ${
          isHovered && activeIndex < itemCount - 1
            ? "opacity-100"
            : isHovered
              ? "opacity-60"
              : "opacity-100"
        }`}
      >
        {isHovered ? scrollHint : "Hover to explore"}
      </p>
    </div>
  );
}
