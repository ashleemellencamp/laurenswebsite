"use client";

import {
  portfolioCategories,
  type PortfolioFilterId,
} from "@/lib/portfolio-categories";

type PortfolioFilterBarProps = {
  activeFilter: PortfolioFilterId;
  onFilterChange: (filter: PortfolioFilterId) => void;
};

const filters: { id: PortfolioFilterId; label: string }[] = [
  { id: "all", label: "All" },
  ...portfolioCategories.map(({ id, label }) => ({ id, label })),
];

export function PortfolioFilterBar({
  activeFilter,
  onFilterChange,
}: PortfolioFilterBarProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
      role="tablist"
      aria-label="Filter portfolio galleries"
    >
      {filters.map(({ id, label }) => {
        const isActive = activeFilter === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(id)}
            className={`font-sans text-sm uppercase tracking-[0.05em] transition hover:text-slate ${
              isActive ? "text-slate underline underline-offset-4" : "text-body"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
