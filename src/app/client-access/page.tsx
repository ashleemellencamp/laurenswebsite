import type { Metadata } from "next";

import { ClientAccessHeroSection } from "@/components/client-access/ClientAccessHeroSection";
import { ClientAccessSection } from "@/components/client-access/ClientAccessSection";

export const metadata: Metadata = {
  title: "Client Access",
  description:
    "Access your private photography gallery — view, download, and share your photos from Lauren Nichols Photography.",
};

export default function ClientAccessPage() {
  return (
    <>
      <ClientAccessHeroSection />
      <ClientAccessSection />
    </>
  );
}
