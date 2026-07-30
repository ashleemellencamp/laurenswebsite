import Image from "next/image";

type ExperiencePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  quality?: number;
};

export function ExperiencePhoto({
  src,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 542px",
  quality = 90,
}: ExperiencePhotoProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className="object-cover"
      />
    </div>
  );
}
