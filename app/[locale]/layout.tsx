import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales } from "@/i18n";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const generalSans = localFont({
  src: [
    { path: "../../public/fonts/GeneralSans-Semibold.woff2", weight: "600" },
    { path: "../../public/fonts/GeneralSans-Bold.woff2", weight: "700" },
  ],
  variable: "--font-general-sans",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const base = "https://waldschutz-ja.ch";
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return {
    metadataBase: new URL(base),
    title: { default: messages.meta.home.title, template: "%s | Waldschutz-Initiative" },
    description: messages.meta.home.description,
    alternates: {
      canonical: `${base}/${locale}`,
      languages: { de: `${base}/de`, en: `${base}/en`, fr: `${base}/fr` },
    },
    openGraph: {
      title: messages.meta.home.title,
      description: messages.meta.home.description,
      images: ["https://waldschutz-ja.ch/wp-content/uploads/2024/01/commune-mobile.png"],
      locale,
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${inter.variable} ${generalSans.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              name: "Verein für Naturschutz und Demokratie",
              url: "https://waldschutz-ja.ch",
              address: { "@type": "PostalAddress", addressLocality: "Bern", addressCountry: "CH" },
            }),
          }}
        />
      </body>
    </html>
  );
}
