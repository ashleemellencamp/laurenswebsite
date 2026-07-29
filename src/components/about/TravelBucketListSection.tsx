import { sectionPadding } from "@/lib/section-padding";

const destinations = [
  "U.S. National Parks",
  "NYC",
  "Cape Town, South Africa",
  "Greece",
  "Italy",
  "Spain",
  "Coast of France",
] as const;

export function TravelBucketListSection() {
  const tickerItems = [...destinations, ...destinations];

  return (
    <section className={`overflow-hidden bg-cream ${sectionPadding}`}>
      <div className="flex items-center gap-8 whitespace-nowrap">
        <p className="shrink-0 font-serif text-2xl italic text-slate lg:text-3xl">
          My travel bucketlist:
        </p>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex animate-marquee gap-12">
            {tickerItems.map((place, index) => (
              <span
                key={`${place}-${index}`}
                className="font-serif text-2xl italic text-slate lg:text-3xl"
              >
                {place}
                <span aria-hidden className="mx-6 text-body/40">
                  —
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
