import { describe, expect, it, beforeAll } from "bun:test";
import { app } from "../../server";
import { runSeed } from "@prep-lab/db";

beforeAll(async () => {
  await runSeed();
});

describe("POST /rpc/modules/list", () => {
  it("returns module summaries with progress counts", async () => {
    const res = await app.request("/rpc/modules/list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    expect(res.status).toBe(200);
    // oRPC RPCHandler wraps payloads in an envelope: { json: <value> }
    const envelope = (await res.json()) as {
      json: Array<{
        slug: string;
        totalSections: number;
        completedSections: number;
      }>;
    };
    const body = envelope.json;
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    const tr = body.find((m) => m.slug === "tanstack-router");
    expect(tr).toBeDefined();
    expect(typeof tr!.totalSections).toBe("number");
    expect(typeof tr!.completedSections).toBe("number");
  });
});
