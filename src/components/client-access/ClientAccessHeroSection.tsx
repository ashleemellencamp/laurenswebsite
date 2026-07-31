import { InteriorPageHero } from "@/components/ui/InteriorPageHero";
import { sectionBodyCenteredClassName } from "@/lib/typography";

export function ClientAccessHeroSection() {
  return (
    <InteriorPageHero eyebrow="Private Galleries" headline="Client Access">
      <p className={`mx-auto mt-4 max-w-xl ${sectionBodyCenteredClassName}`}>
        Your photos, delivered in a beautiful private gallery — browse, download,
        and share with the people you love.
      </p>
    </InteriorPageHero>
  );
}
