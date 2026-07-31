import { StylePaletteCard } from "@/components/experience/StylePaletteCard";
import { stylePaletteSwatches } from "@/lib/style-palette";

type StylePaletteStripProps = {
  className?: string;
};

export function StylePaletteStrip({ className = "" }: StylePaletteStripProps) {
  return (
    <div
      className={`mx-auto flex w-full max-w-[22rem] flex-col gap-3 sm:max-w-[23rem] lg:mx-0 ${className}`}
      aria-label="Color palette extracted from portfolio photography"
    >
      {stylePaletteSwatches.map((swatch) => (
        <StylePaletteCard key={swatch.src} swatch={swatch} />
      ))}
    </div>
  );
}
