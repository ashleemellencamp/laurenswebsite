import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/ContactForm";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { sectionPadding } from "@/lib/section-padding";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Inquire about wedding and portrait photography availability — tell Lauren about your date, location, and vision.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHeroSection />

      <section className={`bg-cream ${sectionPadding}`}>
        <div className="mx-auto max-w-3xl rounded-2xl border border-blue-light/30 bg-white px-6 py-12 lg:px-12 lg:py-16">
          <ContactForm />

          <p className="mt-8 text-center font-sans text-sm tracking-[0.8px] text-body">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-slate underline decoration-blue-light underline-offset-4 transition hover:opacity-80"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
