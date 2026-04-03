"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { TrendingUp, Award, Calendar } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { fadeInUp, slideInLeft, staggerContainer } from "@/lib/animations";

function AnimatedCounter({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [isInView, target]);

  return <span ref={ref}>{count}%</span>;
}

const features = [
  {
    icon: TrendingUp,
    title: "Clean swing trend",
    description: "Watch your flaw-free percentage climb over time.",
  },
  {
    icon: Award,
    title: "Flaw tracking",
    description: "See which flaws appear most and which ones you've beaten.",
  },
  {
    icon: Calendar,
    title: "Session history",
    description: "Review every practice session with detailed swing logs.",
  },
];

export default function ProgressSection() {
  return (
    <SectionWrapper className="bg-background-alt">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Phone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={slideInLeft}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="w-48 sm:w-56">
              <IPhoneFrame
                src="/images/screenshots/progress.webp"
                alt="FLUSH Golf progress tracking and swing trends"
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
              className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl tracking-tight text-foreground"
            >
              Watch your game{" "}
              <span className="text-green-fresh">improve.</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-3 text-lg text-muted max-w-md leading-relaxed"
            >
              Track your clean swing %, flaw trends, and practice sessions over
              time.
            </motion.p>

            {/* Animated stat */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 mb-8 inline-flex items-baseline gap-2 bg-white rounded-2xl px-6 py-4 shadow-sm border border-card-border"
            >
              <span className="font-[family-name:var(--font-heading)] font-bold text-4xl text-forest">
                <AnimatedCounter target={78} />
              </span>
              <span className="text-muted text-sm">clean swing rate</span>
            </motion.div>

            <div className="space-y-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted mt-0.5 leading-relaxed">
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
