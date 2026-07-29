import type { Metadata } from "next";

import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { primaryButtonClassName } from "@/components/ui/PrimaryButton";
import { sectionPadding } from "@/lib/section-padding";

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
          <form className="space-y-6 text-left">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium uppercase tracking-[0.05em]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium uppercase tracking-[0.05em]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium uppercase tracking-[0.05em]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full resize-none border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none"
              />
            </div>
            <button type="submit" className={`w-full ${primaryButtonClassName}`}>
              Send Inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
