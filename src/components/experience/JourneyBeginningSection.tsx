import { ExperiencePhoto } from "@/components/experience/ExperiencePhoto";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { experienceJourneyImage } from "@/lib/experience-images";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";
import {
  sectionBodyClassName,
  splitSectionHeadlineClassName,
  splitSectionTextColumnClassName,
} from "@/lib/typography";

export function JourneyBeginningSection() {
  return (
    <section
      className={`border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div
        className={`mx-auto grid max-w-6xl items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16 ${sectionPaddingX}`}
      >
        <div className={splitSectionTextColumnClassName}>
          <SectionEyebrow>Working Together</SectionEyebrow>
          <h2 className={splitSectionHeadlineClassName}>
            You Show Up, I&apos;ll Handle the Rest
          </h2>
          <p className={sectionBodyClassName}>
            From your first email to your final gallery, I&apos;m here to keep
            things simple and relaxed. I&apos;ll help with timelines, light, and
            locations so you can stay present and enjoy the day, knowing the
            memories are taken care of.
          </p>
        </div>

        <ExperiencePhoto
          src={experienceJourneyImage.src}
          alt={experienceJourneyImage.alt}
          className="mx-auto aspect-[4/5] w-full max-w-2xl lg:mx-0 lg:max-w-[520px] lg:justify-self-end"
        />
      </div>
    </section>
  );
}
