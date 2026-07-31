import type { CSSProperties } from "react";

type HoverWheelSequenceControlsProps = {
  itemCount: number;
  activeIndex: number;
  isHovered: boolean;
  isTouchDevice?: boolean;
  onDotSelect?: (index: number) => void;
  activeDotStyle?: CSSProperties;
  activeDotClassName?: string;
  inactiveDotClassName?: string;
  scrollHint?: string;
};

export function HoverWheelSequenceControls({
  itemCount,
  activeIndex,
  isHovered,
  isTouchDevice = false,
  onDotSelect,
  activeDotStyle,
  activeDotClassName = "size-1.5 w-5 bg-slate",
  inactiveDotClassName = "size-1.5 bg-slate/20",
  scrollHint = "Scroll to explore",
}: HoverWheelSequenceControlsProps) {
  const idleHint = isTouchDevice ? "Swipe to explore" : "Hover to explore";
  const activeHint = isTouchDevice ? "Swipe for more" : scrollHint;

  return (
    <div className="mt-3 flex items-center justify-between gap-4 lg:mt-4">
      <div className="flex items-center gap-2">
        {Array.from({ length: itemCount }, (_, index) => {
          const isActive = index === activeIndex;

          if (isTouchDevice && onDotSelect) {
            return (
              <button
                key={`hover-wheel-dot-${index}`}
                type="button"
                aria-label={`View swatch ${index + 1} of ${itemCount}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => onDotSelect(index)}
                className="flex size-11 items-center justify-center"
              >
                <span
                  aria-hidden
                  className={`rounded-full transition-all duration-300 ${
                    isActive ? activeDotClassName : inactiveDotClassName
                  }`}
                  style={isActive ? activeDotStyle : undefined}
                />
              </button>
            );
          }

          return (
            <span
              key={`hover-wheel-dot-${index}`}
              aria-hidden
              className={`rounded-full transition-all duration-300 ${
                isActive ? activeDotClassName : inactiveDotClassName
              }`}
              style={isActive ? activeDotStyle : undefined}
            />
          );
        })}
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
        {isHovered ? activeHint : idleHint}
      </p>
    </div>
  );
}
