"use client";

import { useEffect, useRef, useState } from "react";

import { primaryButtonClassName } from "@/components/ui/PrimaryButton";
import { useIsTouchDevice } from "@/hooks/useMediaQuery";
import { plannedInvestmentOptions } from "@/lib/contact-form";
import { formLabelClassName } from "@/lib/typography";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClassName =
  "w-full border border-blue-light bg-white px-4 py-3 text-base focus:border-slate focus:outline-none disabled:opacity-60";

function RequiredMark() {
  return (
    <span className="text-terracotta" aria-hidden>
      *
    </span>
  );
}

function FieldLabel({
  htmlFor,
  required,
  children,
  hint,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <>
      <label htmlFor={htmlFor} className={formLabelClassName}>
        {children}
        {required ? (
          <>
            {" "}
            <RequiredMark />
          </>
        ) : null}
      </label>
      {hint ? (
        <p className="mb-2 text-sm leading-relaxed text-body/80">{hint}</p>
      ) : null}
    </>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const isTouchDevice = useIsTouchDevice();

  useEffect(() => {
    if (isTouchDevice) return;
    fullNameInputRef.current?.focus({ preventScroll: true });
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
          fullName: formData.get("fullName"),
          fianceName: formData.get("fianceName"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          referralSource: formData.get("referralSource"),
          date: formData.get("date"),
          location: formData.get("location"),
          plannedInvestment: formData.get("plannedInvestment"),
          socialHandle: formData.get("socialHandle"),
          weddingDetails: formData.get("weddingDetails"),
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
          <FieldLabel htmlFor="fullName" required>
            Full Name
          </FieldLabel>
          <input
            ref={fullNameInputRef}
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="fianceName">Fiancé&apos;s Full Name</FieldLabel>
          <input
            id="fianceName"
            name="fianceName"
            type="text"
            autoComplete="off"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="phone" required>
            Phone Number
          </FieldLabel>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="email" required>
            Your Email
          </FieldLabel>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="referralSource">
            How Did You Hear About Me?
          </FieldLabel>
          <input
            id="referralSource"
            name="referralSource"
            type="text"
            autoComplete="off"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="date" required>
            Date
          </FieldLabel>
          <input
            id="date"
            name="date"
            type="date"
            required
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="location" required>
            Location
          </FieldLabel>
          <input
            id="location"
            name="location"
            type="text"
            required
            placeholder="City + venue"
            autoComplete="off"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel htmlFor="plannedInvestment" required>
            Planned Photography Investment
          </FieldLabel>
          <p className="mb-2 text-sm leading-relaxed text-body/80">
            Please choose one
          </p>
          <select
            id="plannedInvestment"
            name="plannedInvestment"
            required
            defaultValue=""
            disabled={status === "loading"}
            className={`${inputClassName} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2342586e' stroke-width='1.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select a collection
            </option>
            {plannedInvestmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <FieldLabel htmlFor="socialHandle">Social Media Handle</FieldLabel>
          <input
            id="socialHandle"
            name="socialHandle"
            type="text"
            autoComplete="off"
            placeholder="@username"
            disabled={status === "loading"}
            className={inputClassName}
          />
        </div>

        <div>
          <FieldLabel
            htmlFor="weddingDetails"
            hint="Tell me a little about yourselves and what you're planning"
          >
            Wedding Details
          </FieldLabel>
          <textarea
            id="weddingDetails"
            name="weddingDetails"
            rows={5}
            disabled={status === "loading"}
            className={`${inputClassName} resize-none`}
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
