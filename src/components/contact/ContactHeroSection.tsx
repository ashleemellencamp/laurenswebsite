import { sectionPadding } from "@/lib/section-padding";

export function ContactHeroSection() {
  return (
    <section className={`bg-white text-center ${sectionPadding}`}>
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.8px] text-body">
          Get in Touch
        </p>
        <h1 className="mt-4 text-4xl leading-tight lg:text-5xl">
          Ready to make something beautiful?
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-body">
          Tell me all about your wedding or session vision below, and I&apos;ll
          be in touch. I&apos;m so excited to connect!
        </p>
      </div>
    </section>
  );
}
