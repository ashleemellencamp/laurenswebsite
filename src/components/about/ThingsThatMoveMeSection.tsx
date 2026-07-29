import { sectionPadding } from "@/lib/section-padding";

export function ThingsThatMoveMeSection() {
  return (
    <section className={`bg-white ${sectionPadding}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div
          aria-hidden
          className="aspect-[542/523] w-full rounded-2xl bg-slate/70 lg:max-w-[542px]"
        />

        <div>
          <h2 className="text-3xl leading-tight lg:text-4xl">
            The things that move me
          </h2>
          <p className="mt-6 text-base leading-relaxed text-body">
            Golden hour drives with the windows down. Old records and film grain.
            The hum of a reception just before the music starts. People who love
            big, laugh loudly, and aren&apos;t afraid to be themselves in front
            of the camera.
          </p>
        </div>
      </div>
    </section>
  );
}
