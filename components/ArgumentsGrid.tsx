import { useTranslations } from "next-intl";

interface ArgumentItem {
  title: string;
  text: string;
}

export default function ArgumentsGrid() {
  const t = useTranslations("arguments");
  const items = t.raw("items") as ArgumentItem[];

  return (
    <section id="argumente" className="bg-white py-16">
      <div className="container-page">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {items.map((item, i) => (
            <div key={i} className="rounded-2xl border border-line p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-federal">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-forest">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
