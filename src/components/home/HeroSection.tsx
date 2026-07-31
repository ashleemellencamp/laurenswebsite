import Link from "next/link";

import { MobileNav } from "@/components/layout/MobileNav";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { mainNavLinks } from "@/lib/nav-links";
import { sectionPaddingX } from "@/lib/section-padding";
import { heroNavLinkClassName } from "@/lib/typography";

import { heroGradientOverlay } from "@/lib/hero-gradient-overlay";

export function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden lg:min-h-screen lg:h-auto">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-background.png"
            alt=""
            fetchPriority="high"
            className="absolute top-[-59.3%] left-[-65.32%] h-[211.57%] w-[225.65%] max-w-none object-cover max-sm:top-[-45%] max-sm:left-[-40%] max-sm:h-[180%] max-sm:w-[180%]"
          />
        </div>

        <div
          className="absolute inset-0"
          style={{ backgroundImage: heroGradientOverlay }}
        />
      </div>

      <nav
        className={`absolute top-0 right-0 left-0 z-30 flex items-center justify-between ${sectionPaddingX}`}
        style={{ paddingTop: "max(1.5rem, env(safe-area-inset-top))" }}
      >
        <Link
          href="/"
          className="relative z-30 font-script text-xl text-white sm:text-2xl lg:hidden"
        >
          Lauren Nichols
        </Link>

        <ul className="hidden items-center gap-8 lg:flex lg:ml-auto">
          {mainNavLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`relative z-30 ${heroNavLinkClassName}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <MobileNav variant="light" />
      </nav>

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="!font-script text-[clamp(2.75rem,10vw,6rem)] leading-none !text-white lg:text-[96px]">
          Lauren Nichols
        </h1>

        <p className="mt-5 max-w-md text-base leading-relaxed tracking-[0.8px] text-white sm:mt-6 sm:max-w-2xl sm:text-base">
          Wedding &amp; Portrait Photographer — Photographing love stories across
          Tennessee and wherever they take you.
        </p>

        <PrimaryButton href="/portfolio" className="pointer-events-auto mt-8 sm:mt-9">
          View My Work
        </PrimaryButton>
      </div>
    </section>
  );
}
