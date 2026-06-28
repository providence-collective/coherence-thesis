import type { Metadata, Viewport } from "next";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f5ebd9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://coherence-thesis.local"),
  title: {
    default: "The Coherence Thesis",
    template: "%s | The Coherence Thesis",
  },
  description:
    "A living manuscript body on interpersonal coherence and thriving future societies.",
  authors: [{ name: "Providence Collective" }],
  creator: "Providence Collective",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "The Coherence Thesis",
  },
  openGraph: {
    title: "The Coherence Thesis",
    description:
      "A living manuscript body on interpersonal coherence and thriving future societies.",
    type: "website",
    images: ["/art/coherence-thesis-purposeful-cover.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
