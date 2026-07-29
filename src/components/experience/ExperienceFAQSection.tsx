"use client";

import Image from "next/image";
import { useState } from "react";

import { experienceFAQ } from "@/lib/experience-faq";
import { sectionPaddingX } from "@/lib/section-padding";

export function ExperienceFAQSection() {
  const [activeId, setActiveId] = useState(experienceFAQ[0].id);

  return (
    <section className="border-t border-slate/10 bg-cream">
      {experienceFAQ.map((item) => {
        const isActive = activeId === item.id;

        return (
          <div key={item.id} className="border-b border-slate/10">
            <button
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`flex w-full items-center py-10 text-left transition hover:opacity-80 lg:py-12 ${sectionPaddingX}`}
              aria-expanded={isActive}
            >
              <span className="text-3xl leading-none lg:text-5xl">
                {item.question}
              </span>
            </button>

            {isActive && (
              <div className={`pb-16 lg:pb-24 ${sectionPaddingX}`}>
                <div
                  className={`grid gap-10 ${
                    item.hasImage
                      ? "lg:grid-cols-[1fr_minmax(280px,420px)] lg:items-start lg:gap-16"
                      : "max-w-3xl"
                  }`}
                >
                  <div>
                    {item.answerTitle && (
                      <p className="text-xl text-slate lg:text-2xl">
                        {item.answerTitle}
                      </p>
                    )}
                    <p
                      className={`text-base leading-relaxed text-body ${
                        item.answerTitle ? "mt-6" : ""
                      }`}
                    >
                      {item.answer}
                    </p>
                  </div>

                  {item.hasImage && item.imageSrc && (
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:max-w-[420px]">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 1024px) 100vw, 420px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
