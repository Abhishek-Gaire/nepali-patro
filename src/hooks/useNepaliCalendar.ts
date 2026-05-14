/**
 * ============================================================================
 * nepali-patro — useNepaliCalendar Hook
 * ============================================================================
 * Platform-agnostic React hook that drives both the web and React Native
 * calendar components. Contains zero platform-specific code (no DOM, no RN
 * primitives) so it can be safely imported into any React environment.
 *
 * Responsibilities:
 *   • Track current displayed year/month.
 *   • Track selected day.
 *   • Generate the calendar grid via generator.ts.
 *   • Merge user events + public holidays.
 *   • Provide navigation helpers (next/prev month, jump to year, etc.).
 *
 * Why a shared hook?
 *   Both web and native share identical state logic. Isolating it here
 *   means bug-fixes and feature additions apply to both platforms instantly.
 * ============================================================================
 */

import { useState, useMemo, useCallback } from "react";
import type { BSMonth, CalendarDay, CalendarEvent, NepaliHoliday } from "../types";
import { convertADtoBS } from "../core/converter";
import { generateCalendarGrid } from "../core/generator";
import { getHolidays } from "../data/fallback";

export interface UseNepaliCalendarOptions {
  /** Initial BS year to display. Defaults to current BS year. */
  initialYear?: number;
  /** Initial BS month to display. Defaults to current BS month. */
  initialMonth?: BSMonth;
  /** User events to overlay on the calendar grid. */
  events?: CalendarEvent[];
}

export interface UseNepaliCalendarReturn {
  /** Currently displayed BS year */
  year: number;
  /** Currently displayed BS month (1–12) */
  month: BSMonth;
  /** 2-D grid of CalendarDay (weeks × 7 days) */
  grid: CalendarDay[][];
  /** Currently selected day cell, or null if none selected */
  selected: CalendarDay | null;
  /** Set the selected day directly */
  setSelected: (day: CalendarDay | null) => void;
  /** Holidays active for the current year */
  holidays: NepaliHoliday[];
  /** Events passed by the consumer */
  events: CalendarEvent[];
  /** Navigate to next month (handles year rollover) */
  goNextMonth: () => void;
  /** Navigate to previous month (handles year rollover) */
  goPrevMonth: () => void;
  /** Jump to a specific year and month instantly */
  jumpTo: (year: number, month: BSMonth) => void;
  /** Reset display to today's BS date and clear selection */
  goToday: () => void;
  /** True if the displayed month is the current real-world month */
  isCurrentMonth: boolean;
}

/**
 * React hook for managing Nepali calendar state.
 *
 * @param options — Optional initial state and event list
 * @returns Calendar state + navigation controls
 *
 * @example
 *   const { year, month, grid, selected, goNextMonth } = useNepaliCalendar({
 *     events: [{ bsYear: 2083, bsMonth: 2, bsDay: 15, title: "Exam" }]
 *   });
 */
export function useNepaliCalendar(
  options: UseNepaliCalendarOptions = {}
): UseNepaliCalendarReturn {
  const todayBS = useMemo(() => convertADtoBS(new Date()), []);

  // ── State ──
  const [year, setYear] = useState(options.initialYear ?? todayBS.year);
  const [month, setMonth] = useState<BSMonth>(options.initialMonth ?? (todayBS.month as BSMonth));
  const [selected, setSelected] = useState<CalendarDay | null>(null);

  // Normalize events so the hook always has an array
  const events = useMemo(() => options.events ?? [], [options.events]);

  // ── Derived data ──
  /** Public holidays for the currently displayed year */
  const holidays = useMemo(() => getHolidays(year), [year]);

  /** The full calendar grid, regenerated when year/month/events/holidays change */
  const grid = useMemo(
    () => generateCalendarGrid(year, month, events, holidays),
    [year, month, events, holidays]
  );

  /** Whether the user is currently looking at the real-world month */
  const isCurrentMonth = year === todayBS.year && month === todayBS.month;

  // ── Navigation ──
  const goNextMonth = useCallback(() => {
    setMonth((prev: number) => {
      if (prev === 12) {
        setYear((y: number) => y + 1);
        return 1 as BSMonth;
      }
      return ((prev + 1) as unknown) as BSMonth; // TS narrowing helper
    });
    setSelected(null);
  }, []);

  const goPrevMonth = useCallback(() => {
    setMonth((prev: number) => {
      if (prev === 1) {
        setYear((y: number) => y - 1);
        return 12 as BSMonth;
      }
      return ((prev - 1) as unknown) as BSMonth;
    });
    setSelected(null);
  }, []);

  const jumpTo = useCallback((targetYear: number, targetMonth: BSMonth) => {
    setYear(targetYear);
    setMonth(targetMonth);
    setSelected(null);
  }, []);

  const goToday = useCallback(() => {
    setYear(todayBS.year);
    setMonth(todayBS.month as BSMonth);
    setSelected(null);
  }, [todayBS.year, todayBS.month]);

  return {
    year,
    month,
    grid,
    selected,
    setSelected,
    holidays,
    events,
    goNextMonth,
    goPrevMonth,
    jumpTo,
    goToday,
    isCurrentMonth,
  };
}
