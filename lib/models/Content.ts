import { Schema, model, models } from "mongoose";

export interface IContent {
  locale: "de" | "en" | "fr";
  hero: { title: string; subtitle: string; ctaLabel: string; ctaLink: string; image: string };
  stats: { achievementText: string; number: string };
  problem: { title: string; body1: string; body2: string; body3: string; image: string };
  arguments: { title: string; items: { title: string; text: string }[] };
  footer: { orgLine: string; association: string; copyright: string };
  donate: { title: string; org: string; address: string; bank: string; iban: string };
}

const ContentSchema = new Schema<IContent>(
  {
    locale: { type: String, enum: ["de", "en", "fr"], required: true, unique: true },
    hero: {
      title: String, subtitle: String, ctaLabel: String, ctaLink: String, image: String,
    },
    stats: { achievementText: String, number: String },
    problem: { title: String, body1: String, body2: String, body3: String, image: String },
    arguments: {
      title: String,
      items: [{ title: String, text: String }],
    },
    footer: { orgLine: String, association: String, copyright: String },
    donate: { title: String, org: String, address: String, bank: String, iban: String },
  },
  { timestamps: true }
);

export default models.Content || model<IContent>("Content", ContentSchema);
