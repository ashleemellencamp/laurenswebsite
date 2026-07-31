import { sectionPadding } from "@/lib/section-padding";

export function PhilosophyQuoteSection() {
  return (
    <section className={`border-b border-slate/10 bg-sage ${sectionPadding}`}>
      <blockquote className="mx-auto max-w-4xl text-center">
        <p className="text-3xl leading-snug text-slate lg:text-5xl lg:leading-tight">
          You don&apos;t have to know what to do in front of the camera — that&apos;s
          my job. Yours is just to show up as you are.
        </p>
      </blockquote>
    </section>
  );
}
