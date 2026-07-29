import Link from "next/link";

import { PrimaryButton } from "@/components/ui/PrimaryButton";

import { mainNavLinks } from "@/lib/nav-links";
import { sectionPaddingX } from "@/lib/section-padding";

import { heroGradientOverlay } from "@/lib/hero-gradient-overlay";



export function HeroSection() {

  return (

    <section className="relative min-h-screen w-full overflow-hidden">

      <div aria-hidden className="pointer-events-none absolute inset-0">

        <div className="absolute inset-0 overflow-hidden">

          {/* eslint-disable-next-line @next/next/no-img-element */}

          <img

            src="/images/hero-background.png"

            alt=""

            fetchPriority="high"

            className="absolute top-[-59.3%] left-[-65.32%] h-[211.57%] w-[225.65%] max-w-none object-cover"

          />

        </div>

        <div

          className="absolute inset-0"

          style={{ backgroundImage: heroGradientOverlay }}

        />

      </div>



      <nav
        className={`absolute top-[32px] right-0 left-0 z-30 flex items-center justify-end gap-6 ${sectionPaddingX} max-sm:top-6 max-sm:gap-4`}
      >

        {mainNavLinks.map(({ href, heroLabel }) => (

          <Link

            key={href}

            href={href}

            className="relative z-30 font-serif text-base leading-none tracking-[0.8px] whitespace-nowrap text-white transition hover:opacity-80"

          >

            {heroLabel}

          </Link>

        ))}

      </nav>



      <div className="pointer-events-none relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="!font-script text-[clamp(3rem,8.89vw,6rem)] leading-none !text-white lg:text-[96px]">
          Lauren Nichols
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed tracking-[0.8px] text-white max-sm:text-sm">
          Wedding &amp; Portrait Photographer — Photographing love stories across
          Tennessee and wherever they take you.
        </p>

        <PrimaryButton href="/portfolio" className="pointer-events-auto mt-9">
          View My Work
        </PrimaryButton>
      </div>

    </section>

  );

}

