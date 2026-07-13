import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Content from "@/lib/models/Content";
import CommitteeMember from "@/lib/models/CommitteeMember";
import { isAdminAuthed } from "@/lib/adminAuth";
import de from "@/messages/de.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";

const MESSAGES: Record<string, any> = { de, en, fr };

const SEED_MEMBERS = [
  { name: "Alfred R. Sulzer", role: "Unternehmer und Denkmalschützer, Ehrenpräsident Domus Antiqua Helvetica, Malans", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Alfred-Sulzer-819x1024.jpg", order: 1 },
  { name: "Fabienne Duelli", role: "Kantonsrätin AR, parteilos, SP-Fraktion, Wald", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Fabienne-Duelli.png", order: 2 },
  { name: "Urs N. Glutz von Blotzheim", role: "Weltbekannter Ornithologe und Naturschützer, Schwyz", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Urs-Glutz-scaled-e1709284189663-848x1024.jpg", order: 3 },
  { name: "Benoît Glasson", role: "Grossrat FDP FR, Zimmermeister, Sorens", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Benoit-Glasson-1024x1024.jpg", order: 4 },
  { name: "Raphael Alder", role: "Gemeinderat FDP Russikon ZH, Madetswil", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Raphael-Alder-scaled-1-768x1024.jpeg", order: 5 },
  { name: "Nicolas Fasel", role: "Prof. erem. Biologie Universität Lausanne, Paudex", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Nicolas-Fasel-scaled-1-1024x682.jpg", order: 6 },
  { name: "David Gerke", role: "Kantonsrat SO Grüne, Biberist", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/SO_NR_GPS_David_Gerke_Quadrat-scaled-1-1024x1024.jpg", order: 7 },
  { name: "Antoinette de Weck", role: "Grossrätin FDP FR, ehem. Geschäftsführerin Pro Natura FR, Fribourg", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/DE-WECK-Antoinette-1024x683.jpg", order: 8 },
  { name: "Marco Zimmermann", role: "Vorstandsmitglied Freie Landschaft Thurgau, Braunau", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Marco_Zimmermann_01-1024x665.jpg", order: 9 },
  { name: "Jean-Marc Blanc", role: "Generalsekretär PL VD, Consultant, Bottens", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Jean-Marc-Blanc-856x1024.jpg", order: 10 },
  { name: "Urs Waltenspül", role: "Präsident Freie Landschaft Aargau & Luzern, Elektroingenieur HTL, Aarau", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Waltenspul_Urs-scaled-1-830x1024.jpg", order: 11 },
  { name: "Siegfried Hettegger", role: "Präsident Freie Landschaft Schwyz, Informatiker, Feusisberg", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Siegfried-Hettegger-scaled-1-1024x1024.jpg", order: 12 },
  { name: "Elias Vogt", role: "Unternehmer, Umweltschützer und Präsident Freie Landschaft Schweiz, Grenchen", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Portrat-Elias-schlecht-aufgelost.png", order: 13 },
  { name: "Marc Kéry", role: "Naturschutzbiologe, Dozent Universität Zürich, Basel", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Marc-Kery-768x1024.jpg", order: 14 },
  { name: "Hans Weiss (†)", role: "Ehem. Geschäftsleiter der Stiftung Landschaftsschutz, Bern", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Bilder-Hans-Weiss-770x1024.jpg", order: 15 },
  { name: "Michel Fior", role: "Präsident Paysage Libre BEJUNE, Müntschemier", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Fior_Michel_PLCH-844x1024.jpg", order: 16 },
  { name: "Andreas Sudler", role: "Gemeindepräsident Bauma ZH, Bauma", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/03/Res-Sudler-768x1024.jpg", order: 17 },
  { name: "Martin Maletinsky", role: "Präsident Freie Landschaft Zürich, Informatiker, Kilchberg ZH", image: "https://waldschutz-ja.ch/wp-content/uploads/2024/09/DSC_3395.klein_-851x1024.jpg", order: 18 },
];

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await connectDB();

  for (const locale of ["de", "en", "fr"]) {
    const m = MESSAGES[locale];
    const exists = await Content.findOne({ locale });
    if (exists) continue;
    await Content.create({
      locale,
      hero: {
        title: m.hero.title,
        subtitle: m.hero.subtitle,
        ctaLabel: m.hero.cta,
        ctaLink: "https://waldschutz-ja.ch/wp-content/uploads/2024/02/17138_PAYSAGE_LIBRE_SIMPLE_INITIATIVE_A4_DE_WEB_MOBILE_FORET_FR.pdf",
        image: "https://waldschutz-ja.ch/wp-content/uploads/2024/01/commune-mobile.png",
      },
      stats: { achievementText: m.hero.achievement, number: "107'693" },
      problem: {
        title: m.problem.title,
        body1: m.problem.body1,
        body2: m.problem.body2,
        body3: m.problem.body3,
        image: "https://waldschutz-ja.ch/wp-content/uploads/2025/07/UeBERGABE-1-1024x652.jpg",
      },
      arguments: { title: m.arguments.title, items: m.arguments.items },
      footer: { orgLine: m.footer.orgLine, association: m.footer.association, copyright: m.footer.copyright },
      donate: { title: m.donate.title, org: m.donate.org, address: m.donate.address, bank: m.donate.bank, iban: m.donate.iban },
    });
  }

  const memberCount = await CommitteeMember.countDocuments();
  if (memberCount === 0) {
    await CommitteeMember.insertMany(SEED_MEMBERS);
  }

  return NextResponse.json({ ok: true });
}
