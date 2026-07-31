"use client";

import { useState } from "react";

import { SectionEyebrow } from "@/components/ui/SectionEyebrow";
import { experienceFAQ } from "@/lib/experience-faq";
import { sectionPadding, sectionPaddingX } from "@/lib/section-padding";
import {
  mobileCenterLgLeftClassName,
  sectionBodyCenteredClassName,
  sectionBodySmallClassName,
  sectionHeadlineLargeClassName,
} from "@/lib/typography";

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`size-3.5 text-slate transition-transform duration-200 lg:size-4 ${
        isOpen ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function ExperienceFAQSection() {
  const [activeId, setActiveId] = useState<string | null>(experienceFAQ[0].id);

  function toggleItem(id: string) {
    setActiveId((current) => (current === id ? null : id));
  }

  return (
    <section className={`border-t border-slate/10 bg-cream ${sectionPadding}`}>
      <div className={`mx-auto max-w-3xl text-center ${sectionPaddingX}`}>
        <SectionEyebrow className="text-center">Common Questions</SectionEyebrow>
        <h2 className={sectionHeadlineLargeClassName}>
          Frequently Asked Questions
        </h2>
        <p className={`mx-auto mt-4 max-w-xl ${sectionBodyCenteredClassName}`}>
          A few things couples often ask before we start planning together.
        </p>
      </div>

      <ul className={`mx-auto mt-12 flex max-w-3xl flex-col gap-4 lg:mt-16 ${sectionPaddingX}`}>
        {experienceFAQ.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <div className="rounded-[2rem] bg-sage px-5 py-4 lg:px-7 lg:py-5">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={isActive}
                >
                  <span className="text-base leading-snug text-slate lg:text-lg">
                    {item.question}
                  </span>
                  <span className="flex size-[37px] shrink-0 items-center justify-center rounded-full bg-blue-light">
                    <ChevronIcon isOpen={isActive} />
                  </span>
                </button>

                {isActive && (
                  <div className="mt-4 rounded-2xl bg-white p-5 lg:p-6">
                    {item.answerTitle && (
                      <p
                        className={`text-base text-slate lg:text-lg ${mobileCenterLgLeftClassName}`}
                      >
                        {item.answerTitle}
                      </p>
                    )}
                    <p
                      className={`${sectionBodySmallClassName} ${
                        item.answerTitle ? "mt-4" : ""
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
