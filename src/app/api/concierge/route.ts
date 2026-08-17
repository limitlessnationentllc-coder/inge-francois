import { NextResponse } from "next/server";

/**
 * Stub INGÉ Concierge request-intake endpoint.
 *
 * Validates the request and logs it (and forwards to CONCIERGE_WEBHOOK_URL
 * if one is configured — see .env.example). To go live with a real intake
 * flow (CRM, private-client email, etc.), replace/extend the forwarding
 * step below; the form contract stays the same.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const request_type = typeof body?.requestType === "string" ? body.requestType : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  console.log("[concierge] request received:", { name, email, request_type, message });

  const webhook = process.env.CONCIERGE_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, requestType: request_type, message }),
      });
    } catch (err) {
      console.error("[concierge] failed to forward to CONCIERGE_WEBHOOK_URL:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
