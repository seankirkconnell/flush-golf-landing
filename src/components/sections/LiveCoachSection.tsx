"use client";

import { motion } from "motion/react";
import { Zap, Volume2, BarChart3 } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { fadeInUp, slideInLeft, staggerContainer } from "@/lib/animations";
import { useIsDesktop } from "@/lib/hooks";

const features = [
  {
    icon: Zap,
    title: "Instant flaw detection",
    description: "Every swing is analyzed in real-time — see results before your next shot.",
  },
  {
    icon: Volume2,
    title: "Hands-free audio feedback",
    description: "Hear your results through tones or voice so you never have to check your phone.",
  },
  {
    icon: BarChart3,
    title: "Session tracking",
    description: "See your flaw-free percentage climb throughout each practice session.",
  },
];

export default function LiveCoachSection() {
  const isDesktop = useIsDesktop();

  return (
    <SectionWrapper className="bg-background-alt">
      <Container>
        <div className="grid lg:grid-cols-2 gap-5 sm:gap-12 lg:gap-20 items-center">
          {/* Phone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={isDesktop ? slideInLeft : fadeInUp}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="w-52 sm:w-60">
              <IPhoneFrame
                src="/videos/swing-video.mp4"
                webmSrc="/videos/swing-video.webm"
                alt="FLUSH Live Coach showing real-time swing analysis"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="order-1 lg:order-2"
          >
            <motion.h2
              variants={fadeInUp}
              className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-4xl tracking-tight text-foreground whitespace-nowrap"
            >
              Real-time feedback.{" "}
              <span className="text-green-fresh">Every swing.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="hidden sm:block mt-3 text-lg text-muted max-w-md leading-relaxed"
            >
              Live Coach watches your swing and calls out flaws before you even
              pick up your tee.
            </motion.p>

            <div className="mt-4 sm:mt-8 space-y-3 sm:space-y-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className={`${feature.title === "Session tracking" ? "hidden sm:flex" : "flex"} gap-3 sm:gap-4`}
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
        </div>
      </Container>
    </SectionWrapper>
  );
}
