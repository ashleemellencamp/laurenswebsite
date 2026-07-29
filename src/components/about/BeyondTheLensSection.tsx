import { sectionPadding } from "@/lib/section-padding";

export function BeyondTheLensSection() {
  return (
    <section className={`bg-cream ${sectionPadding}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl leading-tight lg:text-4xl">Beyond the Lens</h2>
          <p className="mt-6 text-base leading-relaxed text-body">
            I&apos;m drawn to the little things — the way your hands find each
            other, the messy dance-floor moments, the quiet pause before you walk
            down the aisle. Photography is how I slow those moments down and give
            them back to you to keep.
          </p>
        </div>

        <div
          aria-hidden
          className="aspect-[542/523] w-full rounded-2xl bg-slate/70 lg:max-w-[542px] lg:justify-self-end"
        />
      </div>
    </section>
  );
}
