import Link from "next/link";

import { footerNavLinks } from "@/lib/nav-links";
import { sectionPadding } from "@/lib/section-padding";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-blue-light/30 bg-cream ${sectionPadding}`}
      style={{ paddingBottom: "max(6rem, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center sm:gap-8">
        <nav aria-label="Footer">
          <ul className="flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3">
            {footerNavLinks.map(({ href, label, ...link }) => {
              const className =
                "inline-flex min-h-11 w-full items-center justify-center px-4 font-sans text-sm uppercase tracking-[0.05em] text-body transition hover:text-slate sm:w-auto sm:px-2";

              return (
                <li key={label} className="w-full sm:w-auto">
                  {"external" in link && link.external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className={className}>
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
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
