import Header from "@/components/Header";
import ProblemSection from "@/components/ProblemSection";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.background.title,
    description: messages.meta.background.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/hintergrund` },
  };
}

export default function BackgroundPage() {
  return (
    <>
      <Header />
      <main>
        <ProblemSection />
      </main>
      <Footer />
    </>
  );
}
