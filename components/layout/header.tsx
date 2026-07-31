"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND_NAME } from "@/lib/catalog";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/saveurs", label: "Nos saveurs" },
  { href: "/#coffrets", label: "Coffrets" },
  { href: "/celebrations", label: "Célébrations" },
  { href: "/entreprises", label: "Entreprises" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-chocolate/10 bg-beige/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-chocolate" onClick={() => setMenuOpen(false)}>
          <span className="relative size-14 overflow-hidden rounded-full border border-gold/40 bg-date shadow-soft">
            <Image
              src="/images/logodg.jpg"
              alt={`${BRAND_NAME} logo`}
              fill
              sizes="56px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden font-heading text-2xl tracking-[0.04em] xl:inline">{BRAND_NAME}</span>
        </Link>
        <div className="hidden items-center gap-1 text-sm font-medium text-date lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-4 py-2 transition hover:bg-date hover:text-cream"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#coffrets"
          className="focus-ring hidden rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate sm:inline-flex"
        >
          Commander
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="focus-ring grid size-11 place-items-center rounded-full border border-date/18 text-date lg:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="border-t border-chocolate/10 bg-beige px-5 py-5 shadow-luxe lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-md px-4 py-3 text-sm font-semibold text-date transition hover:bg-date hover:text-cream"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#coffrets"
                onClick={() => setMenuOpen(false)}
                className="focus-ring mt-3 inline-flex justify-center rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate sm:hidden"
              >
                Commander
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
