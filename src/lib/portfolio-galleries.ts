import type { PortfolioCategoryId } from "@/lib/portfolio-categories";

export type PortfolioGalleryImage = {
  id: number;
  aspectClass?: string;
  src?: string;
  alt?: string;
  tone?: string;
};

export type PortfolioGallery = {
  id: string;
  title: string;
  description: string;
  category: PortfolioCategoryId;
  /** Optional manual accent override (hex). Auto-extracted from photos when omitted. */
  accentColor?: string;
  images: PortfolioGalleryImage[];
};

const portraitFrameClass = "aspect-[2/3] w-[min(391px,70vw)]";
const landscapeFrameClass = "aspect-[3/2] w-[min(492px,85vw)]";

export const portfolioGalleries: PortfolioGallery[] = [
  {
    id: "nunelly-lake-session",
    title: "An Afternoon on the Lake",
    category: "engagements",
    accentColor: "#3f5340",
    description:
      "A slow summer day on the water — dockside laughter, forest paths, paddle boats, and the kind of quiet closeness that doesn't need a crowd.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/nunelly-lake-session/01.jpg",
        alt: "Couple sitting together on a wooden dock over a lake",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/nunelly-lake-session/02.jpg",
        alt: "Couple walking hand in hand along a grassy path by the water",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/nunelly-lake-session/03.jpg",
        alt: "Couple sharing a quiet moment by the lake",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/nunelly-lake-session/04.jpg",
        alt: "Couple walking away together on a path beside a pond",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/nunelly-lake-session/05.jpg",
        alt: "Couple embracing on a forest path at golden hour",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/nunelly-lake-session/06.jpg",
        alt: "Couple laughing together outdoors by the lake",
        aspectClass: portraitFrameClass,
      },
      {
        id: 7,
        src: "/images/portfolio/nunelly-lake-session/07.jpg",
        alt: "Couple on a paddle boat in the middle of the lake",
        aspectClass: portraitFrameClass,
      },
      {
        id: 8,
        src: "/images/portfolio/nunelly-lake-session/08.jpg",
        alt: "Couple at the lake shore stepping off a paddle boat",
        aspectClass: portraitFrameClass,
      },
      {
        id: 9,
        src: "/images/portfolio/nunelly-lake-session/09.jpg",
        alt: "Couple sharing an intimate moment surrounded by trees",
        aspectClass: portraitFrameClass,
      },
      {
        id: 10,
        src: "/images/portfolio/nunelly-lake-session/10.jpg",
        alt: "Couple standing together in a sunlit meadow",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "mcminnville-wedding",
    title: "Black Brick & Forest Light",
    category: "weddings",
    accentColor: "#2f2f2f",
    description:
      "Portraits against black brick, a veil caught in the forest wind, and a ceremony that ended with a dip — a celebration filled with movement, mood, and the people they love most.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/mcminnville-wedding/01.jpg",
        alt: "Bride and groom standing together in front of a black brick wall",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/mcminnville-wedding/02.jpg",
        alt: "Bride and groom sharing a kiss in front of an arched window",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/mcminnville-wedding/03.jpg",
        alt: "Close portrait of the bride and groom at their wedding venue",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/mcminnville-wedding/04.jpg",
        alt: "Bride and groom in the forest with a long veil flowing in the wind",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/mcminnville-wedding/05.jpg",
        alt: "Bride and groom walking hand in hand through a wooded path",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/mcminnville-wedding/06.jpg",
        alt: "Bride and groom standing still as the wedding party rushes past around them",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 7,
        src: "/images/portfolio/mcminnville-wedding/07.jpg",
        alt: "Groom dipping the bride for a kiss at the end of the ceremony aisle",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "las-vegas-wedding",
    title: "A Neon Wedding",
    category: "elopements",
    accentColor: "#a04a3f",
    description:
      "Vows beneath the Lady Luck sign, neon-lit streets, and a late-night pizza stop — a Vegas wedding that traded tradition for something entirely their own.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/las-vegas-wedding/01.jpg",
        alt: "Bride and groom exchanging vows in front of the Lady Luck neon sign",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/las-vegas-wedding/02.jpg",
        alt: "Groom dipping the bride among vintage neon signs at the Neon Museum",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/las-vegas-wedding/03.jpg",
        alt: "Bride in a short white dress and veil adjusting sunglasses in front of a vintage sign",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/las-vegas-wedding/04.jpg",
        alt: "Bride and groom walking hand in hand across a Las Vegas street",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/las-vegas-wedding/05.jpg",
        alt: "Bride and groom posing together with the Vegas neon sign behind them",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/las-vegas-wedding/06.jpg",
        alt: "Bride and groom laughing while eating pizza together at night",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "manchester-wedding",
    title: "A Rainy Barn Wedding",
    category: "weddings",
    accentColor: "#5c4048",
    description:
      "Rain on the lake, vows on the dock, and a white barn glowing through the mist — burgundy blooms, pampas grass, and a celebration that embraced every weathered moment.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/manchester-wedding/01.jpg",
        alt: "Bride and groom standing together on the porch of a white barn wedding venue",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/manchester-wedding/02.jpg",
        alt: "Wedding ceremony on a lakeside dock viewed through a barn window on a rainy day",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/manchester-wedding/03.jpg",
        alt: "Bride and groom laughing together during their dockside ceremony",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/manchester-wedding/04.jpg",
        alt: "Bride and groom standing under a floral arch with a clear umbrella on a rainy dock",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/manchester-wedding/05.jpg",
        alt: "Close detail of a cascading burgundy and blush bridal bouquet",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "sedona-portraits",
    title: "Desert Portraits",
    category: "portraits",
    accentColor: "#7a4435",
    description:
      "Intimate portraits against Sedona's red rock — close and unhurried, white linen in the desert light, and moments that blur the line between still and in-motion.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/sedona-portraits/01.jpg",
        alt: "Close-up portrait of a couple with their faces pressed together",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/sedona-portraits/02.jpg",
        alt: "Black and white portrait of a couple cheek to cheek",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/sedona-portraits/03.jpg",
        alt: "Couple sharing a quiet moment during their Sedona portrait session",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/sedona-portraits/04.jpg",
        alt: "Couple standing back to back in the Sedona desert wearing white suits",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/sedona-portraits/05.jpg",
        alt: "Couple holding hands among red rock formations in Sedona",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/sedona-portraits/06.jpg",
        alt: "Woman in a white blazer looking up toward a red rock butte in Sedona",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 7,
        src: "/images/portfolio/sedona-portraits/07.jpg",
        alt: "Softly blurred portrait of a couple embracing in the desert",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "franklin-engagement",
    title: "A Downtown Engagement",
    category: "engagements",
    accentColor: "#7a6b5a",
    description:
      "Golden hour in downtown Franklin — courthouse columns, the glow of the Franklin Theatre marquee, and quiet doorways made for two.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/franklin-engagement/01.jpg",
        alt: "Couple standing together on the steps of a classical courthouse at golden hour",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/franklin-engagement/02.jpg",
        alt: "Couple embracing in front of the Franklin Theatre with motion-blurred traffic",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/franklin-engagement/03.jpg",
        alt: "Engaged couple holding hands in front of tall wooden doors flanked by columns",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/franklin-engagement/04.jpg",
        alt: "Couple standing together in a brick doorway on a historic Franklin street",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/franklin-engagement/05.jpg",
        alt: "Close portrait of a couple about to kiss in a rustic brick entryway",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "chattanooga-engagement",
    title: "An Autumn Engagement",
    category: "engagements",
    accentColor: "#6d5c48",
    description:
      "Autumn along the river — fallen leaves underfoot, warm knit layers, and quiet moments on the rocks that feel like the start of something.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/chattanooga-engagement/01.jpg",
        alt: "Engaged couple walking hand in hand along a rocky riverbank in autumn",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/chattanooga-engagement/02.jpg",
        alt: "Couple sitting together on rocks beside a calm forest river",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/chattanooga-engagement/03.jpg",
        alt: "Close portrait of a couple holding hands on rocks by the water",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/chattanooga-engagement/04.jpg",
        alt: "Couple walking through a leaf-covered forest path holding hands",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/chattanooga-engagement/05.jpg",
        alt: "Couple walking away together down an autumn woodland trail",
        aspectClass: portraitFrameClass,
      },
    ],
  },
  {
    id: "flagstaff-engagement",
    title: "An Engagement in the Aspens",
    category: "engagements",
    accentColor: "#556b4a",
    description:
      "Snow in the aspens, a mattress in the woods, and a vintage TV playing your favorite scene — playful, intimate, and entirely their own.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/flagstaff-engagement/01.jpg",
        alt: "Couple laughing together on a mattress in a snowy aspen forest beside a vintage television",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/flagstaff-engagement/02.jpg",
        alt: "Couple sitting on a white blanket in the woods with foreheads touching",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/flagstaff-engagement/03.jpg",
        alt: "Couple sharing a kiss while seated on a white blanket in an aspen grove",
        aspectClass: portraitFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/flagstaff-engagement/04.jpg",
        alt: "Close portrait of an engaged couple smiling with foreheads nearly touching",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/flagstaff-engagement/05.jpg",
        alt: "Intimate close-up of a couple in soft natural light among the trees",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/flagstaff-engagement/06.jpg",
        alt: "Black and white detail of a vintage television showing a couple in the snowy forest",
        aspectClass: landscapeFrameClass,
      },
    ],
  },
  {
    id: "phoenix-portraits",
    title: "Morning Portraits",
    category: "portraits",
    accentColor: "#8a7560",
    description:
      "A slow morning in Phoenix — sun through the windows, white linen, soft laughter, and the kind of unhurried closeness that feels like home.",
    images: [
      {
        id: 1,
        src: "/images/portfolio/phoenix-portraits/01.jpg",
        alt: "Couple sharing a quiet moment on a bed in a bright Phoenix bedroom",
        aspectClass: portraitFrameClass,
      },
      {
        id: 2,
        src: "/images/portfolio/phoenix-portraits/02.jpg",
        alt: "Black and white portrait of a couple embracing on a bed by sunlit windows",
        aspectClass: portraitFrameClass,
      },
      {
        id: 3,
        src: "/images/portfolio/phoenix-portraits/03.jpg",
        alt: "Black and white portrait of a couple lying together on white sheets",
        aspectClass: landscapeFrameClass,
      },
      {
        id: 4,
        src: "/images/portfolio/phoenix-portraits/04.jpg",
        alt: "Black and white portrait of a woman laughing on a bed",
        aspectClass: portraitFrameClass,
      },
      {
        id: 5,
        src: "/images/portfolio/phoenix-portraits/05.jpg",
        alt: "Black and white close-up of a couple smiling under white sheets",
        aspectClass: portraitFrameClass,
      },
      {
        id: 6,
        src: "/images/portfolio/phoenix-portraits/06.jpg",
        alt: "Couple laughing together under rumpled white bedsheets",
        aspectClass: portraitFrameClass,
      },
      {
        id: 7,
        src: "/images/portfolio/phoenix-portraits/07.jpg",
        alt: "Intimate close-up of a couple holding hands under white linen",
        aspectClass: portraitFrameClass,
      },
      {
        id: 8,
        src: "/images/portfolio/phoenix-portraits/08.jpg",
        alt: "Close portrait of a couple in warm natural light",
        aspectClass: portraitFrameClass,
      },
    ],
  },
];

