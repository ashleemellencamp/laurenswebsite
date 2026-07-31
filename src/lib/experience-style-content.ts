export type ExperienceStyleVariant =
  | "styleCandid"
  | "styleLightMovement"
  | "styleColor";

type ExperienceStylePhotoBlock = {
  eyebrow: string;
  heading: string;
  body: string;
  photoAlign: "left" | "right";
  image: {
    src: string;
    alt: string;
  };
};

type ExperienceStyleColorBlock = {
  eyebrow: string;
  heading: string;
  body: string;
  showPalette: true;
};

export const experienceStyleContent = {
  styleCandid: {
    eyebrow: "Candid Moments",
    heading: "The real stuff, not the posed stuff",
    body:
      "I'm looking for the laugh that cracks you open, the quiet glance across the room, and the tiny in-between moments you'll forget happened until you see them again. A little direction when you need it — then I step back and let things unfold.",
    photoAlign: "left",
    image: {
      src: "/images/portfolio/franklin-engagement/05.jpg",
      alt: "Couple sharing an intimate moment in a rustic brick entryway",
    },
  },
  styleLightMovement: {
    eyebrow: "Light & Movement",
    heading: "Chasing good light, letting things unfold",
    body:
      "Golden hour through the trees, soft window light in a getting-ready room, or that moody last light before the sun dips — I build around the light your day actually gives us. I lean into natural movement and real interaction too, giving a bit of direction when you need it, then stepping back when the moment is already happening on its own.",
    photoAlign: "left",
    image: {
      src: "/images/portfolio/nunelly-lake-session/05.jpg",
      alt: "Couple embracing on a forest path at golden hour",
    },
  },
  styleColor: {
    eyebrow: "Color & Tone",
    heading: "True to the day you lived",
    body:
      "My editing stays honest to the tones, skin, and atmosphere of your day — warm when it was warm, soft when it was soft. These swatches are pulled straight from my portfolio, a little snapshot of the palette I gravitate toward.",
    showPalette: true,
  },
} satisfies Record<
  ExperienceStyleVariant,
  ExperienceStylePhotoBlock | ExperienceStyleColorBlock
>;

export type ExperienceStylePhotoVariant = Exclude<
  ExperienceStyleVariant,
  "styleColor"
>;

/** Shared width for photos and palette cards in the experience style sections. */
export const experienceStyleMediaClassName =
  "mx-auto w-full max-w-[22rem] sm:max-w-[23rem] lg:mx-0 lg:max-w-[24rem]";

export const experienceStyleOrder: ExperienceStyleVariant[] = [
  "styleCandid",
  "styleColor",
  "styleLightMovement",
];
