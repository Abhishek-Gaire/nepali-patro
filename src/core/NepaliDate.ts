/**
 * ============================================================================
 * nepali-patro — NepaliDate Class
 * ============================================================================
 * An immutable date-class abstraction for Bikram Sambat dates.
 * Mirrors the ergonomics of native JavaScript Date but operates entirely
 * in the BS calendar system.
 *
 * Internally delegates to converter.ts for BS↔AD math, so the class
 * stays thin and maintainable.
 *
 * Usage:
 *   const d = new NepaliDate(2083, 1, 15);
 *   d.toAD();                 // => JS Date
 *   d.format('YYYY-MM-DD');   // => "2083-01-15"
 *   d.addDays(10);            // => new NepaliDate instance
 * ============================================================================
 */

import type { BSMonth } from "../types";
import { convertADtoBS, convertBStoAD } from "./converter";
import { getMonthDays } from "../data/fallback";
import { BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP } from "../data/months.data";

export class NepaliDate {
  /** Bikram Sambat year */
  readonly year: number;
  /** 1 = Baisakh … 12 = Chaitra */
  readonly month: BSMonth;
  /** Day of month (1-based) */
  readonly day: number;

  /**
   * Create a NepaliDate from explicit BS components.
   * @param year  — BS year (e.g. 2083)
   * @param month — 1-12
   * @param day   — 1-32 (validated against month length)
   */
  constructor(year: number, month: number, day: number) {
    const months = getMonthDays(year);
    if (month < 1 || month > 12) {
      throw new Error(`Invalid BS month ${month}. Must be 1–12.`);
    }
    const maxDay = months[month - 1];
    if (day < 1 || day > maxDay) {
      throw new Error(`Invalid BS day ${day} for ${year}-${month}. Max is ${maxDay}.`);
    }
    this.year = year;
    this.month = month as BSMonth;
    this.day = day;
  }

  /** Create a NepaliDate representing today in local time. */
  static today(): NepaliDate {
    const bs = convertADtoBS(new Date());
    return new NepaliDate(bs.year, bs.month, bs.day);
  }

  /** Create a NepaliDate from an AD (Gregorian) Date object. */
  static fromAD(adDate: Date): NepaliDate {
    const bs = convertADtoBS(adDate);
    return new NepaliDate(bs.year, bs.month, bs.day);
  }

  /** Convert this BS date to its AD equivalent. */
  toAD(): Date {
    return convertBStoAD(this.year, this.month, this.day);
  }

  /** Return the number of days in this date's month. */
  daysInMonth(): number {
    return getMonthDays(this.year)[this.month - 1];
  }

  /** Return the number of days in this date's year. */
  daysInYear(): number {
    return getMonthDays(this.year).reduce((a, b) => a + b, 0);
  }

  /** English month name (e.g. "Baisakh"). */
  monthNameEn(): string {
    return BS_MONTH_NAMES_EN[this.month - 1];
  }

  /** Devanagari month name (e.g. "बैशाख"). */
  monthNameNp(): string {
    return BS_MONTH_NAMES_NP[this.month - 1];
  }

  /**
   * Simple formatter supporting tokens:
   *   YYYY → 4-digit year
   *   MM   → 2-digit month
   *   DD   → 2-digit day
   *   M    → month without leading zero
   *   D    → day without leading zero
   *   MMM  → short English month name
   *   MMMM → full English month name
   */
  format(template: string): string {
    const YYYY = String(this.year);
    const MM = String(this.month).padStart(2, "0");
    const DD = String(this.day).padStart(2, "0");
    const M = String(this.month);
    const D = String(this.day);
    const MMM = this.monthNameEn().slice(0, 3);
    const MMMM = this.monthNameEn();

    return template
      .replace(/YYYY/g, YYYY)
      .replace(/MM/g, MM)
      .replace(/DD/g, DD)
      .replace(/MMMM/g, MMMM)
      .replace(/MMM/g, MMM)
      .replace(/\bM\b/g, M)
      .replace(/\bD\b/g, D);
  }

  /**
   * Return a new NepaliDate offset by N days.
   * Positive N moves forward; negative N moves backward.
   */
  addDays(n: number): NepaliDate {
    const ad = this.toAD();
    ad.setDate(ad.getDate() + n);
    return NepaliDate.fromAD(ad);
  }

  /**
   * Return a new NepaliDate offset by N months.
   * If the target month has fewer days, clamps to the last valid day.
   */
  addMonths(n: number): NepaliDate {
    let newMonth = this.month + n;
    let newYear = this.year;
    while (newMonth > 12) {
      newMonth -= 12;
      newYear++;
    }
    while (newMonth < 1) {
      newMonth += 12;
      newYear--;
    }
    const maxDay = getMonthDays(newYear)[newMonth - 1];
    return new NepaliDate(newYear, newMonth, Math.min(this.day, maxDay));
  }

  /** Return a new NepaliDate offset by N years. */
  addYears(n: number): NepaliDate {
    const targetYear = this.year + n;
    const maxDay = getMonthDays(targetYear)[this.month - 1];
    return new NepaliDate(targetYear, this.month, Math.min(this.day, maxDay));
  }

  /** Compare two NepaliDate instances. */
  equals(other: NepaliDate): boolean {
    return this.year === other.year && this.month === other.month && this.day === other.day;
  }

  /** True if this date is strictly before another. */
  isBefore(other: NepaliDate): boolean {
    if (this.year !== other.year) return this.year < other.year;
    if (this.month !== other.month) return this.month < other.month;
    return this.day < other.day;
  }

  /** True if this date is strictly after another. */
  isAfter(other: NepaliDate): boolean {
    if (this.year !== other.year) return this.year > other.year;
    if (this.month !== other.month) return this.month > other.month;
    return this.day > other.day;
  }

  /** ISO-like string: YYYY-MM-DD */
  toString(): string {
    return this.format("YYYY-MM-DD");
  }

  /** Developer-friendly representation */
  toJSON(): { year: number; month: number; day: number; ad: string } {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      ad: this.toAD().toISOString().slice(0, 10),
    };
  }
}
