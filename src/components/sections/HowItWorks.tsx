"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame from "@/components/ui/IPhoneFrame";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const steps = [
  {
    number: 1,
    title: "Detect",
    description:
      "Get an AI golf lesson. We analyze your swing and diagnose the exact flaws holding your game back.",
    image: "/videos/fd-video.mp4",
    webmSrc: "/videos/fd-video.webm",
    statusBarColor: "white" as const,
  },
  {
    number: 2,
    title: "Learn",
    description:
      "Create a custom plan and explore our library of 200+ tips to sharpen every part of your game.",
    image: "/videos/tips-video.mp4",
    webmSrc: "/videos/tips-video.webm",
    statusBarColor: "white" as const,
    endAt: 8,
  },
  {
    number: 3,
    title: "Improve",
    description:
      "Practice with a pro in your back pocket. Get instant feedback on every swing and see your scores improve!",
    image: "/videos/swing-video-2.mp4",
    webmSrc: "/videos/swing-video-2.webm",
    statusBarColor: "black" as const,
  },
];

export default function HowItWorks() {
  // Desktop-only: sequential video playback. -1 = none playing, 0-2 = that step's video is playing, steps.length = done.
  const [activeIndex, setActiveIndex] = useState(-1);
  const startedRef = useRef(false);
  const desktopGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = desktopGridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setActiveIndex(0);
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleEnded = (index: number) => {
    setActiveIndex(index + 1 < steps.length ? index + 1 : steps.length);
  };

  return (
    <SectionWrapper id="how-it-works" stagger>
      <Container>
        <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-14">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-4xl tracking-tight text-foreground whitespace-nowrap">
            How FLUSH Works
          </h2>
          <p className="hidden sm:block mt-3 text-lg text-muted max-w-2xl mx-auto">
            Three steps to a better swing. Your Full Diagnostic takes about 10
            minutes.
          </p>
        </motion.div>
      </Container>

      {/* Mobile: horizontal scroll carousel */}
      <div className="flex md:hidden gap-12 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none px-[calc(50%-128px)] scroll-px-[calc(50%-128px)]">
        {steps.map((step) => (
          <div
            key={step.number}
            className="flex-none snap-center flex flex-col items-center text-center w-64"
          >
            <div className="w-52 mb-7">
              <IPhoneFrame
                src={step.image}
                webmSrc={step.webmSrc}
                alt={step.title}
                statusBarColor={step.statusBarColor}
              />
            </div>
            <div className="flex items-center gap-3 mb-1">
              <span className="w-7 h-7 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                {step.number}
              </span>
              <h3 className="font-[family-name:var(--font-heading)] font-bold text-xl text-foreground">
                {step.title}
              </h3>
            </div>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop: 3-column grid */}
      <Container>
        <motion.div
          ref={desktopGridRef}
          variants={staggerContainer}
          className="hidden md:grid md:grid-cols-3 gap-10 md:gap-8 lg:gap-12"
        >
          {steps.map((step, i) => {
            const isActive = activeIndex === i;
            return (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative mb-6 w-30 sm:w-38 mx-auto transition-transform duration-500 ease-out ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  <IPhoneFrame
                    src={step.image}
                    webmSrc={step.webmSrc}
                    alt={step.title}
                    statusBarColor={step.statusBarColor}
                    playing={isActive}
                    onEnded={() => handleEnded(i)}
                    endAt={step.endAt}
                  />
                </div>
                <div className="flex items-center gap-3 mb-1">
                  <span
                    className={`w-7 h-7 rounded-full bg-forest text-white text-xs font-bold flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isActive ? "scale-125 shadow-lg shadow-forest/50" : ""
                    }`}
                  >
                    {step.number}
                  </span>
                  <h3
                    className={`font-[family-name:var(--font-heading)] font-bold text-xl transition-colors duration-500 ${
                      isActive ? "text-forest" : "text-foreground"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-muted leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </SectionWrapper>
  );
}
