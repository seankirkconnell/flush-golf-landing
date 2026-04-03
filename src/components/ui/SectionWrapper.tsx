"use client";

import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function SectionWrapper({
  children,
  className = "",
  id,
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger ? staggerContainer : fadeInUp}
      className={`py-20 sm:py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}
