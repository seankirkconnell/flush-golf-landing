"use client";

import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { APP_URL } from "@/lib/constants";
import { fadeInUp, slideInRight } from "@/lib/animations";

const headline = "Find your flaws. Fix your swing.";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-8 sm:pt-36 sm:pb-24 overflow-hidden">
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
            <motion.div variants={fadeInUp} className="hidden sm:block">
              <Badge>
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered Swing Analysis
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="sm:mt-6 font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-foreground"
            >
              Find your flaws.{" "}
              <span className="text-green-fresh">Fix your swing.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-3 sm:mt-5 text-sm sm:text-xl text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              FLUSH uses AI to detect 25+ swing flaws in real-time
              <span className="hidden sm:inline"> — right from
              your phone</span>. Get a personalized practice plan and watch your game
              improve.
            </motion.p>

            {/* Phone — mobile only, after subtitle */}
            <motion.div variants={fadeInUp} className="mt-6 flex justify-center lg:hidden">
              <div className="w-52">
                <IPhoneFrame
                  src="/images/screenshots/diagnostic.webp"
                  alt="FLUSH Golf Full Diagnostic showing detected swing flaws"
                />
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-5 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
            >
              <Button href={APP_URL} className="self-center lg:self-start w-80 !py-2.5 !text-sm sm:w-auto sm:!px-7 sm:!py-3.5 sm:!text-base">Start Your Diagnostic Now</Button>
              <div className="hidden sm:block">
                <Button variant="secondary" href="#how-it-works">
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone mockup — desktop only */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInRight}
            className="hidden lg:flex justify-end"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-68"
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
