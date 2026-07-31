"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { mainNavLinks } from "@/lib/nav-links";
import { sectionPaddingX } from "@/lib/section-padding";

type MobileNavProps = {
  /** "light" for hero overlay (white text), "dark" for interior pages */
  variant?: "light" | "dark";
};

export function MobileNav({ variant = "dark" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuId = useId();

  const isLight = variant === "light";

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const toggleClass = isLight
    ? "text-white hover:opacity-80"
    : "text-slate hover:text-body";

  const barClass = isLight ? "bg-white" : "bg-slate";

  const menuOverlay =
    open && mounted
      ? createPortal(
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-[200] flex flex-col bg-cream backdrop-blur-md lg:hidden"
            style={{
              paddingTop: "env(safe-area-inset-top)",
              paddingBottom: "env(safe-area-inset-bottom)",
            }}
          >
            <div
              className={`flex items-center justify-between py-5 ${sectionPaddingX}`}
            >
              <Link
                href="/"
                onClick={close}
                className="font-script text-2xl text-slate"
              >
                Lauren Nichols
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="flex size-11 shrink-0 items-center justify-center rounded-full text-slate transition hover:bg-blue-light/20"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 pb-10">
              <ul className="flex flex-col gap-2 pt-4">
                {mainNavLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={close}
                      className="block py-3 font-serif text-[clamp(1.75rem,6vw,2.25rem)] leading-tight tracking-[0.02em] text-slate transition hover:text-body"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={false}
          aria-controls={menuId}
          aria-label="Open menu"
          className={`relative flex size-11 shrink-0 items-center justify-center lg:hidden ${toggleClass}`}
        >
          <span className="sr-only">Open menu</span>
          <span className="flex w-5 flex-col items-center justify-center gap-[5px]">
            <span className={`block h-px w-full ${barClass}`} />
            <span className={`block h-px w-full ${barClass}`} />
            <span className={`block h-px w-full ${barClass}`} />
          </span>
        </button>
      )}

      {menuOverlay}
    </>
  );
}
