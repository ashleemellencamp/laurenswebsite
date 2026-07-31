"use client";

import { useState } from "react";

import { TextLink } from "@/components/ui/TextLink";
import { portfolioHref } from "@/lib/portfolio-categories";
import { sectionPaddingX } from "@/lib/section-padding";

type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  href: string;
  images: { id: number; tone: string }[];
};

const services: Service[] = [
  {
    id: "weddings",
    number: "I.",
    title: "Weddings",
    description:
      "From first look to last dance, I document the full arc of your day with an editorial eye and a documentary heart.",
    href: portfolioHref("weddings"),
    images: [
      { id: 1, tone: "bg-slate/70" },
      { id: 2, tone: "bg-slate/80" },
      { id: 3, tone: "bg-slate/60" },
    ],
  },
  {
    id: "elopements",
    number: "II.",
    title: "Elopements",
    description:
      "Intimate adventures for couples who want their vows somewhere wild, quiet, or entirely their own.",
    href: portfolioHref("elopements"),
    images: [
      { id: 1, tone: "bg-slate/75" },
      { id: 2, tone: "bg-slate/65" },
      { id: 3, tone: "bg-slate/80" },
    ],
  },
  {
    id: "engagements",
    number: "III.",
    title: "Engagements",
    description:
      "Relaxed sessions for couples in the in-between — celebrating what's next with photos that feel natural, honest, and entirely yours.",
    href: portfolioHref("engagements"),
    images: [
      { id: 1, tone: "bg-slate/70" },
      { id: 2, tone: "bg-slate/75" },
      { id: 3, tone: "bg-slate/65" },
    ],
  },
  {
    id: "portraits",
    number: "IV.",
    title: "Portraits",
    description:
      "Family sessions, anniversaries, and milestone portraits crafted to feel effortless and deeply personal.",
    href: portfolioHref("portraits"),
    images: [
      { id: 1, tone: "bg-slate/70" },
      { id: 2, tone: "bg-slate/80" },
      { id: 3, tone: "bg-slate/65" },
    ],
  },
];

export function ServicesSection() {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section className="border-t border-slate/10">
      {services.map((service) => {
        const isActive = activeId === service.id;

        return (
          <div
            key={service.id}
            className="border-b border-slate/10 bg-cream"
          >
            <button
              type="button"
              onClick={() => setActiveId(service.id)}
              className={`flex w-full items-center py-10 text-left transition hover:opacity-80 lg:py-12 ${sectionPaddingX}`}
              aria-expanded={isActive}
            >
              <span className="text-3xl leading-none lg:text-5xl">
                {service.number} {service.title}
              </span>
            </button>

            {isActive && (
              <div className={`pb-16 lg:pb-24 ${sectionPaddingX}`}>
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
                  <p className="max-w-lg text-base leading-relaxed text-body lg:flex-1">
                    {service.description}
                  </p>
                  <TextLink href={service.href} className="shrink-0 self-start lg:self-center">
                    Learn More
                  </TextLink>
                </div>

                <div className="mt-10 flex gap-4 overflow-x-auto pb-2 lg:mt-12 lg:gap-6">
                  {service.images.map(({ id, tone }) => (
                    <div
                      key={id}
                      aria-hidden
                      className={`aspect-square w-[min(484px,80vw)] shrink-0 rounded-2xl ${tone}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
