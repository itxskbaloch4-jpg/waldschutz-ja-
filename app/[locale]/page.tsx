import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBanner from "@/components/StatsBanner";
import ProblemSection from "@/components/ProblemSection";
import ArgumentsGrid from "@/components/ArgumentsGrid";
import NewsPreview from "@/components/NewsPreview";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBanner />
        <ProblemSection />
        <ArgumentsGrid />
        <NewsPreview />
      </main>
      <Footer />
    </>
  );
}
