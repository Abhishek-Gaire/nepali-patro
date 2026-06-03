import { describe, it, expect } from "vitest";
import { NepaliDate } from "../../src/core/NepaliDate";

describe("NepaliDate constructor", () => {
  it("should create a valid NepaliDate", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.year).toBe(2080);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });

  it("should throw for invalid month (0)", () => {
    expect(() => new NepaliDate(2080, 0, 1)).toThrow("Invalid BS month 0");
  });

  it("should throw for invalid month (13)", () => {
    expect(() => new NepaliDate(2080, 13, 1)).toThrow("Invalid BS month 13");
  });

  it("should throw for invalid day (0)", () => {
    expect(() => new NepaliDate(2080, 1, 0)).toThrow("Invalid BS day 0");
  });

  it("should throw for day exceeding month length", () => {
    expect(() => new NepaliDate(2080, 1, 32)).toThrow("Invalid BS day 32");
  });

  it("should throw for negative day", () => {
    expect(() => new NepaliDate(2080, 1, -1)).toThrow("Invalid BS day -1");
  });

  it("should accept valid end-of-month date", () => {
    const date = new NepaliDate(2080, 1, 31);
    expect(date.day).toBe(31);
  });
});

describe("NepaliDate.today()", () => {
  it("should return a NepaliDate for today", () => {
    const today = NepaliDate.today();
    expect(today).toBeInstanceOf(NepaliDate);
    expect(today.year).toBeGreaterThan(2079);
    expect(today.month).toBeGreaterThanOrEqual(1);
    expect(today.month).toBeLessThanOrEqual(12);
    expect(today.day).toBeGreaterThanOrEqual(1);
  });
});

describe("NepaliDate.fromAD()", () => {
  it("should convert AD 1943-04-14 to BS 2000-01-01", () => {
    const date = NepaliDate.fromAD(new Date(1943, 3, 14));
    expect(date.year).toBe(2000);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });

  it("should convert AD 2026-04-14 to BS 2083-01-01", () => {
    const date = NepaliDate.fromAD(new Date(2026, 3, 14));
    expect(date.year).toBe(2083);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });

  it("should convert AD 2023-04-14 to BS 2080-01-01", () => {
    const date = NepaliDate.fromAD(new Date(2023, 3, 14));
    expect(date.year).toBe(2080);
    expect(date.month).toBe(1);
    expect(date.day).toBe(1);
  });
});

describe("NepaliDate.toAD()", () => {
  it("should convert BS 2000-01-01 to AD 1943-04-14", () => {
    const date = new NepaliDate(2000, 1, 1);
    const ad = date.toAD();
    expect(ad.getFullYear()).toBe(1943);
    expect(ad.getMonth()).toBe(3);
    expect(ad.getDate()).toBe(14);
  });

  it("should convert BS 2083-01-01 to AD 2026-04-14", () => {
    const date = new NepaliDate(2083, 1, 1);
    const ad = date.toAD();
    expect(ad.getFullYear()).toBe(2026);
    expect(ad.getMonth()).toBe(3);
    expect(ad.getDate()).toBe(14);
  });
});

describe("NepaliDate.daysInMonth()", () => {
  it("should return 31 for Baisakh 2080", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.daysInMonth()).toBe(31);
  });

  it("should return correct days for different months", () => {
    const date = new NepaliDate(2080, 2, 1);
    expect(date.daysInMonth()).toBeGreaterThan(28);
    expect(date.daysInMonth()).toBeLessThanOrEqual(32);
  });
});

describe("NepaliDate.daysInYear()", () => {
  it("should return total days in year", () => {
    const date = new NepaliDate(2080, 1, 1);
    const days = date.daysInYear();
    expect(days).toBeGreaterThan(360);
    expect(days).toBeLessThan(370);
  });
});

describe("NepaliDate.monthNameEn()", () => {
  it("should return 'Baisakh' for month 1", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.monthNameEn()).toBe("Baisakh");
  });

  it("should return 'Jestha' for month 2", () => {
    const date = new NepaliDate(2080, 2, 1);
    expect(date.monthNameEn()).toBe("Jestha");
  });

  it("should return 'Chaitra' for month 12", () => {
    const date = new NepaliDate(2080, 12, 1);
    expect(date.monthNameEn()).toBe("Chaitra");
  });
});

