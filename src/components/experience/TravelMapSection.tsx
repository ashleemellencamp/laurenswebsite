"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { TravelWorldMap } from "@/components/experience/TravelWorldMap";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  getDestinationById,
  mapPinLocations,
  type MapPinLocation,
} from "@/lib/travel-destinations";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";

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
      className={`absolute z-20 transition-opacity duration-200 ${className}`}
      style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
    >
      <div
        ref={tooltipRef}
        className="relative w-[min(17.5rem,72vw)] rounded-sm border border-slate/15 bg-cream px-4 py-4 shadow-md lg:w-72 lg:px-5 lg:py-5"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 font-sans text-lg leading-none text-body transition hover:text-slate"
        >
          ×
        </button>
        <span aria-hidden className={arrowClassName} />
        <h3 className="pr-6 text-lg leading-tight tracking-[0.02em] lg:text-xl">
          {destination.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-body">
          {destination.description}
        </p>
        <PrimaryButton href="/contact" className="mt-4 px-5 py-2.5 text-xs">
          Inquire
        </PrimaryButton>
      </div>
    </div>
  );
}

function MapPin({
  pin,
  isActive,
  onSelect,
}: {
  pin: MapPinLocation;
  isActive: boolean;
  onSelect: () => void;
}) {
  const destination = getDestinationById(pin.destinationId);

  return (
    <button
      type="button"
      data-map-pin
      onClick={onSelect}
      aria-label={`View ${pin.label}${destination ? `, ${destination.name}` : ""}`}
      aria-pressed={isActive}
      className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pin.mapX}%`, top: `${pin.mapY}%` }}
    >
      <span
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          isActive
            ? "size-5 bg-slate ring-[6px] ring-blue-light/50 lg:size-6"
            : "size-3 bg-blue-light/80 group-hover:size-4 group-hover:bg-slate lg:size-3.5"
        }`}
      >
        {isActive && (
          <span className="absolute inline-flex size-8 animate-ping rounded-full bg-blue-light/25" />
        )}
      </span>
    </button>
  );
}

export function TravelMapSection() {
  const [activePin, setActivePin] = useState<MapPinLocation | null>(null);
  const closeTooltip = useCallback(() => setActivePin(null), []);

  return (
    <section
      className={`relative overflow-hidden border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div className={`mx-auto max-w-4xl text-center ${sectionPaddingX}`}>
        <SectionEyebrow className="text-center">
          Let&apos;s go somewhere
        </SectionEyebrow>
        <h2 className="mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-none tracking-[0.02em]">
          Travel Bucket List
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-body">
          These are the places I&apos;m dreaming of shooting next. Planning a
          wedding, elopement, or session in one of them? I&apos;d love to be
          your photographer — reach out and let&apos;s make it happen.
        </p>
      </div>

      <div className={`mt-12 w-full lg:mt-16 ${sectionPaddingX}`}>
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative aspect-[1010/666] w-full">
            <TravelWorldMap />
            {mapPinLocations.map((pin) => (
              <MapPin
                key={pin.id}
                pin={pin}
                isActive={activePin?.id === pin.id}
                onSelect={() => setActivePin(pin)}
              />
            ))}
            {activePin && (
              <MapTooltip pin={activePin} onClose={closeTooltip} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
