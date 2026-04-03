"use client";

import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { APP_URL, ALL_FLAWS } from "@/lib/constants";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <Container className="relative text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeInUp}
            className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground"
          >
            Ready to find your flaws?
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-lg text-muted max-w-md mx-auto"
          >
            Start your Full Diagnostic — it takes 10 minutes and it's
            completely free.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-8">
            <Button href={APP_URL} className="text-base px-10 py-4">
              Open FLUSH Golf
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
