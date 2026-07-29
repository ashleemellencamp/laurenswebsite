import { sectionPaddingX } from "@/lib/section-padding";

export function PhilosophyQuoteSection() {
  return (
    <section className="border-b border-slate/10 bg-blue-light py-20 lg:py-28">
      <blockquote className={`mx-auto max-w-4xl text-center ${sectionPaddingX}`}>
        <p className="font-serif text-[clamp(1.5rem,3.5vw,2.75rem)] leading-snug text-slate lg:leading-tight">
          &ldquo;You don&apos;t have to know what to do in front of the camera
          — that&apos;s my job. Yours is just to show up as you are.&rdquo;
        </p>
      </blockquote>
    </section>
  );
}
