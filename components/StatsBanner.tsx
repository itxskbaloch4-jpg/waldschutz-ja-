import { useTranslations } from "next-intl";

export default function StatsBanner() {
  const t = useTranslations("hero");
  return (
    <section className="border-b border-line bg-alpine">
      <div className="container-page flex flex-col items-center gap-3 py-8 text-center md:flex-row md:justify-between md:text-left">
        <p className="text-base font-semibold text-forest sm:text-lg">{t("achievement")}</p>
        <span className="whitespace-nowrap rounded-full bg-federal/10 px-4 py-1 text-sm font-bold text-federal">
          107&apos;693
        </span>
      </div>
    </section>
  );
}