export function filterGalleriesByCategory(
  category: PortfolioCategoryId | "all",
) {
  if (category === "all") {
    return portfolioGalleries;
  }

  return portfolioGalleries.filter((gallery) => gallery.category === category);
}

const categoryCoverOverrides: Partial<
  Record<PortfolioCategoryId, { src: string; alt: string }>
> = {
  elopements: {
    src: "/images/portfolio/las-vegas-wedding/05.jpg",
    alt: "Bride and groom posing together with the Vegas neon sign behind them",
  },
};

const categoryCoverFallbacks: Record<
  PortfolioCategoryId,
  { src: string; alt: string }
> = {
  weddings: {
    src: "/images/home/weddings-card.jpg",
    alt: "Bride holding a floral bouquet",
  },
  elopements: {
    src: "/images/portfolio/las-vegas-wedding/05.jpg",
    alt: "Bride and groom posing together with the Vegas neon sign behind them",
  },
  engagements: {
    src: "/images/portfolio/nunelly-lake-session/01.jpg",
    alt: "Couple sitting together on a wooden dock over a lake",
  },
  portraits: {
    src: "/images/home/portraits-card.jpg",
    alt: "Close-up portrait of a couple",
  },
};

export function getPortfolioCategoryCoverImage(category: PortfolioCategoryId) {
  if (categoryCoverOverrides[category]) {
    return categoryCoverOverrides[category];
  }

  for (const gallery of portfolioGalleries) {
    if (gallery.category !== category) continue;

    const image = gallery.images.find((item) => item.src);
    if (image?.src) {
      return { src: image.src, alt: image.alt ?? gallery.title };
    }
  }

  return categoryCoverFallbacks[category];
}
