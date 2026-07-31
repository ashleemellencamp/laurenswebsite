export type ClientAccessFAQItem = {
  id: string;
  question: string;
  answer: string;
};

export const clientAccessFAQ: ClientAccessFAQItem[] = [
  {
    id: "how-to-access",
    question: "How do I access my gallery?",
    answer:
      "After your session or wedding, Lauren will email you a private gallery link along with any password needed to view your photos. Open that link in your browser to browse, download, and share your images.",
  },
  {
    id: "lost-link",
    question: "I can't find my gallery link — what should I do?",
    answer:
      "Check your inbox (and spam folder) for an email from Lauren Nichols Photography or Pixieset. If you still can't find it, reach out to Lauren directly and she'll resend your link.",
  },
  {
    id: "when-ready",
    question: "When will my gallery be ready?",
    answer:
      "Gallery delivery timelines vary by collection type. Lauren will let you know when to expect your photos and will email you as soon as your private gallery is live.",
  },
];
