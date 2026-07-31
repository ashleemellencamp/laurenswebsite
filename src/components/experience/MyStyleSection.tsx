import { ExperiencePhoto } from "@/components/experience/ExperiencePhoto";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { experienceStyleImage } from "@/lib/experience-images";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";
import {
  sectionBodyClassName,
  splitSectionHeadlineClassName,
  splitSectionTextColumnClassName,
} from "@/lib/typography";

export function MyStyleSection() {
  return (
    <section
      className={`border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 ${sectionPaddingX}`}
      >
        <ExperiencePhoto
          src={experienceStyleImage.src}
          alt={experienceStyleImage.alt}
          className="mx-auto aspect-[4/5] w-full max-w-2xl lg:mx-0 lg:max-w-[520px]"
        />

        <div className={splitSectionTextColumnClassName}>
          <SectionEyebrow>How I Shoot</SectionEyebrow>
          <h2 className={splitSectionHeadlineClassName}>My Style</h2>
          <p className={sectionBodyClassName}>
            Candid, warm, and true to life. I lean into natural movement and
            real interaction, giving a bit of direction when you need it and
            stepping back when the moment is already perfect on its own.
          </p>
        </div>
      </div>
    </section>
  );
}
