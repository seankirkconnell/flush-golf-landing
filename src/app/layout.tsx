import type { Metadata } from "next";
import { Inter, Instrument_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flush-golf-landing.vercel.app"),
  title: "FLUSH Golf — AI-Powered Swing Analysis",
  description:
    "Detect 25+ swing flaws in real-time using just your phone. Get a personalized practice plan and watch your game improve.",
  keywords: [
    "golf",
    "swing analysis",
    "AI golf coach",
    "golf swing flaws",
    "golf practice",
    "swing detection",
  ],
  openGraph: {
    title: "FLUSH Golf — AI-Powered Swing Analysis",
    description:
      "Detect 25+ swing flaws in real-time using just your phone. Get a personalized practice plan and watch your game improve.",
    type: "website",
    images: ["/images/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "FLUSH Golf — AI-Powered Swing Analysis",
    description:
      "Detect 25+ swing flaws in real-time using just your phone.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
