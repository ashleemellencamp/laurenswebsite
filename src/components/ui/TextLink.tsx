import Link from "next/link";

import { textLinkClassName } from "@/lib/typography";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  showArrow?: boolean;
  className?: string;
};

function ArrowIcon() {
  return (
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
  );
}

export function TextLink({
  href,
  children,
  showArrow = false,
  className = "",
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`group ${textLinkClassName} ${className}`}
    >
      {children}
      {showArrow && <ArrowIcon />}
    </Link>
  );
}
