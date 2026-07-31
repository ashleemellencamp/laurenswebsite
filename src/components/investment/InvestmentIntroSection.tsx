import { SageTextSection } from "@/components/ui/SageTextSection";

export function InvestmentIntroSection() {
  return (
    <SageTextSection
      className="border-b border-slate/10"
      headline={
        <>
          Long After
          <br />
          the Day Is Over
        </>
      }
    >
      Your photos are one of the few things you&apos;ll keep long after the
      day is over. My collections are built to give you thoughtful coverage,
      clear communication, and images you&apos;ll want to revisit for years.
    </SageTextSection>
  );
}
