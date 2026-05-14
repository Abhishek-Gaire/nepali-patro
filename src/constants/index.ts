import type { HolidayScope } from "../types";

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const HOLIDAY_SCOPE_LABELS: Record<HolidayScope, string> = {
  national: "National — observed nationwide",
  dashain: "Dashain — Dashain festival holiday",
  tihar: "Tihar — Tihar festival holiday",
  ethnic: "Ethnic — holiday for specific ethnic communities",
  women: "Women — holiday for women only",
  education: "Education — for educational institutions only",
  "kathmandu-valley": "Kathmandu Valley — only inside Kathmandu Valley",
  observed: "Observed — officially observed holiday",
  disabilities: "Disabilities — for people with disabilities",
  "birth-anniversary": "Birth Anniversary — commemorates a birth anniversary",
  "office-open": "Office Open — government offices remain open",
};
