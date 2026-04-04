"use client";

import { motion } from "motion/react";
import { BookOpen, Dumbbell, Target } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { fadeInUp, slideInRight, staggerContainer } from "@/lib/animations";
import { useIsDesktop } from "@/lib/hooks";

const features = [
  {
    icon: BookOpen,
    title: "Video tips from real coaches",
    description: "Browse curated coaching content from PGA instructors and top creators.",
  },
  {
    icon: Dumbbell,
    title: "Drills you can do on the range",
    description: "Practical exercises to ingrain the right feels and fix root causes.",
  },
  {
    icon: Target,
    title: "One flaw at a time",
    description: "Focus on what matters most. Your practice plan keeps you on track.",
  },
];

export default function TipsSection() {
  const isDesktop = useIsDesktop();

  return (
    <SectionWrapper>
      <Container>
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-12 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-4xl tracking-tight text-foreground"
            >
              A golf coach{" "}
              <span className="text-green-fresh">in your back pocket.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="hidden sm:block mt-3 text-lg text-muted max-w-md leading-relaxed"
            >
              For every flaw we find, browse curated tips — drills, feels, and
              fixes from real coaches.
            </motion.p>

            <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className={`${feature.title === "One flaw at a time" ? "hidden sm:flex" : "flex"} gap-3 sm:gap-4`}
                >
                  <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-sage-light flex items-center justify-center">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted mt-0.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={isDesktop ? slideInRight : fadeInUp}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-52 sm:w-60">
              <IPhoneFrame
                src="/images/screenshots/tips.webp"
                alt="FLUSH Golf curated coaching tips"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
