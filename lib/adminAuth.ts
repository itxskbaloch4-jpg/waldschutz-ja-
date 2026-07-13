import { NextRequest } from "next/server";

export function isAdminAuthed(req: NextRequest): boolean {
  const cookie = req.cookies.get("admin_session")?.value;
  return !!cookie && !!process.env.ADMIN_TOKEN && cookie === process.env.ADMIN_TOKEN;
}
