"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/ui/Container";
import SectionWrapper from "@/components/ui/SectionWrapper";
import IPhoneFrame, { PhoneShell } from "@/components/ui/IPhoneFrame";
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
    playCount: 2,
  },
  {
    number: 2,
    title: "Learn",
    description:
      "Create a custom plan and explore our library of 200+ tips to sharpen every part of your game.",
    image: "/videos/tips-video.mp4",
    webmSrc: "/videos/tips-video.webm",
    statusBarColor: "white" as const,
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

  // Fullscreen swipeable modal state
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [modalDirection, setModalDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (modalIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalIndex(null);
      else if (e.key === "ArrowLeft" && modalIndex > 0) {
        setModalDirection(-1);
        setModalIndex(modalIndex - 1);
      } else if (e.key === "ArrowRight" && modalIndex < steps.length - 1) {
        setModalDirection(1);
        setModalIndex(modalIndex + 1);
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalIndex]);

  const openModal = (i: number) => {
    setModalDirection(0);
    setModalIndex(i);
  };

  const goTo = (next: number) => {
    if (modalIndex === null) return;
    setModalDirection(next > modalIndex ? 1 : -1);
    setModalIndex(next);
  };

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
        <motion.div variants={fadeInUp} className="text-center mb-6 sm:mb-8">
          <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-4xl tracking-tight text-foreground whitespace-nowrap">
            How FLUSH Works
          </h2>
          <p className="hidden sm:block mt-3 text-lg text-muted max-w-2xl mx-auto">
            Pinpoint your flaws, learn the fix, and get instant feedback on every swing.
          </p>
        </motion.div>
      </Container>

      {/* Mobile: horizontal scroll carousel */}
      <div className="flex md:hidden gap-12 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none px-[calc(50%-128px)] scroll-px-[calc(50%-128px)]">
        {steps.map((step, i) => (
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
                onOpen={() => openModal(i)}
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
                  className={`relative mb-6 w-40 sm:w-48 lg:w-52 mx-auto transition-transform duration-500 ease-out ${
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
                    startAt={step.startAt}
                    playCount={step.playCount}
                    cornerRadius={34}
                    onOpen={() => openModal(i)}
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
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>

      {mounted && modalIndex !== null &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/97 overflow-hidden"
            onClick={() => setModalIndex(null)}
          >
            {/* Prev arrow (desktop) */}
            {modalIndex > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(modalIndex - 1);
                }}
                className="hidden sm:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center text-3xl leading-none"
                aria-label="Previous phone"
              >
                ‹
              </button>
            )}
            {/* Next arrow (desktop) */}
            {modalIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(modalIndex + 1);
                }}
                className="hidden sm:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white items-center justify-center text-3xl leading-none"
                aria-label="Next phone"
              >
                ›
              </button>
            )}

            {/* Swipeable phone */}
            <AnimatePresence mode="wait" initial={false} custom={modalDirection}>
              <motion.div
                key={modalIndex}
                custom={modalDirection}
                variants={{
                  enter: (dir: number) => ({
                    x: dir > 0 ? 400 : dir < 0 ? -400 : 0,
                    opacity: dir === 0 ? 1 : 0,
                  }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({
                    x: dir > 0 ? -400 : 400,
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  const threshold = 80;
                  if (info.offset.x > threshold && modalIndex > 0) {
                    goTo(modalIndex - 1);
                  } else if (
                    info.offset.x < -threshold &&
                    modalIndex < steps.length - 1
                  ) {
                    goTo(modalIndex + 1);
                  }
                }}
                className="relative h-[88vh] touch-pan-y cursor-grab active:cursor-grabbing"
                style={{ aspectRatio: "9 / 19.5" }}
                onClick={(e) => e.stopPropagation()}
              >
                <PhoneShell
                  src={steps[modalIndex].image}
                  alt={steps[modalIndex].title}
                  webmSrc={steps[modalIndex].webmSrc}
                  statusBarColor={steps[modalIndex].statusBarColor}
                  isModal
                />
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {steps.map((s, i) => (
                <button
                  key={s.number}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (i !== modalIndex) goTo(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === modalIndex ? "w-6 bg-white" : "w-2 bg-white/40"
                  }`}
                  aria-label={`Go to ${s.title}`}
                />
              ))}
            </div>
          </div>,
          document.body,
        )}
    </SectionWrapper>
  );
}
