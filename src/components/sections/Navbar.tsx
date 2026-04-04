"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { APP_URL } from "@/lib/constants";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b border-card-border/50"
          : "bg-white/60 backdrop-blur-md border-b border-card-border/30 sm:bg-transparent sm:backdrop-blur-none sm:border-b-0"
      }`}
    >
      <Container className="flex items-center justify-between h-12 sm:h-18">
        <a href="/" className="flex items-center gap-2 sm:gap-2.5">
          <Image
            src="/images/logo.png"
            alt="FLUSH Golf"
            width={32}
            height={32}
            className="rounded-lg w-8 h-8 sm:w-8 sm:h-8"
          />
          <span className="font-[family-name:var(--font-heading)] font-bold text-xl sm:text-xl text-foreground">
            FLUSH <span className="font-normal text-muted">Golf</span>
          </span>
        </a>

        <Button href={APP_URL} className="!px-4 !py-2 !text-xs sm:!px-6 sm:!py-2.5 sm:!text-sm">
          Get Started Free
        </Button>
      </Container>
    </nav>
  );
}
