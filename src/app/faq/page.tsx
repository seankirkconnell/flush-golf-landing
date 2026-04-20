import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FAQContent from "@/components/sections/FAQContent";
import { ALL_FAQ_ITEMS } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — FLUSH Golf",
  description:
    "Answers to common questions about FLUSH Golf — how the AI swing analysis works, what flaws it detects, pricing, privacy, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ — FLUSH Golf",
    description:
      "Answers to common questions about FLUSH Golf — how the AI swing analysis works, what flaws it detects, pricing, privacy, and more.",
    type: "website",
    url: "/faq",
  },
};

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALL_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <FAQContent />
      </main>
      <Footer />
    </>
  );
}
