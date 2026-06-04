import { describe, expect, it } from "bun:test";
import { loadSectionBody } from "../loader";

describe("loadSectionBody", () => {
  it("reads an mdx file by path", async () => {
    const text = await loadSectionBody("modules/tanstack-router/sections/exemplar.mdx");
    expect(text).toContain("Placeholder");
  });
  it("throws on unknown path", async () => {
    await expect(loadSectionBody("modules/does-not-exist.mdx")).rejects.toThrow();
  });
});
