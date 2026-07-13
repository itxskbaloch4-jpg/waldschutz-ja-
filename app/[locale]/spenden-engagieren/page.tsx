import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportForm from "@/components/SupportForm";
import NewsletterForm from "@/components/NewsletterForm";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.support.title,
    description: messages.meta.support.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/spenden-engagieren` },
  };
}

export default async function SupportPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: "donate" });

  return (
    <>
      <Header />
      <main className="container-page grid gap-10 py-16 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <div className="mt-4 rounded-2xl border border-line bg-white p-6 text-sm">
            <p className="font-semibold text-forest">{t("org")}</p>
            <p>{t("address")}</p>
            <p className="mt-2">{t("bank")}</p>
            <p className="font-mono">{t("iban")}</p>
          </div>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
        <SupportForm />
      </main>
      <Footer />
    </>
  );
}
