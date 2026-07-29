import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-ivory px-6 text-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-warm-gray">
            Wedding Photography
          </p>
          <h1 className="mb-6 text-5xl font-light leading-tight md:text-7xl">
            Capturing Love Stories
          </h1>
          <p className="mb-10 text-lg text-warm-gray">
            Timeless, elegant photography for couples who believe every moment
            matters.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/portfolio"
              className="bg-charcoal px-8 py-3 text-sm uppercase tracking-widest text-cream transition hover:bg-warm-gray"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="border border-charcoal px-8 py-3 text-sm uppercase tracking-widest transition hover:bg-charcoal hover:text-cream"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Featured work placeholder */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="mb-4 text-4xl font-light">Featured Work</h2>
          <p className="mb-12 text-warm-gray">
            A glimpse into recent celebrations
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-blush/40 flex items-center justify-center text-warm-gray text-sm"
              >
                Photo {i}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
