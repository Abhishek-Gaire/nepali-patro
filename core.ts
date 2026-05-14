/**
 * ============================================================================
 * nepali-patro — Core Utilities Entry Point
 * ============================================================================
 * Zero-React, zero-UI entry point for consumers who only need date math,
 * conversion, and data lookup.
 *
 *   import { convertADtoBS, NepaliDate, getHolidays } from "nepali-patro/core";
 *
 * Ideal for:
 *   • Node.js backend services
 *   • CLI tools
 *   • Custom UI frameworks (Vue, Svelte, Angular, etc.)
 *   • Unit tests that don’t want to pull in React
 * ============================================================================
 */

export { convertBStoAD, convertADtoBS } from "./src/core/converter";
export { NepaliDate } from "./src/core/NepaliDate";
export { generateCalendarGrid, chunkIntoWeeks } from "./src/core/generator";

export { getMonthDays, getHolidays } from "./src/data/fallback";
export { BS_MONTH_DATA, BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP, BS_MONTH_NAMES_SHORT } from "./src/data/months.data";
export { NEPALI_HOLIDAYS } from "./src/data/holidays.data";

export type {
  BSYear,
  BSMonth,
  MonthDaysTuple,
  BSMonthData,
  NepaliHoliday,
  HolidayScope,
  CalendarEvent,
  CalendarDay,
  CalendarTheme,
  HolidayModalProps,
} from "./src/types";
