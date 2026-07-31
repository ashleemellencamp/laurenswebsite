import { ScrapbookCollage } from "@/components/scrapbook/ScrapbookCollage";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  scrapbookIntroContent,
  type ScrapbookIntroVariant,
} from "@/lib/scrapbook-intro-content";
import { sectionPadding } from "@/lib/section-padding";
import {
  sectionBodyClassName,
  sectionHeadlineClassName,
  splitSectionTextColumnClassName,
} from "@/lib/typography";

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
            className={`order-2 lg:order-none ${isPairedStart ? "lg:pb-0" : isPairedEnd ? "lg:pb-0" : ""}`}
          />
          <IntroText
            eyebrow={eyebrow}
            heading={heading}
            body={body}
            className="order-1 lg:order-none"
          />
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
  className = "",
}: {
  eyebrow: string;
  heading: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={`relative z-0 ${splitSectionTextColumnClassName} ${className}`}>
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className={sectionHeadlineClassName}>{heading}</h2>
      <p className={sectionBodyClassName}>{body}</p>
    </div>
  );
}
