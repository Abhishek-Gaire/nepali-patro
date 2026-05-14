/**
 * ============================================================================
 * nepali-patro — Type Definitions
 * ============================================================================
 * Central type definitions for the entire library.
 * All modules consume these types to ensure consistency across
 * web, React Native, and pure-utility consumers.
 * ============================================================================
 */

/**
 * Valid Bikram Sambat year number (e.g. 2083)
 */
export type BSYear = number;

/** Valid Bikram Sambat month(1-12)
 * 1 = Baisakh, 12 = Chaitra
 */
export type BSMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/**
 * Tuple representing days in each of the 12 BS months
*/
export type MonthDaysTuple = [
  number, number, number, number,
  number, number, number, number,
  number, number, number, number
];

/**
 * Data structure for days in each month of a BS year
 * Raw month-length data for a single BS year.
 * Used by the static data layer; months are 1-indexed in logic
 * but stored here as a fixed-length tuple for type safety.
 */
export interface BSMonthData {
  year: BSYear;
  months: MonthDaysTuple;
}

export type HolidayScope =
  | "national"
  | "dashain"
  | "tihar"
  | "ethnic"
  | "women"
  | "education"
  | "kathmandu-valley"
  | "observed"
  | "disabilities"
  | "birth-anniversary"
  | "office-open";

/**
 * Public holiday definition.
 * nameNp is optional Devanagari text for native-language UIs.
 * scope is optional; when omitted the holiday applies nationwide.
 */
export interface NepaliHoliday {
  month: number;
  day: number;
  name: string;
  nameNp?: string;
  scope?: HolidayScope;
}

/**
 * Consumer-provided calendar event (e.g. exam, meeting, birthday based on user usecase).
 * Events are merged into CalendarDay objects at generation time.
 */
export interface CalendarEvent {
  bsYear: BSYear;
  bsMonth: BSMonth;
  bsDay: number;
  title: string;
  /** Optional: Custom color for the event indicator dot */
  color?: string;
}

/**
 * Enriched day cell returned by the calendar generator.
 * Contains both BS and AD representations, flags for UI rendering,
 * and any events that fall on this day.
 */
export interface CalendarDay {
  bsDay: number;
  bsMonth: BSMonth;
  bsYear: BSYear;
  adDate: Date;               // corresponding Gregorian date
  isSaturday: boolean;        // Saturday = weekend in Nepal
  isHoliday: boolean;         // true if public holiday OR Saturday
  holidayName?: string;       // human-readable holiday label (English)
  holidayNameNp?: string;     // human-readable holiday label (Devanagari)
  holidayScope?: HolidayScope; // holiday audience/category from the data source
  isToday: boolean;           // matches the current real-world date
  isCurrentMonth: boolean;    // Whether this day belongs to the currently viewed month
  events: CalendarEvent[];
}

/**
 * Customizable theme tokens.
 * All colors accept any valid CSS/React-Native color string.
 * Undefined values fall back to sensible defaults inside components.
 */
export interface CalendarTheme {
  /** Color for Saturdays (default: '#C0272D') */
  saturdayColor?: string;
  /** Color for public holidays (default: '#C0272D') */
  holidayColor?: string;
  /** Default dot color for events without an explicit color (default: '#E8751A') */
  eventDotColor?: string;
  /** Background/text color for the selected day */
  selectedColor?: string;
  /** Background/text color for today's cell */
  todayColor?: string;
  /** General text color for normal days */
  textColor?: string;
  /** Header background or text color */
  headerColor?: string;
  /** Background color of the calendar surface */
  surfaceColor?: string;
  /** Border color for calendar cells */
  borderColor?: string;
}

/** Props shared by both web and native day-cell components */
export interface DayCellProps {
  day: CalendarDay;
  theme?: CalendarTheme;
  isSelected?: boolean;
  onPress?: (day: CalendarDay) => void;
}

/** Props shared by both web and native calendar grid components */
export interface CalendarGridProps {
  grid: CalendarDay[][];
  theme?: CalendarTheme;
  selected?: CalendarDay | null;
  onDayPress?: (day: CalendarDay) => void;
}

/** Props shared by both web and native header components */
export interface HeaderProps {
  year: BSYear;
  month: BSMonth;
  onPrev: () => void;
  onNext: () => void;
  theme?: CalendarTheme;
}

/** Props for the top-level NepaliCalendar component (both platforms) */
export interface NepaliCalendarProps {
  /** Initial BS year to display. Defaults to current BS year. */
  initialYear?: BSYear;
  /** Initial BS month to display. Defaults to current BS month. */
  initialMonth?: BSMonth;
  /** User-defined events to overlay on the calendar */
  events?: CalendarEvent[];
  /** Visual theme overrides */
  theme?: CalendarTheme;
  /** Called when any day cell is pressed/clicked */
  onDayPress?: (day: CalendarDay) => void;
  /** Called when the month/year changes via navigation */
  onMonthChange?: (year: BSYear, month: BSMonth) => void;
}

/** Props for the reusable HolidayModal component (both platforms) */
export interface HolidayModalProps {
  day: CalendarDay | null;
  onClose: () => void;
  theme?: CalendarTheme;
}
