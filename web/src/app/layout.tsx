import "@/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Copilot Kit — Transform GitHub Copilot",
    template: "%s | Copilot Kit",
  },
  description:
    "Transform GitHub Copilot into a structured, risk-aware coding partner with the Adaptive Governance Framework (AGF). One command to supercharge your AI assistant.",
  keywords: ["GitHub Copilot", "AI", "coding assistant", "AGF", "copilot-kit"],
  authors: [{ name: "ntdev204" }],
  openGraph: {
    title: "Copilot Kit",
    description:
      "Transform GitHub Copilot into a structured, risk-aware coding partner.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