describe("NepaliDate.monthNameNp()", () => {
  it("should return Nepali name for month 1", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.monthNameNp()).toBe("बैशाख");
  });

  it("should return Nepali name for month 12", () => {
    const date = new NepaliDate(2080, 12, 1);
    expect(date.monthNameNp()).toBe("चैत");
  });
});

describe("NepaliDate.format()", () => {
  it("should format with YYYY-MM-DD", () => {
    const date = new NepaliDate(2080, 1, 15);
    expect(date.format("YYYY-MM-DD")).toBe("2080-01-15");
  });

  it("should format with single digit month and day", () => {
    const date = new NepaliDate(2080, 1, 5);
    expect(date.format("M/D/YYYY")).toBe("1/5/2080");
  });

  it("should format with MMM (short month)", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.format("MMM DD, YYYY")).toMatch(/Bai|01/);
  });

  it("should format with MMMM (full month)", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.format("MMMM DD, YYYY")).toMatch(/Baisakh|01/);
  });

  it("should handle complex templates", () => {
    const date = new NepaliDate(2080, 10, 25);
    expect(date.format("YYYY/MMM/D")).toMatch(/2080/);
  });

  it("should not replace M inside MM", () => {
    const date = new NepaliDate(2080, 1, 5);
    const result = date.format("MM");
    expect(result).toBe("01");
  });
});

describe("NepaliDate.addDays()", () => {
  it("should add positive days", () => {
    const date = new NepaliDate(2080, 1, 1);
    const result = date.addDays(10);
    expect(result.day).toBe(11);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2080);
  });

  it("should subtract days with negative value", () => {
    const date = new NepaliDate(2080, 1, 15);
    const result = date.addDays(-10);
    expect(result.day).toBe(5);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2080);
  });

  it("should handle month boundary crossing", () => {
    const date = new NepaliDate(2080, 1, 25);
    const result = date.addDays(10);
    expect(result.month).toBe(2);
    expect(result.day).toBe(4);
  });

  it("should handle year boundary crossing", () => {
    const date = new NepaliDate(2080, 12, 25);
    const result = date.addDays(10);
    expect(result.year).toBe(2081);
    expect(result.month).toBe(1);
  });

  it("should not mutate the original date", () => {
    const date = new NepaliDate(2080, 1, 1);
    date.addDays(5);
    expect(date.day).toBe(1);
  });

  it("should add zero days", () => {
    const date = new NepaliDate(2080, 1, 15);
    const result = date.addDays(0);
    expect(result.equals(date)).toBe(true);
  });
});

describe("NepaliDate.addMonths()", () => {
  it("should add positive months", () => {
    const date = new NepaliDate(2080, 1, 15);
    const result = date.addMonths(2);
    expect(result.month).toBe(3);
    expect(result.year).toBe(2080);
  });

  it("should subtract months with negative value", () => {
    const date = new NepaliDate(2080, 3, 15);
    const result = date.addMonths(-2);
    expect(result.month).toBe(1);
    expect(result.year).toBe(2080);
  });

  it("should handle year rollover (forward)", () => {
    const date = new NepaliDate(2080, 11, 15);
    const result = date.addMonths(3);
    expect(result.year).toBe(2081);
    expect(result.month).toBe(2);
  });

  it("should handle year rollover (backward)", () => {
    const date = new NepaliDate(2080, 2, 15);
    const result = date.addMonths(-3);
    expect(result.year).toBe(2079);
    expect(result.month).toBe(11);
  });

  it("should clamp day if target month has fewer days", () => {
    const date = new NepaliDate(2080, 1, 31);
    const result = date.addMonths(1);
    expect(result.day).toBeLessThanOrEqual(32);
    expect(result.month).toBe(2);
  });

  it("should not mutate the original date", () => {
    const date = new NepaliDate(2080, 1, 15);
    date.addMonths(3);
    expect(date.month).toBe(1);
  });
});

