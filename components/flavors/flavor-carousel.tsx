"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { allFlavors, DATE_MODEL_PATH } from "@/lib/catalog";
import {
  DateModelViewer,
  preloadDateModel
} from "@/components/flavors/date-model-viewer";
import { cn } from "@/lib/utils";

export function FlavorCarousel() {
  const [index, setIndex] = useState(0);
  const activeFlavor = allFlavors[index];

  const categoryLabel = activeFlavor.categoryLabel;

  const visibleDots = useMemo(
    () =>
      allFlavors.map((flavor, dotIndex) => ({
        label: flavor.name,
        slug: flavor.slug,
        isActive: dotIndex === index
      })),
    [index]
  );

  const preloadFlavor = useCallback((targetIndex: number) => {
    const flavor = allFlavors[targetIndex];
    void preloadDateModel(flavor.modelPath ?? DATE_MODEL_PATH);
  }, []);

  const preloadNextWhenIdle = useCallback(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { effectiveType?: string; saveData?: boolean };
      }
    ).connection;

    if (connection?.saveData || connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g") {
      return;
    }

    const nextIndex = (index + 1) % allFlavors.length;

    const requestIdle = (
      window as Window & {
        requestIdleCallback?: (
          callback: IdleRequestCallback,
          options?: IdleRequestOptions
        ) => number;
      }
    ).requestIdleCallback;

    if (requestIdle) {
      requestIdle(() => preloadFlavor(nextIndex), { timeout: 1800 });
    } else {
      globalThis.setTimeout(() => preloadFlavor(nextIndex), 900);
    }
  }, [index, preloadFlavor]);

  function goToNext() {
    setIndex((current) => (current + 1) % allFlavors.length);
  }

  function goToPrevious() {
    setIndex((current) => (current - 1 + allFlavors.length) % allFlavors.length);
  }

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-beige px-5 pt-32 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-date/70">Collection privée</p>
          <h1 className="mt-4 font-heading text-5xl font-semibold text-date sm:text-6xl">Nos saveurs</h1>
        </div>

        <div className="relative mt-14 grid min-h-[520px] items-center gap-10 md:grid-cols-[0.92fr_1.08fr]">
          <button
            type="button"
            onClick={goToPrevious}
            onPointerEnter={() => preloadFlavor((index - 1 + allFlavors.length) % allFlavors.length)}
            onFocus={() => preloadFlavor((index - 1 + allFlavors.length) % allFlavors.length)}
            className="focus-ring absolute left-0 top-[25%] z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-date text-cream shadow-soft transition hover:bg-chocolate md:-left-3 md:top-1/2"
            aria-label="Saveur précédente"
          >
            <ChevronLeft size={25} />
          </button>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.38 }}
            className="relative mx-auto aspect-[1.15/1] w-full max-w-xl [perspective:1200px]"
          >
            <div className="absolute inset-x-8 bottom-10 h-12 rounded-full bg-chocolate/20 blur-2xl" />
            <DateModelViewer
              modelPath={activeFlavor.modelPath ?? DATE_MODEL_PATH}
              posterPath={activeFlavor.image}
              flavorName={activeFlavor.name}
              onModelReady={preloadNextWhenIdle}
            />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeFlavor.slug}-copy`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.38 }}
              className="mx-auto max-w-3xl pr-0 md:pr-14"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">{categoryLabel}</p>
              <h2 className="mt-5 font-heading text-5xl leading-tight text-date sm:text-7xl">
                {activeFlavor.name}
              </h2>
              <p className="mt-7 text-2xl font-bold italic leading-tight text-date sm:text-4xl">
                {activeFlavor.notes}
              </p>
              <p className="mt-7 text-xl italic leading-9 text-date/90 sm:text-3xl sm:leading-[1.35]">
                {activeFlavor.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={goToNext}
            onPointerEnter={() => preloadFlavor((index + 1) % allFlavors.length)}
            onFocus={() => preloadFlavor((index + 1) % allFlavors.length)}
            className="focus-ring absolute right-0 top-[25%] z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-date text-cream shadow-soft transition hover:bg-chocolate md:-right-3 md:top-1/2"
            aria-label="Saveur suivante"
          >
            <ChevronRight size={25} />
          </button>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2 pb-14">
          {visibleDots.map((dot, dotIndex) => (
            <button
              key={dot.slug}
              type="button"
              onClick={() => setIndex(dotIndex)}
              onPointerEnter={() => preloadFlavor(dotIndex)}
              onFocus={() => preloadFlavor(dotIndex)}
              className={cn(
                "h-2.5 rounded-full transition",
                dot.isActive ? "w-10 bg-date" : "w-2.5 bg-date/28 hover:bg-date/50"
              )}
              aria-label={`Afficher ${dot.label}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
