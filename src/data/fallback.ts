/**
 * ============================================================================
 * barshik-nepali-patro — Fallback Data Resolver
 * ============================================================================
 * Because BS month lengths and holidays are published year-by-year by the
 * Nepal government, consumers may navigate to a year that has not yet been
 * added to the static data files. Rather than crashing with "undefined",
 * this module gracefully falls back to the most recent known year.
 *
 * Behaviour:
 *   1. Exact year exists → return exact data.
 *   2. Exact year missing → warn in dev console, return latest known year.
 *   3. No data at all (should never happen) → return safe empty defaults.
 *
 * Once new official data is added to months.data.ts / holidays.data.ts,
 * the fallback automatically stops being used for that year—zero logic change.
 * ============================================================================
 */

import type { NepaliHoliday } from "../types";
import { BS_MONTH_DATA } from "./months.data";
import { NEPALI_HOLIDAYS } from "./holidays.data";

/**
 * Return the month-length array for a given BS year.
 * Falls back to the most recent known year if the requested year is absent.
 *
 * @param year — BS year (e.g. 2084)
 * @returns MonthDaysTuple — 12 integers representing days per month
 */
export function getMonthDays(year: number): number[] {
  // Fast path: exact data exists
  if (BS_MONTH_DATA[year]) {
    return BS_MONTH_DATA[year];
  }

  // Fallback path: find the highest known year (most recent official data)
  const knownYears = Object.keys(BS_MONTH_DATA)
    .map(Number)
    .sort((a, b) => b - a); // descending

  const refYear = knownYears[0];

  if (refYear !== undefined) {
    // Warn only in development so integrators know the data is approximate
    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[barshik-nepali-patro] No month data for BS ${year}. Falling back to BS ${refYear}. ` +
          `Add the official month lengths to months.data.ts to remove this warning.`
      );
    }
    return BS_MONTH_DATA[refYear];
  }

  // Absolute failsafe (should be unreachable because 2079 is hard-coded)
  return [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30];
}

/**
 * Return the public holiday list for a given BS year.
 * Falls back to the most recent known year if the requested year is absent.
 *
 * @param year — BS year (e.g. 2084)
 * @returns Array of NepaliHoliday objects
 */
export function getHolidays(year: number): NepaliHoliday[] {
  if (NEPALI_HOLIDAYS[year]) {
    return NEPALI_HOLIDAYS[year];
  }

  const knownYears = Object.keys(NEPALI_HOLIDAYS)
    .map(Number)
    .sort((a, b) => b - a);

  const refYear = knownYears[0];

  if (refYear !== undefined) {
    if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        `[barshik-nepali-patro] No holiday data for BS ${year}. Falling back to BS ${refYear}. ` +
          `Add the official holiday list to holidays.data.ts to remove this warning.`
      );
    }
    return NEPALI_HOLIDAYS[refYear] ?? [];
  }

  return [];
}
