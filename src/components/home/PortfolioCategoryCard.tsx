import Image from "next/image";
import Link from "next/link";

type PortfolioCategoryCardProps = {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export function PortfolioCategoryCard({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
}: PortfolioCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative z-0 block aspect-[215/308] w-full transform-gpu overflow-hidden rounded-[22px] bg-black will-change-transform backface-hidden transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hover:z-20 sm:hover:scale-[1.1] sm:hover:shadow-xl"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, 33vw"
        className="object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25 opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:group-hover:opacity-100"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
        <p className="mb-3 font-sans text-xs font-normal leading-relaxed tracking-[0.8px] text-white/90 opacity-100 translate-y-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:pointer-events-none sm:mb-3 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          {description}
        </p>

        <div className="flex items-end justify-between gap-2">
          <span className="font-serif text-[1.375rem] leading-none text-white">
            {title}
          </span>
          <span
            aria-hidden
            className="flex size-[34px] shrink-0 translate-y-0.5 scale-95 items-center justify-center rounded-full bg-blue-light opacity-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:group-hover:translate-y-0 sm:group-hover:scale-100 sm:group-hover:opacity-100"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate"
            >
              <path
                d="M5 12H19M19 12L13 6M19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
