import Header from "@/components/Header";
import ArgumentsGrid from "@/components/ArgumentsGrid";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.arguments.title,
    description: messages.meta.arguments.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/argumente` },
  };
}

export default function ArgumentsPage() {
  return (
    <>
      <Header />
      <main>
        <ArgumentsGrid />
      </main>
      <Footer />
    </>
  );
}
