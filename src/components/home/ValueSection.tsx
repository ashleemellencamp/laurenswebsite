import { TextLink } from "@/components/ui/TextLink";
import { sectionPadding } from "@/lib/section-padding";

export function ValueSection() {
  return (
    <section className={`bg-sage ${sectionPadding}`}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:text-left">
            <h2 className="font-serif text-[clamp(1.375rem,2.25vw,1.875rem)] font-normal leading-[1.3] text-slate">
              Your Story,
              <br />
              Naturally Told.
            </h2>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.85] tracking-[0.8px] text-body">
              I&apos;m here to help you feel comfortable, present, and fully
              yourself. No stiff poses or forced smiles — just gentle guidance,
              movement, and space for the real moments to unfold.
            </p>
            <TextLink href="/experience" showArrow className="mt-6 font-normal">
              The Experience
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  );
}
