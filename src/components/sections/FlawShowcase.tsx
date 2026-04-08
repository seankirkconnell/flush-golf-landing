"use client";

import { motion } from "motion/react";
import { PlayCircle, Star, Users } from "lucide-react";
import Container from "@/components/ui/Container";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// Top flaws grouped by swing phase, color-coded per phase.
const SAMPLE_FLAW_GROUPS: { phase: string; tone: "emerald" | "sky" | "amber" | "violet"; flaws: string[] }[] = [
  {
    phase: "Setup",
    tone: "emerald",
    flaws: ["Standing Too Tall", "Too Bent Over", "Shoulders Open", "Standing Too Close", "Shoulders Closed", "Standing Too Far"],
  },
  {
    phase: "Backswing",
    tone: "sky",
    flaws: ["Flying Elbow", "Poor Shoulder Turn", "Reverse Pivot", "Overswing", "Poor Hip Load", "Arms Too Flat"],
  },
  {
    phase: "Downswing & Impact",
    tone: "amber",
    flaws: ["Over The Top", "Early Extension", "Hands Roll Over", "Quick Tempo", "Standing Up", "Arms Driven Swing"],
  },
];

const flawToneClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  sky: "bg-sky-50 text-sky-800 border-sky-200/80",
  amber: "bg-amber-50 text-amber-800 border-amber-200/80",
  violet: "bg-violet-50 text-violet-800 border-violet-200/80",
};

const flawPhaseLabelClasses: Record<string, string> = {
  emerald: "text-emerald-700",
  sky: "text-sky-700",
  amber: "text-amber-700",
  violet: "text-violet-700",
};

// Real top-rated tips pulled from the FLUSH app database.
const EXAMPLE_TIPS = [
  {
    name: "Standing Up Kills Everything",
    coach: "@riggsgolf",
    flaws: ["Early Extension"],
    rating: 4.8,
    thumbnail:
      "https://loxdilfjcmkpsifaxdet.supabase.co/storage/v1/object/public/flush_frames/fdd1b4ce-27b2-44a2-bb36-a8d975925449/tip_thumbs/thumb_1775188494651.jpeg",
  },
  {
    name: "Fix Flat Shoulders",
    coach: "@thatgolfgrind",
    flaws: ["Flat Shoulders"],
    rating: 4.8,
    thumbnail:
      "https://loxdilfjcmkpsifaxdet.supabase.co/storage/v1/object/public/flush_frames/fdd1b4ce-27b2-44a2-bb36-a8d975925449/tip_thumbs/thumb_1774629933036.jpeg",
  },
  {
    name: "Feel Low Into the Ball",
    coach: "@ericcogorno",
    flaws: ["Over The Top"],
    rating: 4.7,
    thumbnail:
      "https://loxdilfjcmkpsifaxdet.supabase.co/storage/v1/object/public/flush_frames/fdd1b4ce-27b2-44a2-bb36-a8d975925449/tip_thumbs/thumb_1774718615366.jpeg",
  },
  {
    name: "Pin Your Arm",
    coach: "@kerrodgraygolf",
    flaws: ["Hands Roll Over"],
    rating: 4.7,
    thumbnail:
      "https://loxdilfjcmkpsifaxdet.supabase.co/storage/v1/object/public/flush_frames/fdd1b4ce-27b2-44a2-bb36-a8d975925449/tip_thumbs/thumb_1775191776753.jpeg",
  },
];

// Real top-rated coaches pulled from the FLUSH app database.
const EXAMPLE_COACHES = [
  {
    name: "Speedgolfrob",
    handle: "@Speedgolfrob",
    followers: "441K",
    rating: 5.0,
    gradient: "from-amber-400 to-amber-600",
  },
  {
    name: "Jake Hutt",
    handle: "@jakehuttgolf",
    followers: "415K",
    rating: 5.0,
    gradient: "from-rose-400 to-rose-600",
  },
  {
    name: "Michael Mitnick",
    handle: "@thatgolfgrind",
    followers: "290K",
    rating: 5.0,
    gradient: "from-violet-400 to-violet-600",
  },
  {
    name: "Eric Cogorno",
    handle: "@ericcogorno",
    followers: "113K",
    rating: 5.0,
    gradient: "from-teal-400 to-teal-600",
  },
  {
    name: "Elite Golf School",
    handle: "@elitegolfschool",
    followers: "56K",
    rating: 5.0,
    gradient: "from-emerald-400 to-emerald-600",
  },
];

