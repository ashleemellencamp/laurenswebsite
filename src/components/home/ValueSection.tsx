import { SageTextSection } from "@/components/ui/SageTextSection";

export function ValueSection() {
  return (
    <SageTextSection
      headline={
        <>
          Your Story,
          <br />
          Naturally Told
        </>
      }
      link={{ href: "/experience", label: "The Experience" }}
    >
      I&apos;m here to help you feel comfortable, present, and fully yourself. No
      stiff poses or forced smiles — just gentle guidance, movement, and space
      for the real moments to unfold.
    </SageTextSection>
  );
}
