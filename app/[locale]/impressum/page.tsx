import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.legal.title,
    description: messages.meta.legal.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/impressum` },
  };
}

export default function ImpressumPage() {
  return (
    <>
      <Header />
      <main className="container-page max-w-2xl py-16 prose prose-forest">
        <h1>Impressum</h1>
        <p>
          Eidgenössische Volksinitiative «Gegen die Zerstörung unserer Wälder durch Windturbinen
          (Waldschutz-Initiative)».
        </p>
        <p>Verein für Naturschutz und Demokratie, Postfach, 3001 Bern</p>
        <p>
          E-Mail:{" "}
          <a href="mailto:info@protection-forets-oui.ch">info@protection-forets-oui.ch</a>
        </p>
      </main>
      <Footer />
    </>
  );
}