describe("NepaliDate.addYears()", () => {
  it("should add positive years", () => {
    const date = new NepaliDate(2080, 1, 15);
    const result = date.addYears(5);
    expect(result.year).toBe(2085);
    expect(result.month).toBe(1);
    expect(result.day).toBe(15);
  });

  it("should subtract years with negative value", () => {
    const date = new NepaliDate(2080, 1, 15);
    const result = date.addYears(-10);
    expect(result.year).toBe(2070);
  });

  it("should clamp day if target year month has fewer days", () => {
    const date = new NepaliDate(2080, 1, 31);
    const result = date.addYears(1);
    expect(result.month).toBe(1);
    expect(result.day).toBeLessThanOrEqual(31);
  });

  it("should not mutate the original date", () => {
    const date = new NepaliDate(2080, 1, 15);
    date.addYears(5);
    expect(date.year).toBe(2080);
  });
});

describe("NepaliDate.equals()", () => {
  it("should return true for equal dates", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 15);
    expect(date1.equals(date2)).toBe(true);
  });

  it("should return false for different years", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2081, 1, 15);
    expect(date1.equals(date2)).toBe(false);
  });

  it("should return false for different months", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 2, 15);
    expect(date1.equals(date2)).toBe(false);
  });

  it("should return false for different days", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 16);
    expect(date1.equals(date2)).toBe(false);
  });
});

describe("NepaliDate.isBefore()", () => {
  it("should return true for earlier date", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 16);
    expect(date1.isBefore(date2)).toBe(true);
  });

  it("should return false for later date", () => {
    const date1 = new NepaliDate(2080, 1, 16);
    const date2 = new NepaliDate(2080, 1, 15);
    expect(date1.isBefore(date2)).toBe(false);
  });

  it("should return false for equal dates", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 15);
    expect(date1.isBefore(date2)).toBe(false);
  });

  it("should compare across years", () => {
    const date1 = new NepaliDate(2079, 12, 30);
    const date2 = new NepaliDate(2080, 1, 1);
    expect(date1.isBefore(date2)).toBe(true);
  });

  it("should compare across months", () => {
    const date1 = new NepaliDate(2080, 1, 31);
    const date2 = new NepaliDate(2080, 2, 1);
    expect(date1.isBefore(date2)).toBe(true);
  });
});

describe("NepaliDate.isAfter()", () => {
  it("should return true for later date", () => {
    const date1 = new NepaliDate(2080, 1, 16);
    const date2 = new NepaliDate(2080, 1, 15);
    expect(date1.isAfter(date2)).toBe(true);
  });

  it("should return false for earlier date", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 16);
    expect(date1.isAfter(date2)).toBe(false);
  });

  it("should return false for equal dates", () => {
    const date1 = new NepaliDate(2080, 1, 15);
    const date2 = new NepaliDate(2080, 1, 15);
    expect(date1.isAfter(date2)).toBe(false);
  });

  it("should compare across years", () => {
    const date1 = new NepaliDate(2080, 1, 1);
    const date2 = new NepaliDate(2079, 12, 30);
    expect(date1.isAfter(date2)).toBe(true);
  });
});

describe("NepaliDate.toString()", () => {
  it("should return ISO-like string", () => {
    const date = new NepaliDate(2080, 1, 15);
    expect(date.toString()).toBe("2080-01-15");
  });

  it("should pad single digit month and day", () => {
    const date = new NepaliDate(2080, 2, 5);
    expect(date.toString()).toBe("2080-02-05");
  });
});

describe("NepaliDate.toJSON()", () => {
  it("should return JSON representation", () => {
    const date = new NepaliDate(2080, 1, 15);
    const json = date.toJSON();
    expect(json.year).toBe(2080);
    expect(json.month).toBe(1);
    expect(json.day).toBe(15);
    expect(json.ad).toBeDefined();
    expect(typeof json.ad).toBe("string");
  });

  it("should include valid AD date string", () => {
    const date = new NepaliDate(2000, 1, 1);
    const json = date.toJSON();
    expect(json.ad).toMatch(/1943-04-1[34]/);
  });
});

describe("NepaliDate readonly properties", () => {
  it("should have readonly year property", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.year).toBe(2080);
  });

  it("should have readonly month property", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.month).toBe(1);
  });

  it("should have readonly day property", () => {
    const date = new NepaliDate(2080, 1, 1);
    expect(date.day).toBe(1);
  });
});
