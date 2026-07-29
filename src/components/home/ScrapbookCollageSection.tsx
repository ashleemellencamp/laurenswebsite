import Image from "next/image";

import { TapedPhotoCard } from "@/components/scrapbook/TapedPhotoCard";
import { sectionPadding } from "@/lib/section-padding";

const FRAME_WIDTH = 584.639;
const FRAME_HEIGHT = 519.069;

function px(value: number) {
  return `${(value / FRAME_WIDTH) * 100}%`;
}

function py(value: number) {
  return `${(value / FRAME_HEIGHT) * 100}%`;
}

function pw(value: number) {
  return `${(value / FRAME_WIDTH) * 100}%`;
}

function ph(value: number) {
  return `${(value / FRAME_HEIGHT) * 100}%`;
}

function LocationDoodle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      style={style}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/home/scrapbook/doodle-location.svg"
        alt=""
        className="size-full rotate-[14.05deg] object-contain"
      />
    </div>
  );
}

export function ScrapbookCollageSection() {
  return (
    <section className={`overflow-x-clip bg-cream ${sectionPadding}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-10">
        <div className="relative z-10 overflow-visible pb-2 lg:pb-6">
          <div
            className="relative mx-auto w-full max-w-[700px] origin-center scale-100 lg:mx-0 lg:max-w-none lg:origin-[72%_50%] lg:scale-[1.2]"
            style={{ aspectRatio: `${FRAME_WIDTH} / ${FRAME_HEIGHT}` }}
          >
          <Image
            src="/images/home/scrapbook/texture-middle.png"
            alt=""
            aria-hidden
            width={462}
            height={270}
            className="pointer-events-none absolute z-0 object-cover opacity-95"
            style={{
              left: px(122.639),
              top: py(91.99),
              width: pw(462),
              height: ph(270),
            }}
          />

          <TapedPhotoCard
            src="/images/home/scrapbook/photo-desert.jpg"
            alt="Lauren Nichols standing in a desert landscape"
            orientation="portrait"
            className="absolute z-10 rotate-[8.1deg]"
            style={{
              left: px(77.02),
              top: py(39.21),
              width: pw(245.48),
            }}
            tapeClassName="-top-3 left-[58%] -translate-x-1/2 rotate-[3deg] sm:-top-3.5"
            imageClassName="object-[center_18%]"
          />

          <LocationDoodle
            className="z-20"
            style={{
              left: px(55.08),
              top: py(0),
              width: pw(238.44),
              height: ph(196.98),
            }}
          />

          <TapedPhotoCard
            src="/images/home/scrapbook/photo-van.jpg"
            alt="Lauren Nichols at the back of a camper van"
            orientation="landscape"
            className="absolute z-30 rotate-[1.12deg]"
            style={{
              left: px(166.27),
              top: py(289.8),
              width: pw(297.93),
            }}
            tapeClassName="-top-3 left-[42%] -translate-x-1/2 -rotate-[1deg] sm:-top-3.5"
            imageClassName="object-[center_35%]"
            sizes="(max-width: 640px) 55vw, 320px"
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/scrapbook/doodle-arrow.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-40 object-contain"
            style={{
              left: px(238.64),
              top: py(208.99),
              width: pw(105),
              height: ph(105),
            }}
          />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/home/scrapbook/doodle-camera.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute z-50 object-contain"
            style={{
              left: px(112),
              top: py(367.99),
              width: pw(62),
              height: ph(53),
            }}
          />
          </div>
        </div>

        <div className="relative z-0 text-center lg:text-left">
          <h2 className="text-[clamp(1.75rem,3.5vw,2.25rem)] leading-snug">
            Hey, I&apos;m Lauren!
          </h2>
          <p className="mt-6 text-base leading-relaxed tracking-[0.8px] text-body">
            A wedding photographer specializing in candid, cinematic imagery rooted
            in authenticity and connection. I approach every wedding with
            intentionality — paying attention to the subtle moments, the meaningful
            interactions, and the quiet in-between details. My sessions are
            lighthearted and fun, with plenty of laughter along the way. I believe
            your photos should feel like a movie, but one where you are the main
            characters— real, comfortable, but most importantly, they should feel
            like you.
          </p>
        </div>
      </div>
    </section>
  );
}
