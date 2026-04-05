"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

function AutoPlayVideo({
  mp4Src,
  webmSrc,
  className,
}: {
  mp4Src: string;
  webmSrc: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Fix React 19 hydration potentially dropping the muted attribute
    video.muted = true;

    let isVisible = false;
    let isReady = video.readyState >= 3; // HAVE_FUTURE_DATA

    const tryPlay = () => {
      if (isVisible && isReady && video.paused) {
        video.play().catch(() => {});
      }
    };

    const onCanPlay = () => {
      isReady = true;
      tryPlay();
    };

    if (!isReady) {
      video.addEventListener("canplay", onCanPlay);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            tryPlay();
          } else if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    >
      <source src={mp4Src} type="video/mp4" />
      <source src={webmSrc} type="video/webm" />
    </video>
  );
}

function PhoneShell({
  src,
  alt,
  webmSrc,
  statusBarColor,
  isModal,
}: {
  src: string;
  alt: string;
  webmSrc?: string;
  statusBarColor: "white" | "black";
  isModal?: boolean;
}) {
  return (
    <div className="relative w-full h-full">
      {/* Volume up */}
      <div
        className="absolute rounded-l-sm bg-slate-700"
        style={{ left: -3, top: "22%", width: 3, height: "8%" }}
      />
      {/* Volume down */}
      <div
        className="absolute rounded-l-sm bg-slate-700"
        style={{ left: -3, top: "32%", width: 3, height: "8%" }}
      />
      {/* Power */}
      <div
        className="absolute rounded-r-sm bg-slate-700"
        style={{ right: -3, top: "26%", width: 3, height: "12%" }}
      />
      {/* Shell */}
      <div
        className="absolute inset-0 bg-slate-900 shadow-2xl"
        style={{ borderRadius: 44, border: "3px solid #1e293b" }}
      >
        {/* Screen */}
        <div
          className="absolute bg-white"
          style={{ inset: 3, borderRadius: 41, overflow: "hidden" }}
        >
          {/* Status bar */}
          <div
            className={`absolute left-0 right-0 top-0 ${statusBarColor === "black" ? "bg-black" : "bg-white"}`}
            style={{ height: "5%" }}
          />
          {/* Screenshot / Video */}
          <div
            className="absolute"
            style={{ top: "5%", bottom: 0, left: 0, right: 0 }}
          >
            {webmSrc ? (
              <AutoPlayVideo
                mp4Src={src}
                webmSrc={webmSrc}
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain object-top"
                sizes={isModal ? "90vw" : "(max-width: 768px) 60vw, 280px"}
              />
            )}
          </div>
          {/* Dynamic Island */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black"
            style={{
              top: "2%",
              width: "30%",
              height: "3.5%",
              borderRadius: 9999,
              zIndex: 10,
            }}
          />
          {/* Home indicator */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bg-black/20"
            style={{
              bottom: "2%",
              width: "28%",
              height: "0.5%",
              borderRadius: 9999,
              zIndex: 10,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function IPhoneFrame({
  src,
  alt,
  className = "",
  webmSrc,
  statusBarColor = "white",
}: {
  src: string;
  alt: string;
  className?: string;
  webmSrc?: string;
  statusBarColor?: "white" | "black";
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  return (
    <>
      <div
        className={`relative mx-auto cursor-pointer ${className}`}
        style={{ aspectRatio: "9 / 19.5" }}
        onClick={() => setModalOpen(true)}
      >
        <PhoneShell
          src={src}
          alt={alt}
          webmSrc={webmSrc}
          statusBarColor={statusBarColor}
          isModal={false}
        />
      </div>

      {mounted && modalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/97"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="relative h-[88vh]"
              style={{ aspectRatio: "9 / 19.5" }}
              onClick={(e) => e.stopPropagation()}
            >
              <PhoneShell
                src={src}
                alt={alt}
                webmSrc={webmSrc}
                statusBarColor={statusBarColor}
                isModal={true}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
