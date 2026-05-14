import { HOLIDAY_SCOPE_LABELS } from "../constants";
import type { HolidayScope } from "../types";

export function formatScope(scope?: HolidayScope): string | null {
  if (!scope) return null;
  return HOLIDAY_SCOPE_LABELS[scope] ?? scope;
}
