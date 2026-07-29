type ScrapbookTapeProps = {
  className?: string;
};

export function ScrapbookTape({ className = "" }: ScrapbookTapeProps) {
  return (
    <div
      aria-hidden
      className={`absolute h-8 w-[4.75rem] border border-white/60 bg-white/55 shadow-sm backdrop-blur-[1px] sm:h-9 sm:w-[5.5rem] ${className}`}
    />
  );
}

export const scrapbookCardShadow =
  "shadow-[0_8px_32px_rgba(66,88,110,0.18),0_2px_8px_rgba(0,0,0,0.06)]";
