import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.initiativeText.title,
    description: messages.meta.initiativeText.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/initiativtext` },
  };
}

function InitiativeContent() {
  const t = useTranslations("meta.initiativeText");
  return (
    <article className="container-page max-w-3xl py-16 prose prose-forest">
      <h1>{t("title")}</h1>
      <p>
        Eidgenössische Volksinitiative «Gegen die Zerstörung unserer Wälder durch Windturbinen
        (Waldschutz-Initiative)»
      </p>
      <h2>Die Bundesverfassung wird wie folgt geändert:</h2>
      <p><strong>Art. 77 Abs. 4</strong><br />
        Im Wald und im Abstand von 150 Metern zu Wald und zu Waldweiden, deren Bestockung dichter
        als 30 Prozent ist, dürfen keine Windkraftanlagen mit einer Gesamthöhe von 30 Metern oder
        mehr gebaut werden.
      </p>
      <p><strong>Art. 197 Ziff. 16</strong><br />
        Übergangsbestimmung zu Art. 77 Abs. 4 (Windkraftanlagen): Bauten und Anlagen oder
        Bodenveränderungen, welche nach dem 1. Mai 2024 erstellt werden und Artikel 77 Absatz 4
        widersprechen, müssen innert 18 Monaten nach dessen Annahme durch Volk und Stände zulasten
        der Ersteller abgebrochen beziehungsweise rückgängig gemacht werden. Der ursprüngliche
        Zustand ist wiederherzustellen.
      </p>
    </article>
  );
}

export default function InitiativeTextPage() {
  return (
    <>
      <Header />
      <main>
        <InitiativeContent />
      </main>
      <Footer />
    </>
  );
}
