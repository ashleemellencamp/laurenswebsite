import Image from "next/image";

import { sectionPaddingX } from "@/lib/section-padding";

type ExperienceImageStripProps = {
  images: readonly { src: string; alt: string }[];
  className?: string;
  frameClass?: string;
};

const defaultFrameClass = "aspect-[2/3] w-[min(280px,70vw)]";

export function ExperienceImageStrip({
  images,
  className = "mt-10 lg:mt-12",
  frameClass = defaultFrameClass,
}: ExperienceImageStripProps) {
  return (
    <div className={sectionPaddingX}>
      <div
        className={`gallery-scroll flex flex-nowrap gap-4 overflow-x-auto overscroll-x-contain pb-3 lg:gap-6 lg:pb-4 ${className}`}
      >
        {images.map(({ src, alt }) => (
          <div
            key={src}
            className={`relative shrink-0 overflow-hidden rounded-2xl ${frameClass}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 70vw, 280px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
