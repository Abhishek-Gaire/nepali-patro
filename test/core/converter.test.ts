import { describe, it, expect } from "vitest";
import { convertBStoAD, convertADtoBS } from "../../src/core/converter";

describe("convertBStoAD", () => {
  it("should convert BS 2000-01-01 to AD 1943-04-14 (epoch anchor)", () => {
    const result = convertBStoAD(2000, 1, 1);
    expect(result.getFullYear()).toBe(1943);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(14);
  });

  it("should convert BS 2083-06-01 to AD 2026-09-17", () => {
    const result = convertBStoAD(2083, 6, 1);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(17);
  });

  it("should convert BS 2080-01-01 correctly", () => {
    const result = convertBStoAD(2080, 1, 1);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(14);
  });

  it("should convert BS 2081-01-01 to AD 2024-04-13", () => {
    const result = convertBStoAD(2081, 1, 1);
    expect(result.getFullYear()).toBe(2024);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(13);
  });

  it("should handle mid-month dates", () => {
    const result = convertBStoAD(2080, 1, 15);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(28);
  });

  it("should handle end of month dates", () => {
    const result = convertBStoAD(2080, 1, 31);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(4);
    expect(result.getDate()).toBe(14);
  });

  it("should handle dates before the epoch (BS 1999)", () => {
    const result = convertBStoAD(1999, 12, 30);
    expect(result.getFullYear()).toBeLessThanOrEqual(1943);
  });

  it("should return a Date object", () => {
    const result = convertBStoAD(2080, 1, 1);
    expect(result).toBeInstanceOf(Date);
  });

  it("should handle BS 2082-01-01", () => {
    const result = convertBStoAD(2082, 1, 1);
    expect(result.getFullYear()).toBe(2025);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(14);
  });

  it("should handle different months correctly", () => {
    const result = convertBStoAD(2080, 2, 1);
    expect(result.getFullYear()).toBe(2023);
    expect(result.getMonth()).toBe(4);
  });

  it("should handle year boundary transitions", () => {
    const bs2080End = convertBStoAD(2080, 12, 30);
    const bs2081Start = convertBStoAD(2081, 1, 1);
    const diffTime = bs2081Start.getTime() - bs2080End.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    expect(diffDays).toBe(1);
  });
});

describe("convertADtoBS", () => {
  it("should convert AD 1943-04-14 to BS 2000-01-01 (epoch anchor)", () => {
    const result = convertADtoBS(new Date(1943, 3, 14));
    expect(result.year).toBe(2000);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("should convert AD 2026-04-14 to BS 2083-01-01", () => {
    const result = convertADtoBS(new Date(2026, 3, 14));
    expect(result.year).toBe(2083);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("should convert AD 2023-04-14 to BS 2080-01-01", () => {
    const result = convertADtoBS(new Date(2023, 3, 14));
    expect(result.year).toBe(2080);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("should convert AD 2024-04-13 to BS 2081-01-01", () => {
    const result = convertADtoBS(new Date(2024, 3, 13));
    expect(result.year).toBe(2081);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("should handle mid-month AD dates", () => {
    const result = convertADtoBS(new Date(2023, 3, 28));
    expect(result.year).toBe(2080);
    expect(result.month).toBe(1);
    expect(result.day).toBe(15);
  });

  it("should handle dates before the epoch (AD 1943-04-13)", () => {
    const result = convertADtoBS(new Date(1943, 3, 13));
    expect(result.year).toBeLessThanOrEqual(2000);
  });

  it("should normalize time portion of Date input", () => {
    const result1 = convertADtoBS(new Date(2023, 3, 14, 12, 30, 45));
    const result2 = convertADtoBS(new Date(2023, 3, 14, 0, 0, 0));
    expect(result1).toEqual(result2);
  });

  it("should handle AD 2025-04-14 to BS 2082-01-01", () => {
    const result = convertADtoBS(new Date(2025, 3, 14));
    expect(result.year).toBe(2082);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("should handle year-end AD dates", () => {
    const result = convertADtoBS(new Date(2023, 11, 31));
    expect(result.year).toBeGreaterThanOrEqual(2080);
  });

  it("should handle beginning of year AD dates", () => {
    const result = convertADtoBS(new Date(2024, 0, 1));
    expect(result.year).toBeLessThanOrEqual(2080);
  });
});

describe("roundtrip conversion (BS -> AD -> BS)", () => {
  const testCases = [
    { bsYear: 2000, bsMonth: 1, bsDay: 1 },
    { bsYear: 2050, bsMonth: 6, bsDay: 15 },
    { bsYear: 2080, bsMonth: 1, bsDay: 1 },
    { bsYear: 2080, bsMonth: 12, bsDay: 30 },
    { bsYear: 2081, bsMonth: 1, bsDay: 1 },
    { bsYear: 2082, bsMonth: 7, bsDay: 20 },
    { bsYear: 2083, bsMonth: 1, bsDay: 1 },
    { bsYear: 2090, bsMonth: 3, bsDay: 10 },
    { bsYear: 2100, bsMonth: 12, bsDay: 30 },
  ];

  testCases.forEach(({ bsYear, bsMonth, bsDay }) => {
    it(`should roundtrip BS ${bsYear}-${bsMonth}-${bsDay}`, () => {
      const ad = convertBStoAD(bsYear, bsMonth, bsDay);
      const bs = convertADtoBS(ad);
      expect(bs.year).toBe(bsYear);
      expect(bs.month).toBe(bsMonth);
      expect(bs.day).toBe(bsDay);
    });
  });
});

describe("roundtrip conversion (AD -> BS -> AD)", () => {
  const testCases = [
    new Date(1943, 3, 14),
    new Date(2000, 0, 1),
    new Date(2023, 3, 14),
    new Date(2024, 3, 13),
    new Date(2025, 3, 14),
    new Date(2026, 3, 14),
    new Date(2030, 6, 15),
  ];

  testCases.forEach((adDate) => {
    it(`should roundtrip AD ${adDate.toDateString()}`, () => {
      const bs = convertADtoBS(adDate);
      const ad = convertBStoAD(bs.year, bs.month, bs.day);
      expect(ad.getFullYear()).toBe(adDate.getFullYear());
      expect(ad.getMonth()).toBe(adDate.getMonth());
      expect(ad.getDate()).toBe(adDate.getDate());
    });
  });
});

describe("consecutive days", () => {
  it("should produce consecutive AD dates for consecutive BS dates", () => {
    const day1 = convertBStoAD(2080, 1, 1);
    const day2 = convertBStoAD(2080, 1, 2);
    const diff = (day2.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24);
    expect(diff).toBe(1);
  });

  it("should produce consecutive BS dates for consecutive AD dates", () => {
    const ad1 = new Date(2023, 3, 14);
    const ad2 = new Date(2023, 3, 15);
    const bs1 = convertADtoBS(ad1);
    const bs2 = convertADtoBS(ad2);

    const day1 = bs1.year * 365 + bs1.month * 30 + bs1.day;
    const day2 = bs2.year * 365 + bs2.month * 30 + bs2.day;
    expect(day2 - day1).toBe(1);
  });
});
