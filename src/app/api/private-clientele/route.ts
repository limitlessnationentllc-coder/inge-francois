import { NextResponse } from "next/server";

/**
 * Stub INGÉ Private Clientele application endpoint. No membership system
 * exists yet (v1 is intentionally a waitlist) — this just validates and
 * logs the application. Wire to a real CRM/list once the tier launches.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const note = typeof body?.note === "string" ? body.note.trim() : "";

  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A name and valid email address are required." }, { status: 400 });
  }

  console.log("[private-clientele] application:", { name, email, note });

  return NextResponse.json({ ok: true });
}
