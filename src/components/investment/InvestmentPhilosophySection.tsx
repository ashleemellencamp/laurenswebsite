import { sectionPadding } from "@/lib/section-padding";

export function InvestmentPhilosophySection() {
  return (
    <section className={`bg-cream ${sectionPadding}`}>
      <blockquote className="mx-auto max-w-4xl text-center">
        <p className="text-3xl leading-snug lg:text-5xl lg:leading-tight">
          &ldquo;Your images should feel like heirlooms — not just content for
          a feed.&rdquo;
        </p>
      </blockquote>
    </section>
  );
}
