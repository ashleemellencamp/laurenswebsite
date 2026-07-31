import { ScrapbookIntroBlock } from "@/components/scrapbook/ScrapbookIntroSection";
import { sectionPadding } from "@/lib/section-padding";

export function AboutScrapbookSections() {
  return (
    <section className={`overflow-x-clip bg-cream ${sectionPadding}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:gap-10">
        <ScrapbookIntroBlock variant="about" paired />
        <ScrapbookIntroBlock variant="thingsThatMoveMe" paired />
      </div>
    </section>
  );
}
