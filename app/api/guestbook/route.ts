import { NextRequest, NextResponse } from "next/server";
import { getDb, type GuestbookEntry } from "@/app/lib/db";
import { SEED_GUESTBOOK_ENTRIES } from "@/app/lib/guestbookSeeds";

const MAX_NAME = 60;
const MAX_MESSAGE = 500;
const MAX_SIGNATURE_BYTES = 250_000; // base64 string length cap

// Sample entries exist for local development only. In production the guestbook shows
// real visitors' signatures or nothing; it never falls back to invented entries.
const demo = () => (process.env.NODE_ENV === "production" ? [] : SEED_GUESTBOOK_ENTRIES);

export async function GET() {
  try {
    const db = await getDb();
    if (!db) {
      return NextResponse.json({ entries: demo() });
    }
    const res = await db
      .prepare(
        "SELECT id, name, message, signature_png, created_at FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
      )
      .all();
    const results = res?.results as GuestbookEntry[] | undefined;
    if (!results || results.length === 0) {
      return NextResponse.json({ entries: demo() });
    }
    return NextResponse.json({ entries: results });
  } catch (err) {
    console.error("D1 guestbook fetch error:", err);
    return NextResponse.json({ entries: demo() });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const signature = typeof body?.signature === "string" ? body.signature : "";

  if (!name || !message || !signature) {
    return NextResponse.json({ error: "name, message and signature are required" }, { status: 400 });
  }
  if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "name or message too long" }, { status: 400 });
  }
  if (!signature.startsWith("data:image/png;base64,") || signature.length > MAX_SIGNATURE_BYTES) {
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const db = await getDb();
  if (!db) {
    if (process.env.NODE_ENV !== "production") return NextResponse.json({ success: true, seeded: true });
    return NextResponse.json({ error: "guestbook is temporarily unavailable" }, { status: 503 });
  }
  const now = new Date().toISOString();
  await db
    .prepare(
      "INSERT INTO guestbook_entries (name, message, signature_png, created_at) VALUES (?, ?, ?, ?)"
    )
    .bind(name, message, signature, now)
    .run();

  return NextResponse.json({ ok: true }, { status: 201 });
}
