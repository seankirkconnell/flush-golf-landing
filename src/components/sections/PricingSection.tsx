"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PRICING_TIERS, APP_URL } from "@/lib/constants";
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/animations";

export default function PricingSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-forest-dark to-forest-deep relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:24px_24px]" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl tracking-tight text-white">
              Simple, honest pricing.
            </h2>
            <p className="mt-3 text-lg text-white/60 max-w-lg mx-auto">
              Start free. Upgrade when you're ready to get serious.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {PRICING_TIERS.map((tier) => (
              <motion.div
                key={tier.name}
                variants={scaleIn}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  tier.highlighted
                    ? "bg-white shadow-xl shadow-black/20 scale-[1.02] ring-2 ring-green-fresh"
                    : "bg-white/10 backdrop-blur-sm border border-white/10"
                }`}
              >
                {tier.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-fresh text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}

                <h3
                  className={`font-[family-name:var(--font-heading)] font-bold text-lg ${
                    tier.highlighted ? "text-foreground" : "text-white"
                  }`}
                >
                  {tier.name}
                </h3>

                <div className="mt-3 flex items-baseline gap-1">
                  <span
                    className={`font-[family-name:var(--font-heading)] font-bold text-4xl ${
                      tier.highlighted ? "text-foreground" : "text-white"
                    }`}
                  >
                    {tier.price === 0 ? "Free" : `$${tier.price}`}
                  </span>
                  {tier.price > 0 && (
                    <span
                      className={`text-sm ${
                        tier.highlighted ? "text-muted" : "text-white/50"
                      }`}
                    >
                      /month
                    </span>
                  )}
                </div>

                <p
                  className={`mt-2 text-sm ${
                    tier.highlighted ? "text-muted" : "text-white/60"
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.highlighted ? "text-green-fresh" : "text-sage"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          tier.highlighted ? "text-foreground" : "text-white/80"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Button
                    href={APP_URL}
                    variant={tier.highlighted ? "primary" : "secondary"}
                    className={`w-full ${
                      !tier.highlighted
                        ? "!bg-white/10 !text-white !border-white/20 hover:!bg-white/20"
                        : ""
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
