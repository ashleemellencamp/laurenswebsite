import { investmentPackages } from "@/lib/investment-packages";

export const plannedInvestmentOptions = investmentPackages.map((pkg) => ({
  value: pkg.id,
  label: pkg.priceFrom
    ? `${pkg.title} (starting at ${pkg.priceFrom})`
    : `${pkg.title} (inquire for pricing)`,
}));

export type ContactFormPayload = {
  fullName: string;
  fianceName?: string;
  phone: string;
  email: string;
  referralSource?: string;
  date: string;
  location: string;
  plannedInvestment: string;
  socialHandle?: string;
  weddingDetails?: string;
};

export function formatContactInquiryMessage(payload: ContactFormPayload) {
  const plannedInvestmentLabel =
    plannedInvestmentOptions.find(
      (option) => option.value === payload.plannedInvestment,
    )?.label ?? payload.plannedInvestment;

  const lines = [
    `Full Name: ${payload.fullName}`,
    payload.fianceName ? `Fiancé's Full Name: ${payload.fianceName}` : null,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    payload.referralSource
      ? `How did you hear about me?: ${payload.referralSource}`
      : null,
    `Date: ${payload.date}`,
    `Location: ${payload.location}`,
    `Planned Photography Investment: ${plannedInvestmentLabel}`,
    payload.socialHandle ? `Social Media Handle: ${payload.socialHandle}` : null,
    payload.weddingDetails
      ? `\nWedding Details:\n${payload.weddingDetails}`
      : null,
  ].filter(Boolean);

  return lines.join("\n");
}
