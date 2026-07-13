import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="border-t border-line bg-forest text-white">
      <div className="container-page py-12">
        <p className="max-w-2xl text-sm text-white/80">{t("orgLine")}</p>
        <p className="mt-4 text-sm text-white/60">{t("association")}</p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm">
          <a href="https://www.facebook.com/profile.php?id=61570631723641" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a>
          <a href="https://www.instagram.com/freie_landschaft_schweiz/" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a>
          <a href="https://x.com/Windkraft__NEIN" target="_blank" rel="noopener noreferrer" className="hover:underline">X</a>
          <a href="https://gemeindeschutz-ja.ch/" target="_blank" rel="noopener noreferrer" className="hover:underline">{t("secondInitiative")}</a>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row">
          <div className="flex gap-4">
            <Link href={`/${locale}/impressum`} className="hover:underline">{t("legal")}</Link>
            <Link href={`/${locale}/datenschutz`} className="hover:underline">{t("privacy")}</Link>
          </div>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
