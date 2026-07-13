import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Content from "@/lib/models/Content";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get("locale") || "de";
  await connectDB();
  const doc = await Content.findOne({ locale }).lean();
  return NextResponse.json(doc || null);
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  if (!body?.locale) {
    return NextResponse.json({ error: "locale_required" }, { status: 400 });
  }
  await connectDB();
  const updated = await Content.findOneAndUpdate(
    { locale: body.locale },
    { $set: body },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  ).lean();
  return NextResponse.json(updated);
}
