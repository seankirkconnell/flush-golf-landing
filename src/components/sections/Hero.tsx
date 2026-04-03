"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { APP_URL } from "@/lib/constants";
import { fadeInUp, slideInRight } from "@/lib/animations";

const headline = "Find your flaws.\nFix your swing.";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-light/30 via-background to-background pointer-events-none" />

      <Container className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <Badge>
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Swing Analysis
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-[family-name:var(--font-heading)] font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-foreground whitespace-pre-line"
            >
              {headline}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-lg sm:text-xl text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              FLUSH uses AI to detect 25+ swing flaws in real-time — right from
              your phone. Get a personalized practice plan and watch your game
              improve.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button href={APP_URL} className="w-full sm:w-auto">Start Your Diagnostic</Button>
              <Button variant="secondary" href="#how-it-works" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </motion.div>
          </motion.div>

          {/* Phone mockup */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-52 sm:w-60 lg:w-64"
            >
              <IPhoneFrame
                src="/images/screenshots/diagnostic.webp"
                alt="FLUSH Golf Full Diagnostic showing detected swing flaws"
              />
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
