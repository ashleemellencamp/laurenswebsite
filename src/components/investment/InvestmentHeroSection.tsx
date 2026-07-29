import { sectionPadding } from "@/lib/section-padding";

export function InvestmentHeroSection() {
  return (
    <section className={`bg-white ${sectionPadding}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.8px] text-body">
            Investment
          </p>
          <h1 className="mt-4 text-4xl leading-tight lg:text-5xl">
            An investment in memories that last
          </h1>
          <p className="mt-6 text-base leading-relaxed text-body">
            Photography is more than a line item on your wedding budget —
            it&apos;s how you&apos;ll relive the laughter, the nerves, the quiet
            glances, and everything in between for decades to come.
          </p>
          <p className="mt-4 text-base leading-relaxed text-body">
            Every collection is thoughtfully built around your day, your
            priorities, and the story you want to tell. Below you&apos;ll find
            starting points for weddings, elopements, engagement sessions, and
            portrait sessions.
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
