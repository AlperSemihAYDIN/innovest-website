import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import WhatsAppButton from "@/components/chat/WhatsAppButton";
import Analytics from "@/components/Analytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased">
        {children}
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
