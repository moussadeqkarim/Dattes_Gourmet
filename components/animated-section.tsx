"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedSectionProps = HTMLMotionProps<"section"> & {
  children: React.ReactNode;
};

export function AnimatedSection({ children, className, ...props }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y: 40, scale: 0.99, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
