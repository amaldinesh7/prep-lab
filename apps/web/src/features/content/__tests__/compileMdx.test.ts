import { describe, expect, it } from "bun:test";
import { compileMdx } from "../compileMdx";

describe("compileMdx", () => {
  it("returns a renderable React component string", async () => {
    const code = await compileMdx("# hello");
    expect(code).toContain("MDXContent");
  });
});
