import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site-config";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

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

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `New photography inquiry from ${name}`,
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
}
