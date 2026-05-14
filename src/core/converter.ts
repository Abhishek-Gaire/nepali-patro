/**
 * ============================================================================
 * barshik-nepali-patro — BS ↔ AD Converter
 * ============================================================================
 * Converts dates between Bikram Sambat (BS) and Gregorian (AD) calendars.
 *
 * Algorithm:
 *   1. Define a known anchor: BS 2000-01-01 ≡ AD 1943-04-14.
 *   2. For BS→AD: count days from the BS epoch to the target BS date,
 *      then add that offset (in milliseconds) to the AD epoch.
 *   3. For AD→BS: count days from the AD epoch to the target AD date,
 *      then walk forward through BS year/month data until the offset is
 *      consumed, yielding the BS equivalent.
 *
 * Why not a formula?
 *   BS month lengths are irregular (29–32 days) and change every year.
 *   There is no closed-form equation accurate across centuries.
 *   A lookup table + epoch walking is the only reliable approach.
 *
 * Timezone note:
 *   All calculations use local midnight to avoid UTC drift issues.
 *   If you need UTC, convert the returned Date to UTC yourself.
 * ============================================================================
 */

import type { BSMonth } from "../types";
import { getMonthDays } from "../data/fallback";

// ── Anchor constants ──
/** BS epoch: year 2000, month 1 (Baisakh), day 1 */
const BS_EPOCH_YEAR = 2000;
const BS_EPOCH_MONTH = 1;
const BS_EPOCH_DAY = 1;

/** AD epoch equivalent to BS 2000/1/1. Month is 0-indexed (3 = April) */
const AD_EPOCH = new Date(1943, 3, 14); // 1943-04-14 local time

/** Milliseconds in one day */
const MS_PER_DAY = 86_400_000;

/**
 * Strip the time portion from a Date so calendar conversions operate on
 * the civil date only, not the current clock time.
 */
function toLocalDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

// ── Helpers ──

/**
 * Count how many days exist between BS epoch (2000/1/1) and a target BS date.
 * Negative if the target is before the epoch.
 */
function daysBetweenBSEpoch(bsYear: number, bsMonth: number, bsDay: number): number {
  let days = 0;

  // 1. Whole years
  if (bsYear > BS_EPOCH_YEAR) {
    for (let y = BS_EPOCH_YEAR; y < bsYear; y++) {
      days += getMonthDays(y).reduce((a, b) => a + b, 0);
    }
  } else if (bsYear < BS_EPOCH_YEAR) {
    for (let y = bsYear; y < BS_EPOCH_YEAR; y++) {
      days -= getMonthDays(y).reduce((a, b) => a + b, 0);
    }
  }

  // 2. Whole months within the target year
  const monthLengths = getMonthDays(bsYear);
  if (bsYear >= BS_EPOCH_YEAR) {
    for (let m = 1; m < bsMonth; m++) {
      days += monthLengths[m - 1];
    }
  } else {
    for (let m = bsMonth; m < 12; m++) {
      days -= monthLengths[m];
    }
  }

  // 3. Days within the target month
  if (bsYear >= BS_EPOCH_YEAR) {
    days += bsDay - 1;
  } else {
    days -= monthLengths[bsMonth - 1] - bsDay + 1;
  }

  return days;
}

/**
 * Convert a BS date to its AD (Gregorian) equivalent.
 *
 * @param bsYear  — Bikram Sambat year (e.g. 2083)
 * @param bsMonth — 1 = Baisakh … 12 = Chaitra
 * @param bsDay   — Day of month (1-based)
 * @returns JavaScript Date object (local time)
 *
 * @example
 *   convertBStoAD(2083, 1, 1) // => Date for April ~14, 2026
 */
export function convertBStoAD(bsYear: number, bsMonth: number, bsDay: number): Date {
  const offsetDays = daysBetweenBSEpoch(bsYear, bsMonth, bsDay);
  const adTime = AD_EPOCH.getTime() + offsetDays * MS_PER_DAY;
  return new Date(adTime);
}

/**
 * Convert an AD (Gregorian) date to its BS equivalent.
 *
 * @param adDate — JavaScript Date object (local time)
 * @returns Object with { year, month, day } in BS
 *
 * @example
 *   convertADtoBS(new Date(2026, 3, 14)) // => { year: 2083, month: 1, day: 1 }
 */
export function convertADtoBS(adDate: Date): { year: number; month: number; day: number } {
  // 1. Normalize to local midnight so time-of-day does not shift the result
  const civilDate = toLocalDateOnly(adDate);

  // 2. Compute day offset from AD epoch
  const offsetMs = civilDate.getTime() - AD_EPOCH.getTime();
  let remainingDays = Math.round(offsetMs / MS_PER_DAY);

  // 3. Walk forward (or backward) through BS years
  let year = BS_EPOCH_YEAR;
  let month = BS_EPOCH_MONTH;
  let day = BS_EPOCH_DAY;

  if (remainingDays >= 0) {
    // Forward walk
    while (true) {
      const yearLen = getMonthDays(year).reduce((a, b) => a + b, 0);
      if (remainingDays < yearLen) break;
      remainingDays -= yearLen;
      year++;
    }
    const monthLengths = getMonthDays(year);
    for (let m = 0; m < 12; m++) {
      if (remainingDays < monthLengths[m]) {
        month = (m + 1) as BSMonth;
        day = remainingDays + 1;
        break;
      }
      remainingDays -= monthLengths[m];
    }
  } else {
    // Backward walk (dates before 2000 BS)
    remainingDays = -remainingDays;
    while (true) {
      year--;
      const yearLen = getMonthDays(year).reduce((a, b) => a + b, 0);
      if (remainingDays <= yearLen) {
        remainingDays = yearLen - remainingDays;
        break;
      }
      remainingDays -= yearLen;
    }
    const monthLengths = getMonthDays(year);
    for (let m = 11; m >= 0; m--) {
      if (remainingDays < monthLengths[m]) {
        month = (m + 1) as BSMonth;
        day = monthLengths[m] - remainingDays;
        break;
      }
      remainingDays -= monthLengths[m];
    }
  }

  return { year, month, day };
}
