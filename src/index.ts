/**
 * ============================================================================
 * barshik-nepali-patro — Web Entry Point
 * ============================================================================
 * Main package export for web/React consumers.
 *
 *   import { NepaliCalendar, convertADtoBS, NepaliDate } from "barshik-nepali-patro";
 *
 * Everything exported here is safe to use in standard React DOM projects.
 * No React Native code is included in this bundle.
 * ============================================================================
 */

// UI
export { NepaliCalendar } from "./components/web/NepaliCalendar";
export { HolidayModal } from "./components/web/HolidayModal";

// Core utilities (tree-shakeable)
export { convertBStoAD, convertADtoBS } from "./core/converter";
export { NepaliDate } from "./core/NepaliDate";
export { generateCalendarGrid, chunkIntoWeeks } from "./core/generator";

// Data accessors
export { getMonthDays, getHolidays } from "./data/fallback";
export { BS_MONTH_DATA, BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP, BS_MONTH_NAMES_SHORT } from "./data/months.data";
export { NEPALI_HOLIDAYS } from "./data/holidays.data";

// Hook (advanced consumers who want to build custom UI)
export { useNepaliCalendar } from "./hooks/useNepaliCalendar";

// Types
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
  DayCellProps,
  CalendarGridProps,
  HeaderProps,
  NepaliCalendarProps,
  HolidayModalProps,
} from "./types";
