"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "../components/ui";
import { SignaturePad, type SignaturePadHandle } from "../components/SignaturePad";
import { ArrowFillButton } from "@/components/block/arrow-fill-button";
import { ScrollStack, type ScrollStackCard } from "@/components/block/scroll-stack";
import type { GuestbookEntry } from "../lib/db";

const CARD_TINTS = [
  { bgColor: "var(--ink-2)", textColor: "var(--paper)" },
  { bgColor: "var(--ink)", textColor: "var(--paper)" },
  { bgColor: "var(--accent-soft)", textColor: "var(--paper)" },
];

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const padRef = useRef<SignaturePadHandle>(null);

  useEffect(() => {
    fetch("/api/guestbook")
      .then((r) => r.json())
      .then((data) => setEntries(data.entries ?? []))
      .catch(() => setError("couldn't load the guestbook"))
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const signature = padRef.current?.toDataUrl();
    if (!name.trim() || !message.trim() || !signature) {
      setError("name, message and a drawn signature are all required");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, signature }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "submission failed");
      }
      setEntries((prev) => [
        { id: Date.now(), name, message, signature_png: signature, created_at: new Date().toISOString() },
        ...prev,
      ]);
      setName("");
      setMessage("");
      padRef.current?.clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  const cards: ScrollStackCard[] = entries.map((e, i) => ({
    id: e.id,
    title: e.name,
    description: e.message,
    signatureSrc: e.signature_png,
    ...CARD_TINTS[i % CARD_TINTS.length],
  }));

  return (
    <>
      <section className="block" style={{ paddingBottom: 40 }}>
        <Reveal className="wrap">
          <div className="rowhead">
            <span className="num">02</span>
            <h2>guestbook</h2>
          </div>
          <p className="display" style={{ marginBottom: 20 }}>
            Sign the line. Leave a word, draw your name.
          </p>

          <form onSubmit={onSubmit} style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 14 }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              maxLength={60}
              required
              className="mono"
              style={{
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "12px 14px",
                color: "var(--paper)",
                fontSize: 13,
              }}
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="a message"
              maxLength={500}
              rows={3}
              required
              style={{
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "12px 14px",
                color: "var(--paper)",
                fontSize: 14,
                resize: "vertical",
              }}
            />
            <SignaturePad ref={padRef} />
            {error && (
              <p className="mono" style={{ color: "var(--accent)", fontSize: 11 }}>
                {error}
              </p>
            )}
            <div>
              <ArrowFillButton as="button" type="submit" disabled={submitting}>
                {submitting ? "signing…" : "sign the guestbook"}
              </ArrowFillButton>
            </div>
          </form>
        </Reveal>
      </section>

      {!loading && cards.length > 0 && (
        <ScrollStack cards={cards} viewportHeight="70vh" contained />
      )}

      {!loading && cards.length === 0 && (
        <p className="wrap mono" style={{ color: "var(--faint)", paddingBottom: 80 }}>
          no signatures yet, be the first.
        </p>
      )}
    </>
  );
}
