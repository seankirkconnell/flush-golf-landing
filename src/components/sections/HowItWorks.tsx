"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: 1,
    title: "Film",
    description:
      "Hit 6 swings from two camera angles. Just prop your phone on a tripod and swing.",
    image: "/images/screenshots/feedback.webp",
  },
  {
    number: 2,
    title: "Detect",
    description:
      "AI scans every frame for 25+ common swing flaws. No human review — results in seconds.",
    image: "/images/screenshots/diagnostic.webp",
  },
  {
    number: 3,
    title: "Improve",
    description:
      "Get a prioritized practice plan. Focus on one flaw at a time — the fastest path to better golf.",
    image: "/images/screenshots/plan.webp",
  },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" stagger>
      <Container>
        <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-14">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-4xl tracking-tight text-foreground whitespace-nowrap">
            How FLUSH Works
          </h2>
          <p className="hidden sm:block mt-3 text-lg text-muted max-w-2xl mx-auto">
            Three steps to a better swing. Your Full Diagnostic takes about 10
            minutes.
          </p>
        </motion.div>
      </Container>

      {/* Mobile: horizontal scroll carousel */}
      <div className="flex md:hidden gap-12 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none px-[calc(50%-128px)] scroll-px-[calc(50%-128px)]">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex-none snap-center flex flex-col items-center text-center w-64"
          >
            <div className="w-52 mb-7">
              <IPhoneFrame src={step.image} alt={step.title} />
            </div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-foreground">
                {step.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <Container>
        <motion.div
          variants={staggerContainer}
          className="hidden md:grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              <div className="relative mb-6 w-30 sm:w-38 mx-auto">
                <IPhoneFrame src={step.image} alt={step.title} />
              </div>
              <div className="flex items-center gap-3 mb-1">
                <span className="w-7 h-7 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {step.number}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-foreground">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-muted leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
