import type { Metadata } from "next";
import { ConditionalHeader } from "@/components/layout/ConditionalHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Lauren Nichols Photography | Wedding & Portrait Photographer",
    template: "%s | Lauren Nichols Photography",
  },
  description:
    "Candid, cinematic wedding and portrait photography rooted in authenticity and connection.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qpp5rrv.css" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ConditionalHeader />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
