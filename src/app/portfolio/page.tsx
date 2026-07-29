import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse wedding photography galleries and recent work.",
};

export default function PortfolioPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 text-center text-5xl font-light">Portfolio</h1>
        <p className="mb-16 text-center text-warm-gray">
          Galleries coming soon — this is where your wedding collections will
          live.
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Garden Wedding", "Coastal Elopement", "City Celebration"].map(
            (title) => (
              <article
                key={title}
                className="group cursor-pointer overflow-hidden"
              >
                <div className="aspect-[4/5] bg-blush/40 transition group-hover:bg-blush/60" />
                <h2 className="mt-4 text-xl font-light">{title}</h2>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
