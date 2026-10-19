import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INTENTS = new Set([
  "AI & Gen AI",
  "Data & Cloud",
  "Web & Automation",
  "Not sure yet",
  "General",
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const intentRaw = typeof body.intent === "string" ? body.intent.trim() : "General";
    const intent = INTENTS.has(intentRaw) ? intentRaw : "General";

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json(
        { ok: false, error: "Please tell us your name." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json(
        { ok: false, error: "That email doesn't look right." },
        { status: 400 }
      );
    }
    if (message.length < 10 || message.length > 4000) {
      return NextResponse.json(
        { ok: false, error: "Add a sentence or two about what you're building (10+ characters)." },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        company: company || null,
        message,
        intent,
        source: "website-contact",
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch (err) {
    console.error("[/api/contact] failed:", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong on our side — please retry, or email ashu@kramoraa.com." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "contact", method: "POST" });
}
