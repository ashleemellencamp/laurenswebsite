"use client";

import { useEffect, useRef, useState } from "react";

import { primaryButtonClassName } from "@/components/ui/PrimaryButton";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import { formLabelClassName } from "@/lib/typography";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    if (isTouchDevice) return;
    nameInputRef.current?.focus({ preventScroll: true });
  }, [isTouchDevice]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="text-left" onSubmit={handleSubmit}>
      <div className="space-y-6 pb-4 lg:pb-0">
        <div>
          <label htmlFor="name" className={formLabelClassName}>
            Name
          </label>
          <input
            ref={nameInputRef}
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            disabled={status === "loading"}
            className="w-full border border-blue-light bg-white px-4 py-3 text-base focus:border-slate focus:outline-none disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="email" className={formLabelClassName}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            disabled={status === "loading"}
            className="w-full border border-blue-light bg-white px-4 py-3 text-base focus:border-slate focus:outline-none disabled:opacity-60"
          />
        </div>
        <div>
          <label htmlFor="message" className={formLabelClassName}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            disabled={status === "loading"}
            className="w-full resize-none border border-blue-light bg-white px-4 py-3 text-base focus:border-slate focus:outline-none disabled:opacity-60"
          />
        </div>

        {status === "success" && (
          <p className="text-sm leading-relaxed text-slate" role="status">
            Thanks for reaching out — your message is on its way. Lauren will be
            in touch soon.
          </p>
        )}

        {status === "error" && (
          <p className="text-sm leading-relaxed text-terracotta" role="alert">
            Something went wrong sending your message. Please try again, or email
            Lauren directly using the link below.
          </p>
        )}
      </div>

      <div
        className="sticky bottom-0 -mx-6 mt-2 border-t border-blue-light/30 bg-white/95 px-6 py-4 backdrop-blur-sm lg:static lg:mx-0 lg:mt-6 lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none"
        style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full disabled:cursor-not-allowed disabled:opacity-60 ${primaryButtonClassName}`}
        >
          {status === "loading" ? "Sending..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
