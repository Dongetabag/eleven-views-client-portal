import type { Metadata, Viewport } from "next";
import PulseShell from "@/components/pulse/shell";

export const metadata: Metadata = {
  title: "Pulse",
  description:
    "Sponsored creator-ops assessment — cohort-only answers, concrete X→Y playbook.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function PulsePage() {
  return <PulseShell />;
}
