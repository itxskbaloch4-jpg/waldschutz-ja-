"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  const links = [
    { href: `/${locale}/hintergrund`, label: t("background") },
    { href: `/${locale}/argumente`, label: t("arguments") },
    { href: `/${locale}/initiativtext`, label: t("initiativeText") },
    { href: `/${locale}/komitee`, label: t("committee") },
    { href: `/${locale}/news`, label: t("news") },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-alpine/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="font-display text-lg font-bold text-forest">
          Waldschutz-Initiative
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-ink/80 hover:text-forest">
              {l.label}
            </Link>
          ))}
          <Link href={`/${locale}/spenden-engagieren`} className="btn-primary">
            {t("support")}
          </Link>
          <LanguageSwitcher />
        </nav>

        <button
          className="flex items-center gap-2 lg:hidden"
          aria-expanded={open}
          aria-label="Menu"
          onClick={() => setOpen(!open)}
        >
          <span className="text-sm font-semibold text-forest">Menu</span>
        </button>
      </div>

      {open && (
        <nav className="container-page flex flex-col gap-4 border-t border-line py-4 lg:hidden">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm font-medium text-ink/80">
              {l.label}
            </Link>
          ))}
          <Link href={`/${locale}/spenden-engagieren`} className="btn-primary w-fit" onClick={() => setOpen(false)}>
            {t("support")}
          </Link>
          <LanguageSwitcher />
        </nav>
      )}
    </header>
  );
}
