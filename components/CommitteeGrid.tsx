import { useTranslations } from "next-intl";
import Image from "next/image";

const MEMBERS = [
  { name: "Alfred R. Sulzer", role: "Unternehmer und Denkmalschützer, Ehrenpräsident Domus Antiqua Helvetica, Malans", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Alfred-Sulzer-819x1024.jpg" },
  { name: "Fabienne Duelli", role: "Kantonsrätin AR, parteilos, SP-Fraktion, Wald", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Fabienne-Duelli.png" },
  { name: "Urs N. Glutz von Blotzheim", role: "Weltbekannter Ornithologe und Naturschützer, Schwyz", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Urs-Glutz-scaled-e1709284189663-848x1024.jpg" },
  { name: "Benoît Glasson", role: "Grossrat FDP FR, Zimmermeister, Sorens", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Benoit-Glasson-1024x1024.jpg" },
  { name: "Raphael Alder", role: "Gemeinderat FDP Russikon ZH, Madetswil", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Raphael-Alder-scaled-1-768x1024.jpeg" },
  { name: "Nicolas Fasel", role: "Prof. erem. Biologie Universität Lausanne, Paudex", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Nicolas-Fasel-scaled-1-1024x682.jpg" },
  { name: "David Gerke", role: "Kantonsrat SO Grüne, Biberist", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/SO_NR_GPS_David_Gerke_Quadrat-scaled-1-1024x1024.jpg" },
  { name: "Antoinette de Weck", role: "Grossrätin FDP FR, ehem. Geschäftsführerin Pro Natura FR, Fribourg", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/DE-WECK-Antoinette-1024x683.jpg" },
  { name: "Marco Zimmermann", role: "Vorstandsmitglied Freie Landschaft Thurgau, Braunau", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Marco_Zimmermann_01-1024x665.jpg" },
  { name: "Jean-Marc Blanc", role: "Generalsekretär PL VD, Consultant, Bottens", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Jean-Marc-Blanc-856x1024.jpg" },
  { name: "Urs Waltenspül", role: "Präsident Freie Landschaft Aargau & Luzern, Elektroingenieur HTL, Aarau", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Waltenspul_Urs-scaled-1-830x1024.jpg" },
  { name: "Siegfried Hettegger", role: "Präsident Freie Landschaft Schwyz, Informatiker, Feusisberg", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Siegfried-Hettegger-scaled-1-1024x1024.jpg" },
  { name: "Elias Vogt", role: "Unternehmer, Umweltschützer und Präsident Freie Landschaft Schweiz, Grenchen", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Portrat-Elias-schlecht-aufgelost.png" },
  { name: "Marc Kéry", role: "Naturschutzbiologe, Dozent Universität Zürich, Basel", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Marc-Kery-768x1024.jpg" },
  { name: "Hans Weiss (†)", role: "Ehem. Geschäftsleiter der Stiftung Landschaftsschutz, Bern", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Bilder-Hans-Weiss-770x1024.jpg" },
  { name: "Michel Fior", role: "Präsident Paysage Libre BEJUNE, Müntschemier", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Fior_Michel_PLCH-844x1024.jpg" },
  { name: "Andreas Sudler", role: "Gemeindepräsident Bauma ZH, Bauma", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Res-Sudler-768x1024.jpg" },
  { name: "Martin Maletinsky", role: "Präsident Freie Landschaft Zürich, Informatiker, Kilchberg ZH", img: "https://waldschutz-ja.ch/wp-content/uploads/2024/09/DSC_3395.klein_-851x1024.jpg" },
];

export default function CommitteeGrid() {
  const t = useTranslations("committee");
  return (
    <section className="container-page py-16">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="mt-4 max-w-2xl text-sm text-ink/70">{t("intro")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {MEMBERS.map((m) => (
          <div key={m.name} className="rounded-2xl border border-line bg-white p-4 text-center">
            <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
              <img src={m.img} alt={m.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <h3 className="mt-3 font-semibold text-forest">{m.name}</h3>
            <p className="mt-1 text-xs text-ink/60">{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
