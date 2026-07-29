export const portfolioCategories = [
  { id: "engagements", label: "Engagements" },
  { id: "weddings", label: "Weddings" },
  { id: "elopements", label: "Elopements" },
  { id: "portraits", label: "Portraits" },
] as const;

export type PortfolioCategoryId = (typeof portfolioCategories)[number]["id"];

export type PortfolioFilterId = PortfolioCategoryId | "all";

export function isPortfolioCategoryId(
  value: string | undefined,
): value is PortfolioCategoryId {
  return portfolioCategories.some((category) => category.id === value);
}

export function portfolioHref(category?: PortfolioCategoryId) {
  return category ? `/portfolio?category=${category}` : "/portfolio";
}

export function parsePortfolioFilter(
  value: string | undefined,
): PortfolioFilterId {
  return isPortfolioCategoryId(value) ? value : "all";
}

export function getPortfolioCategoryLabel(id: PortfolioCategoryId) {
  return portfolioCategories.find((category) => category.id === id)?.label ?? id;
}
