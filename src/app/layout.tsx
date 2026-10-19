import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/site/smooth-scroll-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kramora AI — We build intelligent products that scale",
  description:
    "Kramora AI is an AI-first engineering agency. Custom ML, LLM applications, RAG systems, data platforms, cloud, and product engineering — delivered by senior pods, from idea to production.",
  keywords: [
    "Kramora AI",
    "AI agency",
    "Generative AI",
    "LLM applications",
    "RAG systems",
    "Data engineering",
    "Document AI",
    "Staff augmentation",
  ],
  authors: [{ name: "Kramora AI" }],
  icons: {
    icon: "/kramora-mark.svg",
  },
  openGraph: {
    title: "Kramora AI — We build intelligent products that scale",
    description:
      "AI-First. Innovation-Driven. Built for Growth. One partner across the entire modern stack.",
    siteName: "Kramora AI",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster />
      </body>
    </html>
  );
}
