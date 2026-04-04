"use client";

import Image from "next/image";

export default function IPhoneFrame({
  src,
  alt,
  className = "",
  webmSrc,
}: {
  src: string;
  alt: string;
  className?: string;
  webmSrc?: string;
}) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ aspectRatio: "9 / 19.5" }}
    >
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
          {/* Status bar whitespace */}
          <div
            className="absolute left-0 right-0 top-0 bg-white"
            style={{ height: "5%" }}
          />
          {/* Screenshot / Video */}
          <div
            className="absolute"
            style={{ top: "5%", bottom: 0, left: 0, right: 0 }}
          >
            {webmSrc ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-top"
              >
                <source src={webmSrc} type="video/webm" />
                <source src={src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain object-top"
                sizes="(max-width: 768px) 60vw, 280px"
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
