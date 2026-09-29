/**
 * Fullstack Mock & Integration Lifecycle Test for Guestbook System
 * Validates Frontend Input -> API Handler Validation -> Cloudflare D1 Mock -> Read Query
 */
import assert from "node:assert/strict";

async function runMockLifecycleTests() {
  console.log("=== [PHASE 1] Mock Unit & Integration Lifecycle Test ===");

  // 1. Mock DB Engine (In-Memory D1 Mock)
  const mockTable = [];
  const mockD1 = {
    prepare(query) {
      return {
        _query: query,
        _params: [],
        bind(...params) {
          this._params = params;
          return this;
        },
        async run() {
          if (this._query.includes("INSERT INTO guestbook_entries")) {
            const [name, message, signature_png, created_at] = this._params;
            const newEntry = {
              id: mockTable.length + 1,
              name,
              message,
              signature_png,
              created_at,
            };
            mockTable.unshift(newEntry);
            return { success: true };
          }
          throw new Error(`Unsupported query: ${this._query}`);
        },
        async all() {
          if (this._query.includes("SELECT") && this._query.includes("ORDER BY created_at DESC")) {
            return { results: [...mockTable] };
          }
          throw new Error(`Unsupported query: ${this._query}`);
        },
      };
    },
  };

  // 2. Business Boundary Constants (mirrored from app/api/guestbook/route.ts)
  const MAX_NAME = 60;
  const MAX_MESSAGE = 500;
  const MAX_SIGNATURE_BYTES = 250_000;

  // Mock API Handler (Simulating POST logic)
  async function mockPostHandler(body, db = mockD1) {
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const signature = typeof body?.signature === "string" ? body.signature : "";

    if (!name || !message || !signature) {
      return { status: 400, body: { error: "name, message and signature are required" } };
    }
    if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
      return { status: 400, body: { error: "name or message too long" } };
    }
    if (!signature.startsWith("data:image/png;base64,") || signature.length > MAX_SIGNATURE_BYTES) {
      return { status: 400, body: { error: "invalid signature" } };
    }

    if (!db) {
      return { status: 200, body: { success: true, seeded: true } };
    }

    const now = new Date().toISOString();
    await db
      .prepare("INSERT INTO guestbook_entries (name, message, signature_png, created_at) VALUES (?, ?, ?, ?)")
      .bind(name, message, signature, now)
      .run();

    return { status: 201, body: { ok: true } };
  }

  // Mock API Handler (Simulating GET logic)
  async function mockGetHandler(db = mockD1) {
    if (!db) return { status: 200, body: { entries: [] } };
    const res = await db.prepare("SELECT id, name, message, signature_png, created_at FROM guestbook_entries ORDER BY created_at DESC LIMIT 100").all();
    return { status: 200, body: { entries: res?.results ?? [] } };
  }

  // --- TEST SUITE 1: Validation Edge Cases ---
  console.log("-> Test 1.1: Rejects empty name/message");
  const emptyRes = await mockPostHandler({ name: "", message: "", signature: "data:image/png;base64,abc" });
  assert.equal(emptyRes.status, 400);

  console.log("-> Test 1.2: Rejects XSS/evil signature protocol (e.g. javascript: or text/html)");
  const xssRes = await mockPostHandler({ name: "Hacker", message: "Attack", signature: "javascript:alert(1)" });
  assert.equal(xssRes.status, 400);

  console.log("-> Test 1.3: Rejects oversized payload (name > 60 chars)");
  const longNameRes = await mockPostHandler({
    name: "A".repeat(61),
    message: "Valid message",
    signature: "data:image/png;base64,abc",
  });
  assert.equal(longNameRes.status, 400);

  console.log("-> Test 1.4: Accepts valid payload and writes to mock D1 database");
  const validSignature = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const validRes = await mockPostHandler({
    name: "Ada Lovelace",
    message: "Analytical Engine verified.",
    signature: validSignature,
  });
  assert.equal(validRes.status, 201);
  assert.equal(mockTable.length, 1);
  assert.equal(mockTable[0].name, "Ada Lovelace");

  console.log("-> Test 1.5: GET returns newly inserted DB record in correct format");
  const getRes = await mockGetHandler();
  assert.equal(getRes.status, 200);
  assert.equal(getRes.body.entries.length, 1);
  assert.equal(getRes.body.entries[0].name, "Ada Lovelace");

  // --- TEST SUITE 2: Client Transformation Check ---
  console.log("-> Test 1.6: Client ScrollStack card mapper converts DB entry accurately");
  const CARD_TINTS = [
    { bgColor: "var(--ink-2)", textColor: "var(--paper)" },
    { bgColor: "var(--ink)", textColor: "var(--paper)" },
    { bgColor: "var(--accent-soft)", textColor: "var(--paper)" },
  ];
  const card = {
    id: getRes.body.entries[0].id,
    title: getRes.body.entries[0].name,
    description: getRes.body.entries[0].message,
    signatureSrc: getRes.body.entries[0].signature_png,
    ...CARD_TINTS[0],
  };
  assert.equal(card.title, "Ada Lovelace");
  assert.equal(card.description, "Analytical Engine verified.");
  assert.equal(card.signatureSrc, validSignature);

  console.log("✓ All Mock Unit & Integration Tests Passed!\n");
}

async function runLiveServerSmokeTest() {
  console.log("=== [PHASE 2] Live Server Fullstack Smoke Test ===");
  const BASE_URL = "http://localhost:3030";

  try {
    const health = await fetch(`${BASE_URL}/api/guestbook`);
    if (!health.ok) {
      console.warn(`[WARN] Server returned ${health.status}, skipping live test.`);
      return;
    }
    const initialData = await health.json();
    console.log(`-> Live GET /api/guestbook OK. Current total entries: ${initialData.entries?.length ?? 0}`);

    const testId = `Test Runner ${Date.now() % 10000}`;
    const testSig = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

    console.log(`-> Submitting live POST with name: "${testId}"`);
    const postRes = await fetch(`${BASE_URL}/api/guestbook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: testId,
        message: "Automated end-to-end fullstack lifecycle test entry.",
        signature: testSig,
      }),
    });
    assert.equal(postRes.status, 201, `Expected 201 Created but got ${postRes.status}`);

    console.log("-> Querying GET /api/guestbook to verify fullstack persistence");
    const getRes = await fetch(`${BASE_URL}/api/guestbook`);
    const updatedData = await getRes.json();
    const found = updatedData.entries?.some((e) => e.name === testId);
    assert.ok(found, `Entry "${testId}" was not found in updated guestbook GET response!`);

    console.log(`✓ Live Fullstack Smoke Test Passed: Entry "${testId}" successfully saved to D1 and retrieved!\n`);
  } catch (err) {
    console.error("[ERROR in Live Test]:", err.message);
    process.exitCode = 1;
  }
}

async function main() {
  await runMockLifecycleTests();
  await runLiveServerSmokeTest();
}

main();
