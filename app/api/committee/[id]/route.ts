import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CommitteeMember from "@/lib/models/CommitteeMember";
import { isAdminAuthed } from "@/lib/adminAuth";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json().catch(() => null);
  await connectDB();
  const updated = await CommitteeMember.findByIdAndUpdate(params.id, { $set: body }, { new: true });
  if (!updated) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await connectDB();
  await CommitteeMember.findByIdAndDelete(params.id);
  return NextResponse.json({ ok: true });
}
