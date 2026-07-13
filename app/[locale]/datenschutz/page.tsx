import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.privacy.title,
    description: messages.meta.privacy.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/datenschutz` },
  };
}

export default function DatenschutzPage() {
  return (
    <>
      <Header />
      <main className="container-page max-w-2xl py-16 prose prose-forest">
        <h1>Datenschutz</h1>
        <p>
          Diese Website erhebt personenbezogene Daten ausschliesslich für die Zwecke der
          Unterstützung der Waldschutz-Initiative (Newsletter, Spendenformular, Komiteebeitritt).
          Daten werden ausschliesslich für diesen Zweck gespeichert und nicht an Dritte
          weitergegeben. Anfragen zur Löschung oder Einsicht an{" "}
          <a href="mailto:info@protection-forets-oui.ch">info@protection-forets-oui.ch</a>.
        </p>
      </main>
      <Footer />
    </>
  );
}