export default function FlawShowcase() {
  return (
    <section className="py-12 sm:py-28 bg-background-alt relative overflow-hidden">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Unified header */}
          <motion.div variants={fadeInUp} className="text-center mb-10 sm:mb-14">
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-3xl sm:text-4xl tracking-tight text-foreground">
              25+ flaws.{" "}
              <span className="text-green-fresh">200+ tips.</span>{" "}
              60+ coaches.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              No two coaches teach the same fix the same way. Find the coach that clicks.
            </p>
          </motion.div>

          {/* 3-column layout */}
          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-5 sm:gap-6 max-w-5xl mx-auto"
          >
            {/* Column 1: Flaws */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-card-border rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-foreground">
                25+ flaws detected
              </h3>
              <p className="text-sm text-muted mt-1 mb-4 whitespace-nowrap">
                The most common flaws in golf, detected.
              </p>
              <div className="space-y-3">
                {SAMPLE_FLAW_GROUPS.map((group) => (
                  <div key={group.phase}>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${flawPhaseLabelClasses[group.tone]}`}
                    >
                      {group.phase}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.flaws.map((flaw) => (
                        <span
                          key={flaw}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-medium border shadow-sm ${flawToneClasses[group.tone]}`}
                        >
                          {flaw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Tips */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-card-border rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-foreground">
                200+ curated tips
              </h3>
              <p className="text-sm text-muted mt-1 mb-4">
                Drills and feels that fix the flaws we find.
              </p>
              <div className="space-y-2.5">
                {EXAMPLE_TIPS.map((tip) => (
                  <div
                    key={tip.name}
                    className="flex items-stretch gap-3 p-2.5 bg-[#F0F4F0] rounded-xl border border-forest/10 overflow-hidden"
                  >
                    <div className="w-11 aspect-[3/4] bg-white/50 rounded-lg flex-shrink-0 overflow-hidden relative shadow-sm border border-black/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tip.thumbnail}
                        alt={tip.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <PlayCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    <div className="flex-grow min-w-0 flex flex-col justify-center gap-1">
                      <h4 className="text-[12px] font-bold text-foreground truncate leading-tight">
                        {tip.name}
                      </h4>
                      <span className="inline-block w-fit px-1.5 py-0.5 bg-forest/10 text-forest text-[9px] font-bold uppercase rounded border border-forest/5 truncate max-w-full leading-tight">
                        Fixes: {tip.flaws[0]}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold text-forest truncate leading-tight">
                          {tip.coach}
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-600 text-[10px] font-bold flex-shrink-0 leading-tight">
                          <Star className="w-2.5 h-2.5 fill-current" />
                          {tip.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Column 3: Coaches */}
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-card-border rounded-2xl p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-lg text-foreground">
                60+ coaches
              </h3>
              <p className="text-sm text-muted mt-1 mb-4">
                Choose from top PGA pros and creators.
              </p>
              <div className="space-y-2.5">
                {EXAMPLE_COACHES.map((coach) => (
                  <div
                    key={coach.handle}
                    className="flex items-center gap-3 p-2.5 bg-[#F0F4F0] rounded-xl border border-forest/10"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br ${coach.gradient} flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm`}
                    >
                      <span className="text-white font-black text-xs">
                        {coach.name
                          .split(" ")
                          .map((w) => w[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-[12px] font-bold text-foreground truncate leading-tight">
                        {coach.name}
                      </h4>
                      <p className="text-[10px] text-muted truncate">
                        {coach.handle}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className="flex items-center gap-0.5 text-amber-600 text-[10px] font-bold">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        {coach.rating.toFixed(1)}
                      </span>
                      <span className="flex items-center gap-0.5 text-muted text-[9px] font-semibold">
                        <Users className="w-2.5 h-2.5" />
                        {coach.followers}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
