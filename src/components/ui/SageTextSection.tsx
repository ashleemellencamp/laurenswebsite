import { TextLink } from "@/components/ui/TextLink";
import { sectionPadding } from "@/lib/section-padding";
import { mobileCenterLgLeftClassName } from "@/lib/typography";

type SageTextSectionProps = {
  headline: React.ReactNode;
  children: React.ReactNode;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
};

export function SageTextSection({
  headline,
  children,
  link,
  className = "",
}: SageTextSectionProps) {
  return (
    <section className={`bg-sage ${sectionPadding} ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className={`${mobileCenterLgLeftClassName} lg:col-span-4`}>
            <h2 className="font-serif text-[clamp(1.375rem,2.25vw,1.875rem)] font-normal leading-[1.3] text-slate">
              {headline}
            </h2>
          </div>

          <div
            className={`${mobileCenterLgLeftClassName} lg:col-span-8 lg:col-start-5`}
          >
            <p className="text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.85] tracking-[0.8px] text-body">
              {children}
            </p>
            {link ? (
              <div className="mt-6 flex max-lg:justify-center lg:justify-start">
                <TextLink href={link.href} showArrow className="font-normal">
                  {link.label}
                </TextLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
