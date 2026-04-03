import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import FlawShowcase from "@/components/sections/FlawShowcase";
import LiveCoachSection from "@/components/sections/LiveCoachSection";
import TipsSection from "@/components/sections/TipsSection";
import ProgressSection from "@/components/sections/ProgressSection";
import PricingSection from "@/components/sections/PricingSection";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveCoachSection />
        <TipsSection />
        <ProgressSection />
        <HowItWorks />
        <FlawShowcase />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
