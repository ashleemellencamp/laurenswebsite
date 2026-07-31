import Image from "next/image";

import { getPaletteTextColor } from "@/lib/style-palette-display";
import type { StylePaletteSwatch } from "@/lib/style-palette";

type StylePaletteCardProps = {
  swatch: StylePaletteSwatch;
  className?: string;
};

export function StylePaletteCard({ swatch, className = "" }: StylePaletteCardProps) {
  const textColor = getPaletteTextColor(swatch.color);

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl shadow-[0_10px_28px_rgba(66,88,110,0.12)] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={swatch.src}
          alt={swatch.alt}
          fill
          sizes="(max-width: 1024px) 55vw, 260px"
          className="object-cover"
        />
      </div>

      <div
        className="palette-grid-swatch relative flex aspect-[2.4/1] flex-col justify-end p-3 sm:p-3.5"
        style={{ backgroundColor: swatch.color, color: textColor }}
      >
        <div className="font-sans uppercase leading-tight tracking-[0.14em]">
          <p className="text-[0.65rem] sm:text-[0.62rem]">{swatch.name}</p>
          <p className="mt-1 text-[0.58rem] opacity-95 sm:text-[0.56rem]">
            {swatch.color.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
