import { NextResponse } from "next/server";

import {
  formatContactInquiryMessage,
  plannedInvestmentOptions,
  type ContactFormPayload,
} from "@/lib/contact-form";
import { siteConfig } from "@/lib/site-config";

type ContactPayload = Partial<ContactFormPayload>;

function trimOptional(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return NextResponse.json(
      { error: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = trimOptional(payload.fullName);
  const phone = trimOptional(payload.phone);
  const email = trimOptional(payload.email);
  const date = trimOptional(payload.date);
  const location = trimOptional(payload.location);
  const plannedInvestment = trimOptional(payload.plannedInvestment);

  if (
    !fullName ||
    !phone ||
    !email ||
    !date ||
    !location ||
    !plannedInvestment
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  const isValidInvestment = plannedInvestmentOptions.some(
    (option) => option.value === plannedInvestment,
  );

  if (!isValidInvestment) {
    return NextResponse.json(
      { error: "Please choose a valid investment option." },
      { status: 400 },
    );
  }

  const inquiry: ContactFormPayload = {
    fullName,
    fianceName: trimOptional(payload.fianceName) || undefined,
    phone,
    email,
    referralSource: trimOptional(payload.referralSource) || undefined,
    date,
    location,
    plannedInvestment,
    socialHandle: trimOptional(payload.socialHandle) || undefined,
    weddingDetails: trimOptional(payload.weddingDetails) || undefined,
  };

  const message = formatContactInquiryMessage(inquiry);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name: fullName,
        email,
        phone,
        date,
        location,
        planned_investment: plannedInvestment,
        message,
        subject: `New photography inquiry from ${fullName}`,
        from_name: siteConfig.name,
      }),
    });

    const result = (await response.json()) as { success?: boolean };

    if (!response.ok || !result.success) {
      return NextResponse.json(
        { error: "Unable to send message right now." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Unable to send message right now." },
      { status: 502 },
    );
  }
}
