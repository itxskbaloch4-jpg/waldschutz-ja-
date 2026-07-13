import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div className="container-page grid gap-8 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{t("title")}</h1>
          <p className="mt-4 max-w-md text-white/80">{t("subtitle")}</p>
          
            href="https://waldschutz-ja.ch/wp-content/uploads/2024/02/17138_PAYSAGE_LIBRE_SIMPLE_INITIATIVE_A4_DE_WEB_MOBILE_FORET_FR.pdf"
            className="btn-primary mt-8"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("cta")}
          </a>
        </div>
        <div className="relative h-64 w-full sm:h-80 md:h-96">
          <Image
            src="https://waldschutz-ja.ch/wp-content/uploads/2024/01/commune-mobile.png"
            alt="Schweizer Waldlandschaft bedroht durch Windkraftanlagen"
            fill
            priority
            className="rounded-2xl object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
