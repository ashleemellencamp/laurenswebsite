"use client";

import { useState } from "react";

import { primaryButtonClassName } from "@/components/ui/PrimaryButton";
import { formLabelClassName } from "@/lib/typography";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");

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
    <form className="space-y-6 text-left" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className={formLabelClassName}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={status === "loading"}
          className="w-full border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none disabled:opacity-60"
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
          disabled={status === "loading"}
          className="w-full border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none disabled:opacity-60"
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
          className="w-full resize-none border border-blue-light bg-white px-4 py-3 focus:border-slate focus:outline-none disabled:opacity-60"
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

      <button
        type="submit"
        disabled={status === "loading"}
        className={`w-full disabled:cursor-not-allowed disabled:opacity-60 ${primaryButtonClassName}`}
      >
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
