import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Supporter from "@/lib/models/Supporter";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  firstName: z.string().min(1),
  role: z.string().optional(),
  organisation: z.string().optional(),
  email: z.string().email(),
  address: z.string().min(1),
  zip: z.string().min(1),
  city: z.string().min(1),
  canton: z.string().min(1),
  remarks: z.string().optional(),
  wantsPaymentSlip: z.boolean().optional(),
  wantsCommittee: z.boolean().optional(),
  wantsNewsletter: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  await Supporter.create(parsed.data);
  return NextResponse.json({ ok: true }, { status: 201 });
}
