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
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-16 sm:h-18">
        <a href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/logo.png"
            alt="FLUSH Golf"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="font-[family-name:var(--font-heading)] font-bold text-lg text-foreground">
            FLUSH <span className="font-normal text-muted">Golf</span>
          </span>
        </a>

        <div className="flex items-center gap-3">
          <Button variant="ghost" href={APP_URL} className="hidden sm:inline-flex">
            Open App
          </Button>
          <Button href={APP_URL}>Get Started Free</Button>
        </div>
      </Container>
    </nav>
  );
}
