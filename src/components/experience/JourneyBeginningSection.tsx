import { ExperiencePhoto } from "@/components/experience/ExperiencePhoto";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { experienceJourneyImage } from "@/lib/experience-images";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";

export function JourneyBeginningSection() {
  return (
    <section
      className={`border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${sectionPaddingX}`}
      >
        <div>
          <SectionEyebrow>Working Together</SectionEyebrow>
          <h2 className="mt-3 text-3xl leading-tight lg:text-4xl">
            You show up. I&apos;ll handle the rest.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body">
            From your first email to your final gallery, I&apos;m here to keep
            things simple and relaxed. I&apos;ll help with timelines, light, and
            locations so you can stay present and enjoy the day, knowing the
            memories are taken care of.
          </p>
        </div>

        <ExperiencePhoto
          src={experienceJourneyImage.src}
          alt={experienceJourneyImage.alt}
          className="aspect-[4/5] w-full lg:max-w-[520px] lg:justify-self-end"
        />
      </div>
    </section>
  );
}
