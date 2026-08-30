import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CashGPT",
  description:
    "CashGPT agent room and a $149 missed-revenue audit for independent plumbing and HVAC businesses.",
  openGraph: {
    title: "CashGPT",
    description: "Explore the CashGPT room or request a missed-revenue audit.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CashGPT",
    description: "Explore the CashGPT room or request a missed-revenue audit.",
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
