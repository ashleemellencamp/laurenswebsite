import Image from "next/image";

import { ScrapbookTape, scrapbookCardShadow } from "./ScrapbookTape";

type TapedPhotoCardProps = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
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
  className = "",
  style,
  tapeClassName = "-top-3 left-1/2 -translate-x-1/2 rotate-[2deg] sm:-top-3.5",
  imageClassName = "",
  sizes = "(max-width: 640px) 45vw, 260px",
}: TapedPhotoCardProps) {
  return (
    <div className={className} style={style}>
      <div
        className={`relative bg-[#faf8f5] px-2 pt-2 pb-7 sm:px-3 sm:pt-3 sm:pb-10 ${scrapbookCardShadow}`}
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
      </div>
    </div>
  );
}
