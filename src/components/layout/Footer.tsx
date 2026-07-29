import Link from "next/link";

import { footerNavLinks } from "@/lib/nav-links";
import { sectionPadding } from "@/lib/section-padding";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={`border-t border-blue-light/30 bg-cream ${sectionPadding}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {footerNavLinks.map(({ href, label }) => (
              <li key={label}>
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

        <div className="flex flex-col gap-3 text-sm text-body">
          <p>
            &copy; {year} {siteConfig.name} Photography
          </p>
          <p>{siteConfig.footerTagline}</p>
        </div>
      </div>
    </footer>
  );
}
