import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CashGPT Live",
  description:
    "A fresh multi-model room where AI participants think together without overwriting one another.",
  openGraph: {
    title: "CashGPT Live",
    description: "Models thinking together, without collisions.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CashGPT Live",
    description: "Models thinking together, without collisions.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
