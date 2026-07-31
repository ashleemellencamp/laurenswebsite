export type ScrapbookIntroVariant = "home" | "about" | "thingsThatMoveMe";

type ScrapbookIntroContent = {
  eyebrow: string;
  heading: string;
  body: string;
  collageAlign: "left" | "right";
  background: "cream" | "white";
};

export const scrapbookIntroContent: Record<
  ScrapbookIntroVariant,
  ScrapbookIntroContent
> = {
  home: {
    eyebrow: "Meet Lauren",
    heading: "Hey, I'm Lauren",
    body:
      "A wedding photographer specializing in candid, cinematic imagery rooted in authenticity and connection. I approach every wedding with intentionality — paying attention to the subtle moments, the meaningful interactions, and the quiet in-between details. My sessions are lighthearted and fun, with plenty of laughter along the way. I believe your photos should feel like a movie, but one where you are the main characters— real, comfortable, but most importantly, they should feel like you.",
    collageAlign: "left",
    background: "cream",
  },
  about: {
    eyebrow: "Get to Know Me",
    heading: "Behind the Lens",
    body:
      "I'm based in Nashville, but my camera and I are always up for a road trip — especially if it ends somewhere with good light and a story worth telling. I started shooting because I loved the in-between moments more than the posed ones, and that still guides everything I do. When you work with me, you're getting someone who'll calm your nerves, hype you up, and quietly notice the details you'll want to remember forever.",
    collageAlign: "right",
    background: "white",
  },
  thingsThatMoveMe: {
    eyebrow: "My Inspirations",
    heading: "The Things That Move Me",
    body:
      "Golden hour drives with the windows down. Old records and film grain. The hum of a reception just before the music starts. People who love big, laugh loudly, and aren't afraid to be themselves in front of the camera.",
    collageAlign: "left",
    background: "white",
  },
};
