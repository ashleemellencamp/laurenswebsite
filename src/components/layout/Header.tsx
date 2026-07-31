import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { mainNavLinks } from "@/lib/nav-links";
import { sectionPaddingX } from "@/lib/section-padding";
import { mainNavLinkClassName } from "@/lib/typography";

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 border-b border-blue-light/30 bg-cream/90 backdrop-blur-sm"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav
        className={`flex items-center justify-between py-4 lg:py-5 ${sectionPaddingX}`}
      >
        <Link href="/" className="font-script text-xl text-slate sm:text-2xl">
          Lauren Nichols
        </Link>

        <ul className="hidden items-center gap-x-8 lg:flex">
          {mainNavLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={mainNavLinkClassName}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileNav variant="dark" />
      </nav>
    </header>
  );
}
