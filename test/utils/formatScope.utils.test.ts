import { describe, it, expect } from "vitest";
import { formatScope } from "../../src/utils/formatScope.utils";
import type { HolidayScope } from "../../src/types";

describe("formatScope", () => {
  it("should return null for undefined scope", () => {
    expect(formatScope(undefined)).toBeNull();
  });

  it("should return null for empty scope", () => {
    expect(formatScope("" as HolidayScope)).toBeNull();
  });

  it("should format 'national' scope", () => {
    const result = formatScope("national");
    expect(result).toContain("National");
    expect(result).toContain("nationwide");
  });

  it("should format 'dashain' scope", () => {
    const result = formatScope("dashain");
    expect(result).toContain("Dashain");
  });

  it("should format 'tihar' scope", () => {
    const result = formatScope("tihar");
    expect(result).toContain("Tihar");
  });

  it("should format 'ethnic' scope", () => {
    const result = formatScope("ethnic");
    expect(result).toContain("Ethnic");
  });

  it("should format 'women' scope", () => {
    const result = formatScope("women");
    expect(result).toContain("Women");
  });

  it("should format 'education' scope", () => {
    const result = formatScope("education");
    expect(result).toContain("Education");
  });

  it("should format 'kathmandu-valley' scope", () => {
    const result = formatScope("kathmandu-valley");
    expect(result).toContain("Kathmandu Valley");
  });

  it("should format 'observed' scope", () => {
    const result = formatScope("observed");
    expect(result).toContain("Observed");
  });

  it("should format 'disabilities' scope", () => {
    const result = formatScope("disabilities");
    expect(result).toContain("Disabilities");
  });

  it("should format 'birth-anniversary' scope", () => {
    const result = formatScope("birth-anniversary");
    expect(result).toContain("Birth Anniversary");
  });

  it("should format 'office-open' scope", () => {
    const result = formatScope("office-open");
    expect(result).toContain("Office Open");
  });

  it("should return the scope value as fallback for unknown scope", () => {
    const result = formatScope("unknown-scope" as HolidayScope);
    expect(result).toBe("unknown-scope");
  });

  it("should return descriptive label for all known scopes", () => {
    const scopes: HolidayScope[] = [
      "national",
      "dashain",
      "tihar",
      "ethnic",
      "women",
      "education",
      "kathmandu-valley",
      "observed",
      "disabilities",
      "birth-anniversary",
      "office-open",
    ];

    scopes.forEach((scope) => {
      const result = formatScope(scope);
      expect(result).not.toBeNull();
      expect(typeof result).toBe("string");
      expect(result!.length).toBeGreaterThan(0);
    });
  });
});
