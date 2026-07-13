import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/lib/models/Subscriber";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await connectDB();
  const items = await Subscriber.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}
