import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.news.title,
    description: messages.meta.news.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/news` },
  };
}

export default async function NewsListPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "news" });
  await connectDB();
  const items = await News.find({ locale }).sort({ publishedAt: -1 }).lean();

  return (
    <>
      <Header />
      <main className="container-page py-16">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((n: any) => (
            <Link
              key={n.slug}
              href={`/${locale}/news/${n.slug}`}
              className="rounded-2xl border border-line bg-white p-5 hover:border-forest"
            >
              <p className="text-xs text-ink/50">{new Date(n.publishedAt).toLocaleDateString(locale)}</p>
              <h2 className="mt-2 font-semibold text-forest">{n.title}</h2>
              <p className="mt-2 text-sm text-ink/70">{n.excerpt}</p>
            </Link>
          ))}
          {items.length === 0 && <p className="text-sm text-ink/60">—</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}
