import Link from "next/link";

export const primaryButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-[56px] bg-blue-light px-6 py-3 font-serif text-sm uppercase tracking-[0.7px] text-slate transition hover:opacity-90";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function PrimaryButton({
  href,
  children,
  className = "",
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className={`${primaryButtonClassName} ${className}`}
    >
      {children}
    </Link>
  );
}
