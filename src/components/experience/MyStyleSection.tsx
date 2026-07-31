import { ExperiencePhoto } from "@/components/experience/ExperiencePhoto";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { experienceStyleImage } from "@/lib/experience-images";
import { sectionPaddingX, sectionPaddingY } from "@/lib/section-padding";
import { splitSectionHeadlineClassName } from "@/lib/typography";

export function MyStyleSection() {
  return (
    <section
      className={`border-b border-slate/10 bg-cream ${sectionPaddingY}`}
    >
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${sectionPaddingX}`}
      >
        <ExperiencePhoto
          src={experienceStyleImage.src}
          alt={experienceStyleImage.alt}
          className="aspect-[4/5] w-full lg:max-w-[520px]"
        />

        <div>
          <SectionEyebrow>How I Shoot</SectionEyebrow>
          <h2 className={splitSectionHeadlineClassName}>My Style</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-body">
            Candid, warm, and true to life. I lean into natural movement and
            real interaction, giving a bit of direction when you need it and
            stepping back when the moment is already perfect on its own.
          </p>
        </div>
      </div>
    </section>
  );
}
