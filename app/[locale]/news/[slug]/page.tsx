import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { locale: string; slug: string } }) {
  await connectDB();
  const item: any = await News.findOne({ slug: params.slug, locale: params.locale }).lean();
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `https://waldschutz-ja.ch/${params.locale}/news/${params.slug}` },
    openGraph: { images: item.coverImage ? [item.coverImage] : [] },
  };
}

export default async function NewsDetailPage({ params }: { params: { locale: string; slug: string } }) {
  await connectDB();
  const item: any = await News.findOne({ slug: params.slug, locale: params.locale }).lean();
  if (!item) notFound();

  return (
    <>
      <Header />
      <main>
        <article className="container-page max-w-3xl py-16 prose prose-forest">
          <h1>{item.title}</h1>
          <p className="text-sm text-ink/50">{new Date(item.publishedAt).toLocaleDateString(params.locale)}</p>
          <div dangerouslySetInnerHTML={{ __html: item.body }} />
        </article>
      </main>
      <Footer />
    </>
  );
}
