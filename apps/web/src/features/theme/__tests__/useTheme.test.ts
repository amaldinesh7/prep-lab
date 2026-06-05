import { describe, expect, it } from "bun:test";
import { resolveInitialTheme } from "../useTheme";

describe("resolveInitialTheme", () => {
  it("uses stored value when present", () => {
    expect(resolveInitialTheme({ stored: "dark", systemPrefersDark: false })).toBe("dark");
  });
  it("falls back to system preference", () => {
    expect(resolveInitialTheme({ stored: null, systemPrefersDark: true })).toBe("dark");
    expect(resolveInitialTheme({ stored: null, systemPrefersDark: false })).toBe("light");
  });
});
