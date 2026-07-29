"use client";

import { useState } from "react";

import { investmentPackages } from "@/lib/investment-packages";
import { sectionPadding } from "@/lib/section-padding";

export function InvestmentPackagesSection() {
  const [activeId, setActiveId] = useState(investmentPackages[0].id);

  return (
    <section className={`bg-white ${sectionPadding}`}>
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[492px_1fr] lg:items-start lg:gap-16">
        <div
          aria-hidden
          className="aspect-[492/596] w-full rounded-2xl bg-slate/70 lg:sticky lg:top-28"
        />

        <div className="border-t border-slate/10">
          {investmentPackages.map((pkg) => {
            const isActive = activeId === pkg.id;

            return (
              <div key={pkg.id} className="border-b border-slate/10">
                <button
                  type="button"
                  onClick={() => setActiveId(pkg.id)}
                  className="flex w-full items-center justify-between gap-6 py-8 text-left transition hover:opacity-80 lg:py-10"
                  aria-expanded={isActive}
                >
                  <span className="text-2xl leading-none lg:text-4xl">
                    {pkg.number} {pkg.title}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-2xl leading-none text-slate lg:text-4xl"
                  >
                    {isActive ? "×" : "+"}
                  </span>
                </button>

                {isActive && (
                  <div className="pb-10 lg:pb-12">
                    <p className="max-w-xl text-base leading-relaxed text-body">
                      {pkg.description}
                    </p>
                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.7px] text-slate">
                      Prices begin at {pkg.priceFrom}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
