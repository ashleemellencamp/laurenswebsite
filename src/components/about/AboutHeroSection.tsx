import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { sectionPadding } from "@/lib/section-padding";

const heroImages = [
  { id: 1, tone: "bg-slate/80" },
  { id: 2, tone: "bg-slate/60" },
  { id: 3, tone: "bg-slate/80" },
] as const;

export function AboutHeroSection() {
  return (
    <section className={`bg-white ${sectionPadding}`}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="text-sm font-medium uppercase tracking-[0.8px] text-body">
          This is Lauren
        </p>
        <h1 className="mt-4 text-4xl leading-tight lg:text-5xl">
          Photographing love across the South and beyond
        </h1>
      </div>

      <div className="mx-auto mt-16 flex max-w-4xl justify-center gap-6 max-sm:flex-col max-sm:items-center">
        {heroImages.map(({ id, tone }) => (
          <div
            key={id}
            aria-hidden
            className={`aspect-[233/280] w-full max-w-[233px] rounded-2xl ${tone}`}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <PrimaryButton href="/contact">Contact Me</PrimaryButton>
      </div>
    </section>
  );
}
