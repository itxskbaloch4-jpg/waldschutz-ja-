import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";

export default async function NewsPreview() {
  const t = useTranslations("news");
  const locale = useLocale();

  await connectDB();
  const items = await News.find({ locale }).sort({ publishedAt: -1 }).limit(3).lean();

  if (!items.length) return null;

  return (
    <section id="news" className="container-page py-16">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold sm:text-3xl">{t("title")}</h2>
        <Link href={`/${locale}/news`} className="text-sm font-semibold text-federal hover:underline">
          {t("all")}
        </Link>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n: any) => (
          <Link
            key={n.slug}
            href={`/${locale}/news/${n.slug}`}
            className="rounded-2xl border border-line bg-white p-5 transition-colors hover:border-forest"
          >
            <p className="text-xs text-ink/50">{new Date(n.publishedAt).toLocaleDateString(locale)}</p>
            <h3 className="mt-2 font-semibold text-forest">{n.title}</h3>
            <p className="mt-2 text-sm text-ink/70">{n.excerpt}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-federal">{t("more")} →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
