import { describe, expect, it } from "bun:test";
import { sectionKindSchema, sectionResponseSchema } from "../section";

describe("sectionKindSchema", () => {
  it("accepts all known section kinds", () => {
    const kinds = ["concept", "why", "pattern", "tradeoff", "gotcha", "reading", "mini_project", "challenge", "quiz", "cheatsheet"] as const;
    for (const k of kinds) expect(sectionKindSchema.parse(k)).toBe(k);
  });
  it("rejects unknown kinds", () => {
    expect(() => sectionKindSchema.parse("nope")).toThrow();
  });
});

describe("sectionResponseSchema", () => {
  it("requires body markdown", () => {
    expect(() =>
      sectionResponseSchema.parse({ id: "x", moduleId: "y", slug: "a", title: "T", kind: "concept", orderIndex: 1, estMinutes: 5 }),
    ).toThrow();
  });
});
