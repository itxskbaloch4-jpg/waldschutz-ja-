import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProblemSection() {
  const t = useTranslations("problem");
  return (
    <section id="hintergrund" className="container-page py-16">
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">{t("body1")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">{t("body2")}</p>
          <p className="mt-4 text-sm leading-relaxed text-ink/80">{t("body3")}</p>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:h-full">
          <Image
            src="https://waldschutz-ja.ch/wp-content/uploads/2025/07/UeBERGABE-1-1024x652.jpg"
            alt="Übergabe der Unterschriften an die Bundeskanzlei"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
