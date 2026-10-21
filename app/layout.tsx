import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Barlow_Condensed, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const utility = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-utility",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reunion — The Festival of Friendship",
  description:
    "Hyderabad is having a Reunion. Music, games, food, discovery and the people who made the memories. Join the December 2026 waitlist.",
  keywords: ["Reunion Hyderabad", "festival Hyderabad", "friendship festival", "Boulder Hills"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    title: "Reunion — Your people are the headliner",
    description: "Don’t just remember the good times. Relive them in Hyderabad, December 2026.",
    siteName: "Reunion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reunion — The Festival of Friendship",
    description: "Your people are the headliner. Hyderabad · December 2026.",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#180C2B",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${utility.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
