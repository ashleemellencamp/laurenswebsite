import Link from "next/link";

import { mainNavLinks } from "@/lib/nav-links";
import { sectionPaddingX } from "@/lib/section-padding";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-blue-light/30 bg-cream/90 backdrop-blur-sm">
      <nav
        className={`flex items-center justify-between py-5 ${sectionPaddingX}`}
      >
        <Link href="/" className="font-script text-2xl text-slate">
          Lauren Nichols
        </Link>
        <ul className="flex flex-wrap justify-end gap-x-8 gap-y-2">
          {mainNavLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sans text-sm uppercase tracking-[0.05em] text-body transition hover:text-slate"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
