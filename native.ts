/**
 * ============================================================================
 * nepali-patro — React Native Entry Point
 * ============================================================================
 * Subpath export for React Native consumers.
 *
 *   import { NepaliCalendar } from "nepali-patro/native";
 *
 * This entry bundles the native UI primitives (View, Text, TouchableOpacity)
 * and MUST NOT be imported into standard web projects (it will crash
 * without react-native in the dependency tree).
 * ============================================================================
 */

// Native UI
export { NepaliCalendar } from "./src/components/native/NepaliCalendar";
export { HolidayModal } from "./src/components/native/HolidayModal";

// Core utilities (shared with web)
export { convertBStoAD, convertADtoBS } from "./src/core/converter";
export { NepaliDate } from "./src/core/NepaliDate";
export { generateCalendarGrid, chunkIntoWeeks } from "./src/core/generator";

// Data accessors
export { getMonthDays, getHolidays } from "./src/data/fallback";
export { BS_MONTH_DATA, BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP, BS_MONTH_NAMES_SHORT } from "./src/data/months.data";
export { NEPALI_HOLIDAYS } from "./src/data/holidays.data";

// Hook
export { useNepaliCalendar } from "./src/hooks/useNepaliCalendar";

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
} from "./src/types";
