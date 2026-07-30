import { ScrapbookCollage } from "@/components/scrapbook/ScrapbookCollage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  scrapbookIntroContent,
  type ScrapbookIntroVariant,
} from "@/lib/scrapbook-intro-content";
import { sectionPadding } from "@/lib/section-padding";

type ScrapbookIntroSectionProps = {
  variant: ScrapbookIntroVariant;
};

type ScrapbookIntroBlockProps = {
  variant: ScrapbookIntroVariant;
  paired?: boolean;
};

export function ScrapbookIntroBlock({
  variant,
  paired = false,
}: ScrapbookIntroBlockProps) {
  const { eyebrow, heading, body, collageAlign } = scrapbookIntroContent[variant];
  const textFirst = collageAlign === "right";
  const isPairedEnd = paired && variant === "thingsThatMoveMe";
  const isPairedStart = paired && variant === "about";

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
      {textFirst ? (
        <>
          <IntroText eyebrow={eyebrow} heading={heading} body={body} />
          <ScrapbookCollage
            variant={variant}
            align={collageAlign}
            className={isPairedStart ? "lg:pb-0" : isPairedEnd ? "lg:pb-0" : undefined}
          />
        </>
      ) : (
        <>
          <ScrapbookCollage
            variant={variant}
            align={collageAlign}
            className={isPairedStart ? "lg:pb-0" : isPairedEnd ? "lg:pb-0" : undefined}
          />
          <IntroText eyebrow={eyebrow} heading={heading} body={body} />
        </>
      )}
    </div>
  );
}

export function ScrapbookIntroSection({ variant }: ScrapbookIntroSectionProps) {
  const { background } = scrapbookIntroContent[variant];

  return (
    <section
      className={`overflow-x-clip ${background === "white" ? "bg-white" : "bg-cream"} ${sectionPadding}`}
    >
      <ScrapbookIntroBlock variant={variant} />
    </section>
  );
}

function IntroText({
  eyebrow,
  heading,
  body,
}: {
  eyebrow: string;
  heading: string;
  body: string;
}) {
  return (
    <div className="relative z-0 text-center lg:text-left">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] leading-snug">
        {heading}
      </h2>
      <p className="mt-6 text-base leading-relaxed tracking-[0.8px] text-body">
        {body}
      </p>
    </div>
  );
}
