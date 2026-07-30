"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/videos/datte-gourmet-signature.mp4";
const POSTER_SRC = "/videos/datte-gourmet-signature-poster.webp";

export function SignatureVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          loadObserver.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );

    loadObserver.observe(container);
    return () => loadObserver.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || !shouldLoad) return;

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefersReducedMotion) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.18 }
    );

    playbackObserver.observe(container);
    return () => playbackObserver.disconnect();
  }, [prefersReducedMotion, shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[9/16] overflow-hidden rounded-[2rem] bg-chocolate shadow-luxe"
    >
      <Image
        src={POSTER_SRC}
        alt="Préparation artisanale d'une datte gourmande Datte Gourmet"
        fill
        sizes="(min-width: 768px) 42vw, 100vw"
        className={`object-cover transition-opacity duration-500 ${
          isReady && !prefersReducedMotion ? "opacity-0" : "opacity-100"
        }`}
      />

      {shouldLoad ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isReady && !prefersReducedMotion ? "opacity-100" : "opacity-0"
          }`}
          tabIndex={-1}
          loop
          muted
          playsInline
          poster={POSTER_SRC}
          preload="metadata"
          onCanPlay={() => setIsReady(true)}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-chocolate/10 via-transparent to-transparent"
      />
    </div>
  );
}
