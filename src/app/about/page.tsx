import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Lauren and her approach to wedding photography.",
};

export default function AboutPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2 md:items-center">
        <div className="aspect-[4/5] bg-blush/40" aria-hidden="true" />
        <div>
          <h1 className="mb-6 text-5xl font-light">Hello, I&apos;m Lauren</h1>
          <p className="mb-4 leading-relaxed text-warm-gray">
            I&apos;m a wedding photographer based in [Your City], dedicated to
            capturing authentic, heartfelt moments that tell your unique love
            story.
          </p>
          <p className="leading-relaxed text-warm-gray">
            With a documentary-meets-editorial approach, I focus on the quiet
            glances, joyful tears, and everything in between — so you can relive
            your day for years to come.
          </p>
        </div>
      </div>
    </section>
  );
}
