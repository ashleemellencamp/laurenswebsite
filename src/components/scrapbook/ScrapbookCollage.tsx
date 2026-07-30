import Image from "next/image";

import { TapedPhotoCard } from "@/components/scrapbook/TapedPhotoCard";
import type { ScrapbookIntroVariant } from "@/lib/scrapbook-intro-content";
import {
  scrapbookCollageLayouts,
  type ScrapbookDoodleLayout,
} from "@/lib/scrapbook-collage-layouts";

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
  variant: ScrapbookIntroVariant;
  align?: "left" | "right";
  className?: string;
};

export function ScrapbookCollage({
  variant,
  align = "left",
  className = "",
}: ScrapbookCollageProps) {
  const { texture, photos, doodles } = scrapbookCollageLayouts[variant];

  return (
    <div className={`relative z-10 overflow-visible pb-2 lg:pb-6 ${className}`}>
      <div
        className={`relative mx-auto w-full max-w-[700px] origin-center scale-100 lg:mx-0 lg:max-w-none lg:scale-[1.2] ${
          align === "right"
            ? "lg:ml-auto lg:origin-[72%_50%]"
            : "lg:origin-[72%_50%]"
        }`}
        style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}` }}
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

        {photos.map((photo, index) => (
          <TapedPhotoCard
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            orientation={photo.orientation}
            className={`absolute z-10 ${photo.rotate}`}
            style={{
              left: px(photo.left),
              top: py(photo.top),
              width: pw(photo.width),
              zIndex: 10 + index * 10,
            }}
            tapeClassName={photo.tapeClassName}
            imageClassName={photo.imageClassName}
            sizes={photo.sizes}
          />
        ))}

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
