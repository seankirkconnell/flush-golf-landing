"use client";

import { motion } from "motion/react";
import { Crosshair, RotateCcw, Zap, Activity } from "lucide-react";
import Container from "@/components/ui/Container";
import { FLAW_GROUPS } from "@/lib/constants";
import { fadeInUp, staggerContainer, pillCascade, pillItem } from "@/lib/animations";

const phaseIcons: Record<string, typeof Crosshair> = {
  Setup: Crosshair,
  Backswing: RotateCcw,
  "Downswing & Impact": Zap,
  "Tempo & Pattern": Activity,
};

const phaseColors: Record<string, { bg: string; border: string; icon: string; pill: string; pillBorder: string }> = {
  Setup: {
    bg: "bg-emerald-50",
    border: "border-emerald-200/60",
    icon: "text-emerald-600",
    pill: "bg-emerald-50 text-emerald-800",
    pillBorder: "border-emerald-200/80",
  },
  Backswing: {
    bg: "bg-sky-50",
    border: "border-sky-200/60",
    icon: "text-sky-600",
    pill: "bg-sky-50 text-sky-800",
    pillBorder: "border-sky-200/80",
  },
  "Downswing & Impact": {
    bg: "bg-amber-50",
    border: "border-amber-200/60",
    icon: "text-amber-600",
    pill: "bg-amber-50 text-amber-800",
    pillBorder: "border-amber-200/80",
  },
  "Tempo & Pattern": {
    bg: "bg-violet-50",
    border: "border-violet-200/60",
    icon: "text-violet-600",
    pill: "bg-violet-50 text-violet-800",
    pillBorder: "border-violet-200/80",
  },
};

export default function FlawShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-background-alt relative overflow-hidden">

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-14">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
              25+ swing flaws. Detected instantly.
            </h2>
            <p className="mt-3 text-lg text-muted max-w-2xl mx-auto">
              From setup to finish, FLUSH scans every phase of your swing.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
          >
            {FLAW_GROUPS.map((group) => {
              const Icon = phaseIcons[group.phase] ?? Crosshair;
              const colors = phaseColors[group.phase] ?? phaseColors.Setup;

              return (
                <motion.div
                  key={group.phase}
                  variants={fadeInUp}
                  className="bg-white border border-card-border rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Phase header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-xl ${colors.bg} flex items-center justify-center`}
                    >
                      <Icon className={`w-4.5 h-4.5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">
                        {group.phase}
                      </h3>
                      <p className="text-xs text-muted">
                        {group.flaws.length} flaws detected
                      </p>
                    </div>
                  </div>

                  {/* Flaw pills */}
                  <motion.div
                    variants={pillCascade}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-20px" }}
                    className="flex flex-wrap gap-2"
                  >
                    {group.flaws.map((flaw) => (
                      <motion.span
                        key={flaw}
                        variants={pillItem}
                        className={`px-2.5 py-1.5 sm:px-3 rounded-full text-xs font-medium border ${colors.pill} ${colors.pillBorder} shadow-sm`}
                      >
                        {flaw}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="mt-10 text-center text-muted text-sm"
          >
            Instant feedback on every flaw — and curated tips on how to fix each
            one.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
