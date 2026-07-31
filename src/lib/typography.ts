/** Base h2 sizing used across split layouts and gallery titles */
export const contentTitleClassName =
  "text-3xl leading-tight tracking-[0.02em] lg:text-4xl";

/** Interior page hero h1 (About, Contact, Experience, etc.) */
export const pageHeroHeadlineClassName =
  "mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-tight tracking-[0.02em]";

/** Standard section h2 paired with SectionEyebrow */
export const sectionHeadlineClassName =
  "mt-3 text-[clamp(1.75rem,3.5vw,2.25rem)] leading-snug tracking-[0.02em]";

/** Larger centered section h2 (FAQ, featured sections) */
export const sectionHeadlineLargeClassName =
  "mt-3 text-[clamp(2rem,4.5vw,3rem)] leading-tight tracking-[0.02em]";

/** Split-layout section h2 (photo + text columns) */
export const splitSectionHeadlineClassName = `mt-3 ${contentTitleClassName}`;

/** Featured / portfolio intro h2 */
export const featuredHeadlineClassName =
  "mt-3 text-[clamp(2rem,4vw,2.5rem)] leading-tight tracking-[0.02em]";

/** Uppercase text CTA links ("Learn More", "The Experience") */
export const textLinkClassName =
  "inline-flex items-center gap-2.5 font-serif text-sm uppercase tracking-[0.7px] text-slate transition hover:opacity-80";

/** Form field labels — matches SectionEyebrow styling */
export const formLabelClassName =
  "mb-2 block font-sans text-sm uppercase tracking-[0.12em] text-body";

/** Sticky header nav links */
export const mainNavLinkClassName =
  "font-sans text-sm uppercase tracking-[0.05em] text-body transition hover:text-slate";

/** Homepage hero overlay nav links */
export const heroNavLinkClassName =
  "font-sans text-sm uppercase tracking-[0.05em] whitespace-nowrap text-white transition hover:opacity-80";

/** Shared body copy spacing below section headlines */
export const sectionBodyClassName =
  "mt-4 text-base leading-relaxed tracking-[0.8px] text-body";
