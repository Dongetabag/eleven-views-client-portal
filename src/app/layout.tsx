import type { Metadata, Viewport } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://portal.elevenviews.io";
const SITE_NAME = "Eleven Views Client Portal";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Eleven Views Client Portal",
    template: "%s · Eleven Views Portal",
  },
  description:
    "The client-facing dashboard for Eleven Views projects. Files, messages, billing, and your AI assistant in one place.",
  icons: { icon: "/favicon.ico" },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0B0E",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="bg-[#0A0B0E] text-[#F5F5F7] antialiased">{children}</body>
    </html>
  );
}
