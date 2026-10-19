import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kramora AI — We build intelligent products that scale",
  description:
    "Kramora designs and engineers intelligent products, data platforms and autonomous systems — helping startups and enterprises turn artificial intelligence into real, durable advantage.",
  keywords: [
    "Kramora AI",
    "artificial intelligence",
    "generative AI",
    "AI agents",
    "data engineering",
    "cloud",
    "automation",
    "OCR",
    "staff augmentation",
  ],
  authors: [{ name: "Kramora AI" }],
  openGraph: {
    title: "Kramora AI — We build intelligent products that scale",
    description:
      "Intelligent products, data platforms and autonomous systems — engineered into real, durable advantage.",
    siteName: "Kramora AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kramora AI",
    description:
      "We build intelligent products that scale. AI-first. Innovation-driven. Built for growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
