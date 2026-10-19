import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(120),
  email: z.email().max(200),
  company: z.string().trim().max(160).nullish(),
  interest: z.string().trim().max(120).nullish(),
  message: z.string().trim().max(4000).nullish(),
  source: z.string().trim().max(60).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid request body" },
        { status: 400 },
      );
    }

    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input" },
        { status: 400 },
      );
    }

    const lead = await db.lead.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company ?? null,
        interest: parsed.data.interest ?? null,
        message: parsed.data.message ?? null,
        source: parsed.data.source ?? "contact-modal",
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error("[api/contact] failed to save lead:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong" },
      { status: 500 },
    );
  }
}
