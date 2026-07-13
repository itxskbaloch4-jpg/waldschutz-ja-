import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CommitteeMember from "@/lib/models/CommitteeMember";
import { isAdminAuthed } from "@/lib/adminAuth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  image: z.string().min(1),
  order: z.number().optional(),
});

export async function GET() {
  await connectDB();
  const members = await CommitteeMember.find().sort({ order: 1, name: 1 }).lean();
  return NextResponse.json(members);
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const member = await CommitteeMember.create(parsed.data);
  return NextResponse.json(member, { status: 201 });
}
