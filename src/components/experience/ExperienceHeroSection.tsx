import { ExperienceImageStrip } from "@/components/experience/ExperienceImageStrip";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { experienceHeroImages } from "@/lib/experience-images";
import { sectionPaddingX } from "@/lib/section-padding";

export function ExperienceHeroSection() {
  return (
    <section className="border-b border-slate/10 bg-cream">
      <div
        className={`text-center ${sectionPaddingX} pt-12 pb-6 lg:pt-16 lg:pb-8`}
      >
        <h1 className="text-4xl leading-tight lg:text-5xl">
          What it feels like to work together
        </h1>
      </div>

      <ExperienceImageStrip images={experienceHeroImages} className="mt-0" />

      <div className={`pb-12 text-center lg:pb-16 ${sectionPaddingX}`}>
        <PrimaryButton href="/contact" className="mt-10">
          Contact Me
        </PrimaryButton>
      </div>
    </section>
  );
}
