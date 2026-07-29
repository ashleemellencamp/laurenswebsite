import Link from "next/link";

import { sectionPadding } from "@/lib/section-padding";

export function ValueSection() {
  return (
    <section className={`bg-blue-light ${sectionPadding}`}>
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4 lg:text-left">
            <h2 className="font-serif text-[clamp(1.375rem,2.25vw,1.875rem)] font-normal leading-[1.3] text-slate">
              Your story,
              <br />
              naturally told.
            </h2>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <p className="text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.85] tracking-[0.8px] text-white">
              I&apos;m here to help you feel comfortable, present, and fully
              yourself. No stiff poses or forced smiles — just gentle guidance,
              movement, and space for the real moments to unfold.
            </p>
            <Link
              href="/experience"
              className="group mt-6 inline-flex items-center gap-2.5 font-serif text-sm font-normal uppercase tracking-[0.7px] text-slate transition hover:opacity-75"
            >
              The Experience
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M5 12H19M19 12L13 6M19 12L13 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
