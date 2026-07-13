import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";

const locales = ["de", "en", "fr"];
const staticPaths = ["", "hintergrund", "argumente", "initiativtext", "komitee", "news", "spenden-engagieren", "impressum", "datenschutz"];

export default async function sitemap() {
  await connectDB();
  const news = await News.find().select("slug locale updatedAt").lean();

  const staticEntries = locales.flatMap((locale) =>
    staticPaths.map((p) => ({
      url: `https://waldschutz-ja.ch/${locale}${p ? "/" + p : ""}`,
      lastModified: new Date(),
    }))
  );

  const newsEntries = news.map((n: any) => ({
    url: `https://waldschutz-ja.ch/${n.locale}/news/${n.slug}`,
    lastModified: n.updatedAt,
  }));

  return [...staticEntries, ...newsEntries];
}
