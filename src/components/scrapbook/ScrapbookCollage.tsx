"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { TapedPhotoCard } from "@/components/scrapbook/TapedPhotoCard";
import type { ScrapbookIntroVariant } from "@/lib/scrapbook-intro-content";
import {
  scrapbookCollageLayouts,
  type ScrapbookDoodleLayout,
} from "@/lib/scrapbook-collage-layouts";

export type ScrapbookCollageVariant = ScrapbookIntroVariant;

const FRAME_WIDTH = 584.639;
const FRAME_HEIGHT = 519.069;

function px(value: number) {
  return `${(value / FRAME_WIDTH) * 100}%`;
}

function py(value: number) {
  return `${(value / FRAME_HEIGHT) * 100}%`;
}

function pw(value: number) {
  return `${(value / FRAME_WIDTH) * 100}%`;
}

function ph(value: number) {
  return `${(value / FRAME_HEIGHT) * 100}%`;
}

const doodleSources = {
  location: "/images/home/scrapbook/doodle-location.svg",
  arrow: "/images/home/scrapbook/doodle-arrow.svg",
  camera: "/images/home/scrapbook/doodle-camera.svg",
} as const;

function ScrapbookDoodle({
  doodle,
  style,
}: {
  doodle: ScrapbookDoodleLayout;
  style?: React.CSSProperties;
}) {
  const rotateClass =
    doodle.type === "location"
      ? (doodle.rotate ?? "rotate-[14.05deg]")
      : (doodle.rotate ?? "");

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        left: px(doodle.left),
        top: py(doodle.top),
        width: pw(doodle.width),
        height: ph(doodle.height),
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={doodleSources[doodle.type]}
        alt=""
        className={`size-full object-contain ${rotateClass}`}
      />
    </div>
  );
}

type ScrapbookCollageProps = {
  variant: ScrapbookCollageVariant;
  align?: "left" | "right";
  className?: string;
  playful?: boolean;
};

export function ScrapbookCollage({
  variant,
  align = "left",
  className = "",
  playful = variant === "about" || variant === "thingsThatMoveMe",
}: ScrapbookCollageProps) {
  const layout = scrapbookCollageLayouts[variant];
  const { texture, photos, doodles } = layout;
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [motionEnabled, setMotionEnabled] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prefersFinePointer = window.matchMedia("(hover: hover)").matches;

    setMotionEnabled(playful && !prefersReduced && prefersFinePointer);
  }, [playful]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!motionEnabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    setParallax({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  function handleMouseLeave() {
    setParallax({ x: 0, y: 0 });
  }

  return (
    <div className={`relative z-10 overflow-visible pb-2 lg:pb-6 ${className}`}>
      <div
        className={`relative mx-auto w-full max-w-[700px] origin-center scale-100 lg:mx-0 lg:max-w-none lg:scale-[1.2] ${
          align === "right"
            ? "lg:ml-auto lg:origin-[72%_50%]"
            : "lg:origin-[72%_50%]"
        }`}
        style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}` }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {texture && (
          <Image
            src="/images/home/scrapbook/texture-middle.png"
            alt=""
            aria-hidden
            width={462}
            height={270}
            className="pointer-events-none absolute z-0 object-cover opacity-95"
            style={{
              left: px(texture.left),
              top: py(texture.top),
              width: pw(texture.width),
              height: ph(texture.height),
            }}
          />
        )}

        {photos.map((photo, index) => {
          const depth = index + 1;
          const parallaxX = motionEnabled ? parallax.x * depth * 14 : 0;
          const parallaxY = motionEnabled ? parallax.y * depth * 10 : 0;

          return (
            <div
              key={photo.src}
              className="absolute z-10 transition-transform duration-500 ease-out"
              style={{
                left: px(photo.left),
                top: py(photo.top),
                width: pw(photo.width),
                zIndex: 10 + index * 10,
                transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
              }}
            >
              <TapedPhotoCard
                src={photo.src}
                alt={photo.alt}
                caption={photo.caption}
                orientation={photo.orientation}
                interactive={playful}
                animationDelay={`${index * 0.8}s`}
                className={`w-full ${photo.rotate}`}
                tapeClassName={photo.tapeClassName}
                imageClassName={photo.imageClassName}
                sizes={photo.sizes}
              />
            </div>
          );
        })}

        {doodles.map((doodle, index) => (
          <ScrapbookDoodle
            key={`${doodle.type}-${index}`}
            doodle={doodle}
            style={{ zIndex: 30 + index * 10 }}
          />
        ))}
      </div>
    </div>
  );
}
