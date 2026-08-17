import { NextResponse } from "next/server";

/**
 * Stub newsletter/private-client-list signup endpoint.
 *
 * Validates and logs the submission. To go live, replace the body of the
 * try block with a call to a real ESP (Klaviyo, Shopify customer API,
 * Mailchimp, etc.) — the request/response contract for the frontend
 * (src/components/forms/NewsletterForm.tsx) will not need to change.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  // TODO: forward to real ESP once one is connected.
  console.log(`[newsletter] signup: ${email}`);

  return NextResponse.json({ ok: true });
}
