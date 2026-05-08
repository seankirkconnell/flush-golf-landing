"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

function AutoPlayVideo({
  mp4Src,
  webmSrc,
  className,
  playing,
  onEnded,
  endAt,
  startAt,
  playCount = 1,
}: {
  mp4Src: string;
  webmSrc: string;
  className?: string;
  playing?: boolean;
  onEnded?: () => void;
  endAt?: number;
  startAt?: number;
  playCount?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const endedFiredRef = useRef(false);
  const playsRemainingRef = useRef(playCount);
  const manualControl = playing !== undefined;

  const seekToStart = (video: HTMLVideoElement) => {
    if (startAt === undefined) return;
    const apply = () => {
      try {
        video.currentTime = startAt;
      } catch {}
    };
    if (video.readyState >= 1) {
      apply();
    } else {
      const onMeta = () => {
        apply();
        video.removeEventListener("loadedmetadata", onMeta);
      };
      video.addEventListener("loadedmetadata", onMeta);
    }
  };

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    // Fix React 19 hydration potentially dropping the muted attribute
    video.muted = true;

    if (manualControl) {
      if (playing) {
        if (video.readyState === 0) {
          video.load();
        }
        endedFiredRef.current = false;
        playsRemainingRef.current = playCount;
        seekToStart(video);
        video.play().catch(() => {});
      } else {
        video.pause();
      }
      return;
    }

    let isVisible = false;

    const seekAndPlay = () => {
      if (!isVisible) return;
      if (video.readyState === 0) {
        video.load();
      }
      seekToStart(video);
      video.play().catch(() => {});
    };

    const onCanPlay = () => {
      if (isVisible && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener("canplay", onCanPlay);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const wasVisible = isVisible;
          isVisible = entry.isIntersecting;
          if (isVisible && !wasVisible) {
            seekAndPlay();
          } else if (!isVisible && !video.paused) {
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
  }, [manualControl, playing, playCount, startAt]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (endAt === undefined || video.currentTime < endAt) return;
      if (manualControl) {
        if (endedFiredRef.current) return;
        playsRemainingRef.current -= 1;
        if (playsRemainingRef.current > 0) {
          try {
            video.currentTime = startAt ?? 0;
          } catch {}
          video.play().catch(() => {});
        } else {
          endedFiredRef.current = true;
          video.pause();
          onEnded?.();
        }
      } else {
        try {
          video.currentTime = startAt ?? 0;
        } catch {}
      }
    };

    const onNativeEnded = () => {
      if (!manualControl || endedFiredRef.current) return;
      playsRemainingRef.current -= 1;
      if (playsRemainingRef.current > 0) {
        try {
          video.currentTime = startAt ?? 0;
        } catch {}
        video.play().catch(() => {});
      } else {
        endedFiredRef.current = true;
        onEnded?.();
      }
    };

    if (endAt !== undefined) {
      video.addEventListener("timeupdate", onTimeUpdate);
    }
    video.addEventListener("ended", onNativeEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onNativeEnded);
    };
  }, [manualControl, endAt, startAt, onEnded]);

  // When startAt is set, we control initial playback ourselves via the
  // observer (or playing prop) so the browser doesn't sneak in a play-from-0.
  // When endAt is set, we handle looping manually so loop=false.
  const useNativeAutoplay = !manualControl && startAt === undefined;
  const useNativeLoop = !manualControl && endAt === undefined;

  return (
    <video
      ref={ref}
      autoPlay={useNativeAutoplay}
      loop={useNativeLoop}
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ borderRadius: 1 }}
    >
      <source src={mp4Src} type="video/mp4" />
      <source src={webmSrc} type="video/webm" />
    </video>
  );
}

export function PhoneShell({
  src,
  alt,
  webmSrc,
  statusBarColor,
  isModal,
  playing,
  onEnded,
  endAt,
  startAt,
  playCount,
  cornerRadius = 44,
  videoTop = "5%",
  videoBottom = -1,
  videoLeft = 0,
  videoRight = 0,
}: {
  src: string;
  alt: string;
  webmSrc?: string;
  statusBarColor: "white" | "black";
  isModal?: boolean;
  playing?: boolean;
  onEnded?: () => void;
  endAt?: number;
  startAt?: number;
  playCount?: number;
  cornerRadius?: number;
  videoTop?: string | number;
  videoBottom?: string | number;
  videoLeft?: string | number;
  videoRight?: string | number;
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
        style={{ borderRadius: cornerRadius, border: "3px solid #1e293b" }}
      >
        {/* Screen */}
        <div
          className="absolute bg-white"
          style={{ inset: 3, borderRadius: Math.max(cornerRadius - 3, 0), overflow: "hidden" }}
        >
          {/* Status bar */}
          <div
            className={`absolute left-0 right-0 top-0 ${statusBarColor === "black" ? "bg-black" : "bg-white"}`}
            style={{ height: "calc(5% + 1px)" }}
          />
          {/* Screenshot / Video */}
          <div
            className="absolute"
            style={{ top: videoTop, bottom: videoBottom, left: videoLeft, right: videoRight, transform: "translateZ(0)", overflow: "hidden" }}
          >
            {webmSrc ? (
              <AutoPlayVideo
                mp4Src={src}
                webmSrc={webmSrc}
                playing={playing}
                onEnded={onEnded}
                endAt={endAt}
                startAt={startAt}
                playCount={playCount}
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
  playing,
  onEnded,
  endAt,
  startAt,
  playCount,
  cornerRadius,
  onOpen,
  videoTop,
  videoBottom,
  videoLeft,
  videoRight,
}: {
  src: string;
  alt: string;
  className?: string;
  webmSrc?: string;
  statusBarColor?: "white" | "black";
  playing?: boolean;
  onEnded?: () => void;
  endAt?: number;
  startAt?: number;
  playCount?: number;
  cornerRadius?: number;
  onOpen?: () => void;
  videoTop?: string | number;
  videoBottom?: string | number;
  videoLeft?: string | number;
  videoRight?: string | number;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const useCustomOpen = !!onOpen;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!modalOpen || useCustomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen, useCustomOpen]);

  return (
    <>
      <div
        className={`relative mx-auto cursor-pointer ${className}`}
        style={{ aspectRatio: "9 / 19.5" }}
        onClick={() => (onOpen ? onOpen() : setModalOpen(true))}
      >
        <PhoneShell
          src={src}
          alt={alt}
          webmSrc={webmSrc}
          statusBarColor={statusBarColor}
          isModal={false}
          playing={playing}
          onEnded={onEnded}
          endAt={endAt}
          startAt={startAt}
          playCount={playCount}
          cornerRadius={cornerRadius}
          videoTop={videoTop}
          videoBottom={videoBottom}
          videoLeft={videoLeft}
          videoRight={videoRight}
        />
      </div>

      {mounted && modalOpen && !useCustomOpen &&
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
