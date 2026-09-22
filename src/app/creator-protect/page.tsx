import type { Metadata, Viewport } from "next";
import CreatorProtectDashboard from "@/components/creator-protect/dashboard";

export const metadata: Metadata = {
  title: "Creator Protect",
  description:
    "Watch public reuploads, approve removals, and see agent privacy guardrails — you stay in control.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function CreatorProtectPage() {
  return <CreatorProtectDashboard />;
}
