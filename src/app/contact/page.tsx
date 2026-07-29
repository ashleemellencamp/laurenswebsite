import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Inquire about wedding photography availability and packages.",
};

export default function ContactPage() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="mb-4 text-5xl font-light">Let&apos;s Connect</h1>
        <p className="mb-12 text-warm-gray">
          Tell me about your wedding date, location, and vision. I&apos;d love
          to hear from you.
        </p>
        <form className="space-y-6 text-left">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm uppercase tracking-wider">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border border-blush bg-transparent px-4 py-3 focus:border-charcoal focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm uppercase tracking-wider">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-blush bg-transparent px-4 py-3 focus:border-charcoal focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm uppercase tracking-wider">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-none border border-blush bg-transparent px-4 py-3 focus:border-charcoal focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-charcoal py-3 text-sm uppercase tracking-widest text-cream transition hover:bg-warm-gray"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
