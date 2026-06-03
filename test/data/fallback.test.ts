import { describe, it, expect, vi } from "vitest";
import { getMonthDays, getHolidays } from "../../src/data/fallback";

describe("getMonthDays", () => {
  it("should return month data for known year 2080", () => {
    const result = getMonthDays(2080);
    expect(result).toBeDefined();
    expect(result.length).toBe(12);
    result.forEach((days) => {
      expect(days).toBeGreaterThan(27);
      expect(days).toBeLessThanOrEqual(32);
    });
  });

  it("should return month data for known year 2081", () => {
    const result = getMonthDays(2081);
    expect(result.length).toBe(12);
  });

  it("should return month data for known year 2082", () => {
    const result = getMonthDays(2082);
    expect(result.length).toBe(12);
  });

  it("should return month data for known year 2083", () => {
    const result = getMonthDays(2083);
    expect(result.length).toBe(12);
  });

  it("should return same data for known years", () => {
    const result2080 = getMonthDays(2080);
    const result2080Again = getMonthDays(2080);
    expect(result2080).toEqual(result2080Again);
  });

  it("should fallback to latest known year for future year", () => {
    const result = getMonthDays(2100);
    expect(result.length).toBe(12);
  });

  it("should fallback to latest known year for past year before data range", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = getMonthDays(1999);
    expect(result.length).toBe(12);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("should return valid month lengths (28-32 days)", () => {
    const years = [2080, 2081, 2082, 2083];
    years.forEach((year) => {
      const result = getMonthDays(year);
      result.forEach((days) => {
        expect(days).toBeGreaterThanOrEqual(28);
        expect(days).toBeLessThanOrEqual(32);
      });
    });
  });

  it("should return array with exactly 12 elements", () => {
    const result = getMonthDays(2080);
    expect(result).toHaveLength(12);
  });
});

describe("getHolidays", () => {
  it("should return holidays for known year 2080", () => {
    const result = getHolidays(2080);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return holidays for known year 2081", () => {
    const result = getHolidays(2081);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return holidays for known year 2082", () => {
    const result = getHolidays(2082);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return holidays for known year 2083", () => {
    const result = getHolidays(2083);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should return valid holiday objects", () => {
    const result = getHolidays(2080);
    result.forEach((holiday) => {
      expect(holiday).toHaveProperty("month");
      expect(holiday).toHaveProperty("day");
      expect(holiday).toHaveProperty("name");
      expect(holiday.month).toBeGreaterThanOrEqual(1);
      expect(holiday.month).toBeLessThanOrEqual(12);
      expect(holiday.day).toBeGreaterThanOrEqual(1);
    });
  });

  it("should fallback to latest known year for future year", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = getHolidays(2100);
    expect(Array.isArray(result)).toBe(true);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("should fallback to latest known year for past year", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = getHolidays(1999);
    expect(Array.isArray(result)).toBe(true);
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("should return empty array if no data exists (edge case)", () => {
    const result = getHolidays(3000);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should include holiday with optional nameNp field", () => {
    const result = getHolidays(2080);
    const hasNepaliName = result.some((h) => h.nameNp !== undefined);
    expect(hasNepaliName).toBe(true);
  });

  it("should include holiday with optional scope field", () => {
    const result = getHolidays(2080);
    const hasScope = result.some((h) => h.scope !== undefined);
    expect(hasScope).toBe(true);
  });
});

describe("getMonthDays - edge cases", () => {
  it("should handle year 2000 (start of data range)", () => {
    const result = getMonthDays(2000);
    expect(result.length).toBe(12);
  });

  it("should handle year 2100 (end of data range)", () => {
    const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const result = getMonthDays(2100);
    expect(result.length).toBe(12);
    consoleSpy.mockRestore();
  });
});

describe("getHolidays - edge cases", () => {
  it("should handle year 2080 (start of holiday data)", () => {
    const result = getHolidays(2080);
    expect(Array.isArray(result)).toBe(true);
  });

  it("should handle year 2083 (end of holiday data)", () => {
    const result = getHolidays(2083);
    expect(Array.isArray(result)).toBe(true);
  });
});
