import Header from "@/components/Header";
import CommitteeGrid from "@/components/CommitteeGrid";
import Footer from "@/components/Footer";

export async function generateMetadata({ params: { locale } }: any) {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.committee.title,
    description: messages.meta.committee.description,
    alternates: { canonical: `https://waldschutz-ja.ch/${locale}/komitee` },
  };
}

export default function CommitteePage() {
  return (
    <>
      <Header />
      <main>
        <CommitteeGrid />
      </main>
      <Footer />
    </>
  );
}
