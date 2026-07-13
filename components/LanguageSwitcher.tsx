"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const LANGS = [
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(code: string) {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-line p-1" role="group" aria-label="Language selector">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          aria-current={locale === l.code}
          className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
            locale === l.code ? "bg-forest text-white" : "text-forest hover:bg-alpine"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
