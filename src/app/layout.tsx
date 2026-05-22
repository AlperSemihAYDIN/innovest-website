import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import WhatsAppButton from "@/components/chat/WhatsAppButton";
import Analytics from "@/components/Analytics";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Innovest | Cross-Border Investment Advisory",
    template: "%s | Innovest",
  },
  description:
    "Strategic investment solutions across the UK, UAE, EU, USA and key global markets. Real estate, residency by investment and business expansion advisory.",
  keywords: [
    "investment advisory",
    "real estate investment",
    "London property",
    "Dubai property",
    "residency by investment",
    "golden visa",
    "business expansion",
    "cross-border investment",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Innovest",
    title: "Innovest | Cross-Border Investment Advisory",
    description:
      "Strategic investment solutions across the UK, UAE, EU, USA and key global markets.",
  },
};

// Mobile: lock initial zoom but allow user pinch-zoom for accessibility.
// viewport-fit=cover ensures content extends behind iOS notch/home indicator.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#060e1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
