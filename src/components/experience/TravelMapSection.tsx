"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { TravelWorldMap } from "@/components/experience/TravelWorldMap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  getDestinationById,
  mapPinLocations,
  type MapPinLocation,
  type TravelDestination,
} from "@/lib/travel-destinations";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";
import { sectionBodyCenteredClassName, sectionHeadlineCenteredClassName } from "@/lib/typography";

function getTooltipOffset(mapX: number, mapY: number) {
  if (mapY < 32) {
    return {
      className: "-translate-x-1/2 translate-y-3",
      arrowClassName:
        "absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-l border-t border-slate/15 bg-cream",
    };
  }

  if (mapX > 72) {
    return {
      className: "-translate-x-[calc(100%+12px)] -translate-y-1/2",
      arrowClassName:
        "absolute top-1/2 -right-1.5 size-3 -translate-y-1/2 rotate-45 border-r border-t border-slate/15 bg-cream",
    };
  }

  if (mapX < 22) {
    return {
      className: "translate-x-3 -translate-y-1/2",
      arrowClassName:
        "absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 border-b border-l border-slate/15 bg-cream",
    };
  }

  return {
    className: "-translate-x-1/2 -translate-y-[calc(100%+12px)]",
    arrowClassName:
      "absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-b border-r border-slate/15 bg-cream",
  };
}

function MapTooltipContent({
  destination,
  onClose,
  showArrow = false,
  arrowClassName = "",
}: {
  destination: TravelDestination;
  onClose: () => void;
  showArrow?: boolean;
  arrowClassName?: string;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-2 right-2 flex size-11 items-center justify-center font-sans text-xl leading-none text-body transition hover:text-slate"
      >
        ×
      </button>
      {showArrow ? <span aria-hidden className={arrowClassName} /> : null}
      <h3 className="pr-6 text-lg leading-tight tracking-[0.02em] lg:text-xl">
        {destination.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-body">
        {destination.description}
      </p>
      <PrimaryButton href="/contact" className="mt-4">
        Inquire
      </PrimaryButton>
    </>
  );
}

function MapTooltip({
  pin,
  onClose,
}: {
  pin: MapPinLocation;
  onClose: () => void;
}) {
  const destination = getDestinationById(pin.destinationId);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;

      if (tooltipRef.current?.contains(target)) return;
      if ((event.target as HTMLElement).closest("[data-map-pin]")) return;

      onClose();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onClose]);

  if (!destination) return null;

  const { className, arrowClassName } = getTooltipOffset(pin.mapX, pin.mapY);

  return (
    <div
      role="dialog"
      aria-label={`${destination.name} details`}
      className={`absolute z-20 hidden transition-opacity duration-200 lg:block ${className}`}
      style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
    >
      <div
        ref={tooltipRef}
        className="relative w-72 rounded-sm border border-slate/15 bg-cream px-5 py-5 shadow-md"
      >
        <MapTooltipContent
          destination={destination}
          onClose={onClose}
          showArrow
          arrowClassName={arrowClassName}
        />
      </div>
    </div>
  );
}

function MobileMapTooltipPanel({
  pin,
  onClose,
}: {
  pin: MapPinLocation;
  onClose: () => void;
}) {
  const destination = getDestinationById(pin.destinationId);

  if (!destination) return null;

  return (
    <div className={`mt-4 ${sectionPaddingX} lg:hidden`}>
      <div
        role="dialog"
        aria-label={`${destination.name} details`}
        className="relative mx-auto max-w-md rounded-sm border border-slate/15 bg-cream px-5 py-4 text-center shadow-md"
      >
        <MapTooltipContent destination={destination} onClose={onClose} />
      </div>
    </div>
  );
}

function MapPin({
  pin,
  isActive,
  onSelect,
  showHint,
}: {
  pin: MapPinLocation;
  isActive: boolean;
  onSelect: () => void;
  showHint: boolean;
}) {
  const destination = getDestinationById(pin.destinationId);

  return (
    <button
      type="button"
      data-map-pin
      onClick={onSelect}
      aria-label={`View ${pin.label}${destination ? `, ${destination.name}` : ""}`}
      aria-pressed={isActive}
      className="group absolute z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
    >
      <span
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          isActive
            ? "size-5 bg-slate ring-[6px] ring-blue-light/50 lg:size-6"
            : showHint
              ? "size-3.5 bg-blue-light ring-4 ring-blue-light/25 lg:size-4"
              : "size-3 bg-blue-light/80 group-hover:size-4 group-hover:bg-slate lg:size-3.5"
        }`}
      >
        {showHint && !isActive && (
          <span className="absolute inline-flex size-7 animate-ping rounded-full bg-blue-light/20 motion-reduce:animate-none" />
        )}
        {isActive && (
          <span className="absolute inline-flex size-8 animate-ping rounded-full bg-blue-light/25 motion-reduce:animate-none" />
        )}
      </span>
    </button>
  );
}

export function TravelMapSection() {
  const [activePin, setActivePin] = useState<MapPinLocation | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const closeTooltip = useCallback(() => setActivePin(null), []);

  function handlePinSelect(pin: MapPinLocation) {
    setHasInteracted(true);
    setActivePin(pin);
  }

  return (
    <section
      className={`relative overflow-x-clip border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div className={`mx-auto max-w-4xl text-center ${sectionPaddingX}`}>
        <SectionEyebrow className="text-center">
          Let&apos;s Go Somewhere
        </SectionEyebrow>
        <h2 className={sectionHeadlineCenteredClassName}>Travel Bucket List</h2>
        <p className={`mx-auto mt-6 max-w-2xl ${sectionBodyCenteredClassName}`}>
          These are the places I&apos;m dreaming of shooting next. Planning a
          wedding, elopement, or session in one of them? I&apos;d love to be
          your photographer — reach out and let&apos;s make it happen.
        </p>
        <p
          id="travel-map-hint"
          className={`mt-8 font-sans text-xs uppercase tracking-[0.12em] text-body/60 transition-opacity duration-500 ${
            hasInteracted ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          Click a pin to explore
        </p>
      </div>

      <div className={`mt-8 w-full lg:mt-10 ${sectionPaddingX}`}>
        <div className="mx-auto w-full max-w-7xl">
          <div
            className="relative aspect-[1010/666] w-full overflow-visible"
            aria-describedby={hasInteracted ? undefined : "travel-map-hint"}
          >
            <TravelWorldMap />
            {mapPinLocations.map((pin) => (
              <MapPin
                key={pin.id}
                pin={pin}
                isActive={activePin?.id === pin.id}
                onSelect={() => handlePinSelect(pin)}
                showHint={!hasInteracted}
              />
            ))}
            {activePin && (
              <MapTooltip pin={activePin} onClose={closeTooltip} />
            )}
          </div>
        </div>
      </div>

      {activePin && (
        <MobileMapTooltipPanel pin={activePin} onClose={closeTooltip} />
      )}
    </section>
  );
}
