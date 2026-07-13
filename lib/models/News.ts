import { Schema, model, models } from "mongoose";

export interface INews {
  slug: string;
  locale: "de" | "en" | "fr";
  title: string;
  excerpt?: string;
  body: string;
  coverImage?: string;
  publishedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    locale: { type: String, enum: ["de", "en", "fr"], required: true },
    title: { type: String, required: true },
    excerpt: { type: String },
    body: { type: String, required: true },
    coverImage: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.News || model<INews>("News", NewsSchema);
