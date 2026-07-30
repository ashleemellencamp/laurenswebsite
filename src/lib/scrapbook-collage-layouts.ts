import type { ScrapbookIntroVariant } from "@/lib/scrapbook-intro-content";

import { aboutTravelImages } from "@/lib/about-travel-images";

export type ScrapbookPhotoLayout = {
  src: string;
  alt: string;
  orientation: "portrait" | "landscape";
  left: number;
  top: number;
  width: number;
  rotate: string;
  tapeClassName?: string;
  imageClassName?: string;
  sizes?: string;
};

export type ScrapbookDoodleLayout = {
  type: "location" | "arrow" | "camera";
  left: number;
  top: number;
  width: number;
  height: number;
  rotate?: string;
};

export type ScrapbookTextureLayout = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type ScrapbookCollageLayout = {
  photos: ScrapbookPhotoLayout[];
  doodles: ScrapbookDoodleLayout[];
  texture?: ScrapbookTextureLayout;
};

export const scrapbookCollageLayouts: Record<
  ScrapbookIntroVariant,
  ScrapbookCollageLayout
> = {
  home: {
    texture: { left: 122.639, top: 91.99, width: 462, height: 270 },
    photos: [
      {
        src: "/images/home/scrapbook/photo-desert.jpg",
        alt: "Lauren Nichols standing in a desert landscape",
        orientation: "portrait",
        left: 77.02,
        top: 39.21,
        width: 245.48,
        rotate: "rotate-[8.1deg]",
        tapeClassName:
          "-top-3 left-[58%] -translate-x-1/2 rotate-[3deg] sm:-top-3.5",
        imageClassName: "object-[center_18%]",
      },
      {
        src: "/images/home/scrapbook/photo-van.jpg",
        alt: "Lauren Nichols at the back of a camper van",
        orientation: "landscape",
        left: 166.27,
        top: 289.8,
        width: 297.93,
        rotate: "rotate-[1.12deg]",
        tapeClassName:
          "-top-3 left-[42%] -translate-x-1/2 -rotate-[1deg] sm:-top-3.5",
        imageClassName: "object-[center_35%]",
        sizes: "(max-width: 640px) 55vw, 320px",
      },
    ],
    doodles: [
      {
        type: "location",
        left: 55.08,
        top: 0,
        width: 238.44,
        height: 196.98,
      },
      { type: "arrow", left: 238.64, top: 208.99, width: 105, height: 105 },
      { type: "camera", left: 112, top: 367.99, width: 62, height: 53 },
    ],
  },
  about: {
    photos: [
      {
        src: aboutTravelImages.redRocks.src,
        alt: aboutTravelImages.redRocks.alt,
        orientation: "portrait",
        left: 286,
        top: 28,
        width: 228,
        rotate: "-rotate-[5.5deg]",
        tapeClassName:
          "-top-3 left-[52%] -translate-x-1/2 rotate-[-2deg] sm:-top-3.5",
        imageClassName: "object-[center_28%]",
        sizes: "(max-width: 640px) 50vw, 280px",
      },
      {
        src: aboutTravelImages.camperVan.src,
        alt: aboutTravelImages.camperVan.alt,
        orientation: "landscape",
        left: 34,
        top: 272,
        width: 286,
        rotate: "rotate-[2.8deg]",
        tapeClassName:
          "-top-3 left-[46%] -translate-x-1/2 rotate-[4deg] sm:-top-3.5",
        imageClassName: "object-[center_42%]",
        sizes: "(max-width: 640px) 58vw, 300px",
      },
    ],
    doodles: [],
  },
  thingsThatMoveMe: {
    photos: [
      {
        src: aboutTravelImages.coastalCliffs.src,
        alt: aboutTravelImages.coastalCliffs.alt,
        orientation: "landscape",
        left: 188,
        top: 18,
        width: 308,
        rotate: "-rotate-[2.4deg]",
        tapeClassName:
          "-top-3 left-[54%] -translate-x-1/2 rotate-[2deg] sm:-top-3.5",
        imageClassName: "object-[center_40%]",
        sizes: "(max-width: 640px) 62vw, 320px",
      },
      {
        src: aboutTravelImages.joshuaTreeNight.src,
        alt: aboutTravelImages.joshuaTreeNight.alt,
        orientation: "portrait",
        left: 52,
        top: 248,
        width: 214,
        rotate: "rotate-[6.8deg]",
        tapeClassName:
          "-top-3 left-[48%] -translate-x-1/2 -rotate-[3deg] sm:-top-3.5",
        imageClassName: "object-[center_45%]",
        sizes: "(max-width: 640px) 44vw, 240px",
      },
    ],
    doodles: [],
  },
};
