import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import News from "@/lib/models/News";
import { isAdminAuthed } from "@/lib/adminAuth";
import { z } from "zod";

const createSchema = z.object({
  slug: z.string().min(1),
  locale: z.enum(["de", "en", "fr"]),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  body: z.string().min(1),
  coverImage: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") || "de";
  await connectDB();
  const items = await News.find({ locale }).sort({ publishedAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const parsed = createSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const item = await News.create(parsed.data);
  return NextResponse.json(item, { status: 201 });
}
