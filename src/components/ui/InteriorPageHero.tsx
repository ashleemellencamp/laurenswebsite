import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { sectionPadding } from "@/lib/section-padding";
import { stripeBackground } from "@/lib/stripe-background";
import { pageHeroHeadlineClassName } from "@/lib/typography";

type InteriorPageHeroProps = {
  eyebrow: string;
  headline: string;
  children?: React.ReactNode;
  className?: string;
};

export function InteriorPageHero({
  eyebrow,
  headline,
  children,
  className = "",
}: InteriorPageHeroProps) {
  return (
    <section
      className={`border-b border-slate/10 text-center ${sectionPadding} ${className}`}
      style={{ backgroundImage: stripeBackground }}
    >
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow className="text-center">{eyebrow}</SectionEyebrow>
        <h1 className={pageHeroHeadlineClassName}>{headline}</h1>
        {children}
      </div>
    </section>
  );
}
