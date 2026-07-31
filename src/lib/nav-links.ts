export const mainNavLinks = [
  { href: "/portfolio", label: "Portfolio", heroLabel: "PORTFOLIO" },
  { href: "/about", label: "About", heroLabel: "ABOUT" },
  { href: "/investment", label: "Investment", heroLabel: "INVESTMENT" },
  { href: "/experience", label: "Experience", heroLabel: "EXPERIENCE" },
  { href: "/contact", label: "Contact", heroLabel: "CONTACT" },
] as const;

export const footerNavLinks = [
  ...mainNavLinks,
  { href: "/client-access", label: "Client Access", heroLabel: "CLIENT ACCESS" },
] as const;
