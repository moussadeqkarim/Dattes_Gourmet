"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function SignatureScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const titleY = useTransform(scrollYProgress, [0, 0.35, 1], [72, 0, -54]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.8, 1], [0, 1, 1, 0.45]);
  const accentX = useTransform(scrollYProgress, [0, 1], ["-45%", "145%"]);
  const progressScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[175vh] bg-dark text-cream">
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden bg-[linear-gradient(126deg,#16090C_0%,#2A1017_46%,#5E1F2E_100%)] px-5 py-24 sm:px-8">
        <div className="absolute inset-x-0 top-0 h-px bg-gold/35" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gold/20" />
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 w-40 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(212,189,145,0.12),transparent)] sm:w-64"
          style={{ x: shouldReduceMotion ? "120%" : accentX }}
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.p
            className="mb-7 text-xs font-semibold uppercase tracking-[0.32em] text-gold sm:text-sm"
            style={{ opacity: shouldReduceMotion ? 1 : titleOpacity }}
          >
            Le geste signature
          </motion.p>

          <motion.h2
            className="max-w-5xl text-balance font-heading text-5xl leading-[1.02] sm:text-7xl lg:text-8xl"
            style={{
              y: shouldReduceMotion ? 0 : titleY,
              opacity: shouldReduceMotion ? 1 : titleOpacity
            }}
          >
            De la datte
            <span className="block text-gold">au bijou gourmand.</span>
          </motion.h2>

          <p className="mt-8 max-w-2xl text-base leading-8 text-cream/75 sm:text-lg">
            Chaque création est garnie, enrobée et finie à la main pour offrir un instant aussi
            précieux à regarder qu’à savourer.
          </p>

          <div className="mt-12 h-px w-full max-w-xl overflow-hidden bg-cream/16">
            <motion.div
              className="h-full origin-left bg-gold"
              style={{ scaleX: shouldReduceMotion ? 1 : progressScale }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
