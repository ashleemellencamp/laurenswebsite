type SectionEyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

export function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p
      className={`font-sans text-sm uppercase tracking-[0.12em] text-body ${className}`}
    >
      {children}
    </p>
  );
}
