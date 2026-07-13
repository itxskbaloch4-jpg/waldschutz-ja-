import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/lib/models/Subscriber";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  locale: z.enum(["de", "en", "fr"]),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  try {
    await Subscriber.create(parsed.data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e: any) {
    if (e.code === 11000) {
      return NextResponse.json({ error: "already_subscribed" }, { status: 409 });
    }
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
