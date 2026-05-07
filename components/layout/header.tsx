import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME } from "@/lib/catalog";

const navItems = [
  { href: "/#coffrets", label: "Nos coffrets" },
  { href: "/saveurs", label: "Nos saveurs" },
  { href: "/paiement", label: "Paiement" },
  { href: "/contact", label: "Contact" }
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-chocolate/10 bg-beige/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3 text-chocolate">
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
          <span className="hidden font-heading text-2xl tracking-[0.04em] sm:inline">{BRAND_NAME}</span>
        </Link>
        <div className="hidden items-center gap-5 text-sm font-medium text-date md:flex">
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
          className="focus-ring rounded-full bg-date px-5 py-3 text-sm font-semibold text-cream transition hover:bg-chocolate"
        >
          Commander
        </Link>
      </nav>
    </header>
  );
}
