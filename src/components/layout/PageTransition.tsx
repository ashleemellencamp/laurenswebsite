"use client";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return <div className="animate-page-enter flex-1">{children}</div>;
}
