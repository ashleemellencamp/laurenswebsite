import { experienceTravelFaqImage } from "@/lib/experience-images";

export type ExperienceFAQItem = {
  id: string;
  question: string;
  answerTitle?: string;
  answer: string;
  imageSrc?: string;
  imageAlt?: string;
  hasImage?: boolean;
};

export const experienceFAQ: ExperienceFAQItem[] = [
  {
    id: "travel",
    question: "I love your work. Do you travel?",
    answer:
      "Of course! I'm based in Nashville but happily photograph weddings and sessions across the world. Reach out with your location and date, and I'll send over custom travel details.",
    imageSrc: experienceTravelFaqImage.src,
    imageAlt: experienceTravelFaqImage.alt,
    hasImage: true,
  },
  {
    id: "timeline",
    question: "When should we book?",
    answer:
      "Most couples book 9–14 months ahead for peak season weddings. Elopements and intimate celebrations often have more flexibility, but popular travel windows fill quickly — especially for destination dates. If you're planning something abroad, reaching out early helps us secure flights, timelines, and the best light.",
  },
  {
    id: "process",
    question: "What does working together look like?",
    answer:
      "We start with a discovery call to talk through your vision, location, and priorities. From there you'll receive a custom proposal, planning guide, and timeline support leading up to the day. On wedding day, I work quietly and intuitively — guiding when needed, stepping back when the moment speaks for itself.",
  },
];
