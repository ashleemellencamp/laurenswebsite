import { ExperiencePhoto } from "@/components/experience/ExperiencePhoto";
import { StylePaletteScrollSection } from "@/components/experience/StylePaletteScrollSection";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import {
  experienceStyleContent,
  experienceStyleMediaClassName,
  type ExperienceStylePhotoVariant,
} from "@/lib/experience-style-content";
import { sectionPaddingX } from "@/lib/section-padding";
import { sectionBodyClassName, sectionHeadlineClassName } from "@/lib/typography";

function StyleIntroText({
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
      <h2 className={sectionHeadlineClassName}>{heading}</h2>
      <p className={sectionBodyClassName}>{body}</p>
    </div>
  );
}

function ExperienceStyleBlock({ variant }: { variant: ExperienceStylePhotoVariant }) {
  const { eyebrow, heading, body, photoAlign, image } =
    experienceStyleContent[variant];
  const textFirst = photoAlign === "right";
  const photoClassName =
    photoAlign === "right"
      ? `${experienceStyleMediaClassName} aspect-[4/5] lg:justify-self-end`
      : `${experienceStyleMediaClassName} aspect-[4/5]`;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {textFirst ? (
        <>
          <StyleIntroText eyebrow={eyebrow} heading={heading} body={body} />
          <ExperiencePhoto
            src={image.src}
            alt={image.alt}
            sizes="(max-width: 1024px) 55vw, 384px"
            className={photoClassName}
          />
        </>
      ) : (
        <>
          <ExperiencePhoto
            src={image.src}
            alt={image.alt}
            sizes="(max-width: 1024px) 55vw, 384px"
            className={photoClassName}
          />
          <StyleIntroText eyebrow={eyebrow} heading={heading} body={body} />
        </>
      )}
    </div>
  );
}

export function ExperienceStyleSections() {
  return (
    <section
      className={`border-b border-slate/10 bg-cream py-16 lg:py-24 ${sectionPaddingX}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:gap-10">
        <ExperienceStyleBlock variant="styleCandid" />
        <StylePaletteScrollSection />
        <ExperienceStyleBlock variant="styleLightMovement" />
      </div>
    </section>
  );
}
