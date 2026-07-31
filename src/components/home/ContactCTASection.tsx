import Image from "next/image";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import {
  ScrapbookTape,
  scrapbookCardShadow,
} from "@/components/scrapbook/ScrapbookTape";
import { getCtaBackground } from "@/lib/cta-backgrounds";
import { sectionPadding, sectionPaddingX } from "@/lib/section-padding";

type ContactCTASectionProps = {
  className?: string;
  variant?: "photo" | "plain";
  backgroundSrc?: string;
};

function ScrapbookCard() {
  return (
    <div
      className={`relative w-full max-w-[420px] rotate-[-1.2deg] bg-[#faf8f5] px-7 py-9 sm:px-9 sm:py-10 ${scrapbookCardShadow}`}
    >
      <ScrapbookTape className="-top-3.5 left-1/2 -translate-x-1/2 rotate-[2deg]" />
      <h2 className="text-center font-serif text-[clamp(1.75rem,5vw,2.25rem)] leading-[1.2] text-slate">
        Every love story begins with a hello.
      </h2>

      <p className="mt-4 text-center font-sans text-sm leading-relaxed tracking-[0.8px] text-body">
        Let&apos;s capture yours, wherever it unfolds.
      </p>

      <div className="mt-8 flex justify-center">
        <PrimaryButton href="/contact">Contact Me</PrimaryButton>
      </div>
    </div>
  );
}

export function ContactCTASection({
  className = "bg-cream",
  variant = "photo",
  backgroundSrc = getCtaBackground("home"),
}: ContactCTASectionProps) {
  if (variant === "plain") {
    return (
      <section
        className={`${sectionPadding} text-center ${className}`}
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.8px] text-body">
            Every love story begins with a hello
          </p>
          <h2 className="mt-4 text-4xl leading-tight lg:text-5xl">
            Let&apos;s capture yours, wherever it unfolds.
          </h2>
          <PrimaryButton href="/contact" className="mt-10">
            Contact Me
          </PrimaryButton>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex min-h-[580px] items-center justify-center overflow-hidden ${sectionPaddingX} py-24 lg:min-h-[620px] lg:py-32`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src={backgroundSrc}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[420px]">
        <ScrapbookCard />
      </div>
    </section>
  );
}
