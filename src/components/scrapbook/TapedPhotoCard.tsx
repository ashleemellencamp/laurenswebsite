import Image from "next/image";

import { ScrapbookTape, scrapbookCardShadow } from "./ScrapbookTape";

type TapedPhotoCardProps = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
  caption?: string;
  interactive?: boolean;
  animationDelay?: string;
  className?: string;
  style?: React.CSSProperties;
  tapeClassName?: string;
  imageClassName?: string;
  sizes?: string;
};

export function TapedPhotoCard({
  src,
  alt,
  orientation,
  caption,
  interactive = false,
  animationDelay = "0s",
  className = "",
  style,
  tapeClassName = "-top-3 left-1/2 -translate-x-1/2 rotate-[2deg] sm:-top-3.5",
  imageClassName = "",
  sizes = "(max-width: 640px) 45vw, 260px",
}: TapedPhotoCardProps) {
  return (
    <div
      className={`${className} ${
        interactive ? "animate-scrapbook-float motion-reduce:animate-none" : ""
      }`}
      style={{
        ...style,
        ...(interactive ? { animationDelay } : {}),
      }}
    >
      <div
        className={`relative bg-[#faf8f5] px-2 pt-2 ${
          caption ? "pb-7 sm:pb-10" : "pb-2 sm:pb-3"
        } sm:px-3 sm:pt-3 ${scrapbookCardShadow} ${
          interactive
            ? "scrapbook-photo-lift transition-[transform,box-shadow] duration-300 ease-out"
            : ""
        }`}
      >
        <ScrapbookTape className={tapeClassName} />
        <div
          className={`relative overflow-hidden ${
            orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={`object-cover ${imageClassName}`}
          />
        </div>
        {caption ? (
          <p className="pointer-events-none absolute inset-x-2 bottom-2 text-center font-script text-[clamp(0.8rem,2.4vw,1.05rem)] leading-none tracking-[0.02em] text-body rotate-[-1.5deg] sm:inset-x-3 sm:bottom-3">
            {caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}
