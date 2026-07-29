import { sectionPadding } from "@/lib/section-padding";

export function ValuePropSection() {
  return (
    <section className={`overflow-hidden bg-white ${sectionPadding}`}>

      <div className="relative mx-auto min-h-[520px] max-w-6xl lg:min-h-[680px]">

        {/* Collage placeholders */}

        <div

          aria-hidden

          className="absolute left-[4%] top-[28%] hidden h-[348px] w-[338px] rounded-2xl bg-slate/70 lg:block"

        />

        <div

          aria-hidden

          className="absolute left-[19%] top-[8%] hidden h-[353px] w-[420px] rounded-2xl bg-blue-light/30 lg:block"

        />

        <div

          aria-hidden

          className="absolute right-[8%] top-[18%] hidden h-[361px] w-[485px] rounded-2xl bg-slate/60 lg:block"

        />

        <div

          aria-hidden

          className="absolute right-[4%] top-[42%] hidden h-[406px] w-[322px] rounded-2xl bg-blue-light/25 lg:block"

        />

        <div

          aria-hidden

          className="absolute bottom-[6%] left-[12%] hidden h-[397px] w-[377px] rounded-2xl bg-slate/75 lg:block"

        />

        <div

          aria-hidden

          className="absolute bottom-[10%] right-[18%] hidden h-[280px] w-[280px] rounded-2xl bg-slate/50 lg:block"

        />



        {/* Mobile collage strip */}

        <div className="mb-10 grid grid-cols-2 gap-3 lg:hidden">

          <div aria-hidden className="aspect-[4/5] rounded-2xl bg-slate/70" />

          <div aria-hidden className="aspect-[4/5] rounded-2xl bg-blue-light/30" />

          <div aria-hidden className="aspect-[4/5] rounded-2xl bg-slate/60" />

          <div aria-hidden className="aspect-[4/5] rounded-2xl bg-blue-light/25" />

        </div>



        {/* Center content card */}

        <div className="relative z-10 mx-auto flex max-w-[499px] flex-col items-center rounded-2xl bg-white px-8 py-12 text-center shadow-sm lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-12 lg:py-16">

          <h2 className="text-3xl leading-snug lg:text-4xl">

            Images that feel like you — not a template

          </h2>

          <p className="mt-6 text-base leading-relaxed text-body">

            I believe the best photographs come from genuine connection. My

            approach is calm, intuitive, and focused on the in-between

            moments — the ones you&apos;ll want to relive for years to come.

          </p>

        </div>

      </div>

    </section>

  );

}

