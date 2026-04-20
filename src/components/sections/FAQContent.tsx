"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/ui/Container";
import { FAQ_CATEGORIES } from "@/lib/faq";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function FAQContent() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="pt-28 pb-16 sm:pt-40 sm:pb-28 bg-gradient-to-b from-sage-light/30 via-background to-background">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-5xl tracking-tight leading-[1.1] text-foreground"
          >
            Frequently asked{" "}
            <span className="text-green-fresh">questions.</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-4 text-base sm:text-lg text-muted leading-relaxed"
          >
            Everything you need to know about how FLUSH works, what it detects,
            and how it fits into your practice.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto space-y-8 sm:space-y-12"
        >
          {FAQ_CATEGORIES.map((category) => (
            <motion.div key={category.title} variants={fadeInUp}>
              <h2 className="font-[family-name:var(--font-heading)] font-bold text-sm uppercase tracking-wider text-forest mb-3 sm:mb-4">
                {category.title}
              </h2>
              <div className="bg-white border border-card-border rounded-2xl shadow-sm overflow-hidden divide-y divide-card-border/70">
                {category.items.map((item) => {
                  const key = `${category.title}:${item.q}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5 hover:bg-sage-light/30 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="font-[family-name:var(--font-heading)] font-semibold text-base sm:text-lg text-foreground leading-snug">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 text-forest mt-0.5 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-sm sm:text-base text-muted leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto mt-12 sm:mt-16 text-center"
        >
          <p className="text-sm sm:text-base text-muted">
            Still have a question?{" "}
            <a
              href="mailto:sean.kirkconnell@gmail.com"
              className="text-forest font-semibold hover:underline"
            >
              Get in touch
            </a>
            .
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
