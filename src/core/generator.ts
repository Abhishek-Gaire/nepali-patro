/**
 * ============================================================================
 * barshik-nepali-patro — Calendar Grid Generator
 * ============================================================================
 * Builds a 2-D array (weeks × days) of CalendarDay objects for a given
 * BS year/month. Handles:
 *   • Padding days from the previous month to align the grid to Sunday-start.
 *   • Saturday & public-holiday flagging.
 *   • Today-highlight detection.
 *   • Event merging.
 *   • AD date mapping for every cell.
 *
 * The returned grid is always rectangular (7 columns). Partial weeks are
 * padded with empty cells so UI layers can render a consistent table.
 * ============================================================================
 */

import type { BSMonth, CalendarDay, CalendarEvent, NepaliHoliday } from "../types";
import { convertADtoBS, convertBStoAD } from "./converter";
import { getMonthDays, getHolidays } from "../data/fallback";

/**
 * Create a padding (empty) day cell belonging to the previous month.
 * Used to fill the leading slots before the 1st of the target month.
 */
function makePaddingCell(bsYear: number, bsMonth: BSMonth, dayOffset: number): CalendarDay {
  // Walk backward to find the previous month
  let prevYear = bsYear;
  let prevMonth = bsMonth - 1;
  if (prevMonth < 1) {
    prevMonth = 12;
    prevYear--;
  }
  const prevMonthDays = getMonthDays(prevYear)[prevMonth - 1];
  const bsDay = prevMonthDays - dayOffset;
  const adDate = convertBStoAD(prevYear, prevMonth, bsDay);

  return {
    bsDay,
    bsMonth: prevMonth as BSMonth,
    bsYear: prevYear,
    adDate,
    isSaturday: adDate.getDay() === 6,
    isHoliday: false, // padding cells are never marked as holidays
    isToday: false,
    isCurrentMonth: false,
    events: [],
  };
}

/**
 * Create a padding (empty) day cell belonging to the next month.
 * Used to fill trailing slots so the final week is complete.
 */
function makeTrailingCell(bsYear: number, bsMonth: BSMonth, day: number): CalendarDay {
  let nextYear = bsYear;
  let nextMonth = bsMonth + 1;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear++;
  }
  const adDate = convertBStoAD(nextYear, nextMonth, day);
  return {
    bsDay: day,
    bsMonth: nextMonth as BSMonth,
    bsYear: nextYear,
    adDate,
    isSaturday: adDate.getDay() === 6,
    isHoliday: false,
    isToday: false,
    isCurrentMonth: false,
    events: [],
  };
}

/**
 * Generate the full calendar grid for a BS month.
 *
 * @param bsYear    — Target BS year (e.g. 2083)
 * @param bsMonth   — Target BS month 1–12
 * @param events    — User events to overlay (optional)
 * @param holidays  — Holiday list for the year (optional; falls back internally)
 * @returns CalendarDay[][] — Array of weeks, each week is 7 days (Sun→Sat)
 */
export function generateCalendarGrid(
  bsYear: number,
  bsMonth: BSMonth,
  events: CalendarEvent[] = [],
  holidays?: NepaliHoliday[],
): CalendarDay[][] {
  // Resolve holidays if caller didn't provide them (e.g. utility-only usage)
  const activeHolidays = holidays ?? getHolidays(bsYear);

  // 1. Month metadata
  const daysInMonth = getMonthDays(bsYear)[bsMonth - 1];
  const firstDayAD = convertBStoAD(bsYear, bsMonth, 1);
  const startWeekday = firstDayAD.getDay(); // 0 = Sunday … 6 = Saturday

  // 2. Detect "today" so we can highlight the current real-world date
  const todayAD = new Date();
  const todayBS = convertADtoBS(todayAD);

  const cells: CalendarDay[] = [];

  // 3. Leading padding cells (previous month)
  for (let i = 0; i < startWeekday; i++) {
    cells.push(makePaddingCell(bsYear, bsMonth, startWeekday - i - 1));
  }

  // 4. Actual days of the target month
  for (let day = 1; day <= daysInMonth; day++) {
    const adDate = convertBStoAD(bsYear, bsMonth, day);
    const isSat = adDate.getDay() === 6;
    const holiday = activeHolidays.find((h) => h.month === bsMonth && h.day === day);
    const dayEvents = events.filter(
      (e) => e.bsYear === bsYear && e.bsMonth === bsMonth && e.bsDay === day
    );

    cells.push({
      bsDay: day,
      bsMonth,
      bsYear,
      adDate,
      isSaturday: isSat,
      isHoliday: !!holiday || isSat,
      holidayName: holiday?.name,
      holidayNameNp: holiday?.nameNp,
      holidayScope: holiday?.scope,
      isToday:
        todayBS.year === bsYear &&
        todayBS.month === bsMonth &&
        todayBS.day === day,
      isCurrentMonth: true,
      events: dayEvents,
    });
  }

  // 5. Trailing padding cells (next month) to complete the final week
  const trailing = (7 - (cells.length % 7)) % 7;
  for (let i = 1; i <= trailing; i++) {
    cells.push(makeTrailingCell(bsYear, bsMonth, i));
  }

  // 6. Chunk into rows of 7 (weeks)
  const weeks: CalendarDay[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
}

/**
 * Utility: chunk a flat array into rows of 7.
 * Exported for consumers who want to build custom grids.
 */
export function chunkIntoWeeks<T>(arr: T[]): T[][] {
  const weeks: T[][] = [];
  for (let i = 0; i < arr.length; i += 7) {
    weeks.push(arr.slice(i, i + 7));
  }
  return weeks;
}
