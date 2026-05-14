/**
 * ============================================================================
 * nepali-patro — Web DayCell Component
 * ============================================================================
 * Renders a single day cell for the web calendar.
 * Uses standard HTML <div> / <span> with inline styles so the component
 * works out-of-the-box without requiring consumers to import CSS files.
 *
 * Styling strategy:
 *   • Inline styles for dynamic values (colors, selection state).
 *   • CSS classes for structural layout (flex, sizing) so consumers
 *     can override via their own stylesheet if desired.
 * ============================================================================
 */

import React from "react";
import type { DayCellProps } from "../../types";

const DEFAULT_SATURDAY_COLOR = "#C0272D";
const DEFAULT_TODAY_COLOR = "#E8751A";
const DEFAULT_SELECTED_COLOR = "#2563EB";
const DEFAULT_TEXT_COLOR = "#1F2937";
const DEFAULT_EVENT_DOT_COLOR = "#E8751A";

export const DayCell: React.FC<DayCellProps> = ({ day, theme, isSelected, onPress }) => {
  const borderColor = theme?.borderColor ?? "#E5E7EB";
  const surfaceColor = theme?.surfaceColor ?? "#FFFFFF";
  const isRed = day.isSaturday || day.isHoliday;
  const textColor = isRed
    ? (theme?.saturdayColor ?? DEFAULT_SATURDAY_COLOR)
    : (theme?.textColor ?? DEFAULT_TEXT_COLOR);

  const isToday = day.isToday;

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: 78,
    boxSizing: "border-box",
    cursor: day.isCurrentMonth ? "pointer" : "default",
    backgroundColor: isSelected
      ? (theme?.selectedColor ?? DEFAULT_SELECTED_COLOR)
      : isToday
        ? (theme?.todayColor ?? DEFAULT_TODAY_COLOR) + "22"
        : surfaceColor,
    color: isSelected ? "#FFFFFF" : textColor,
    boxShadow: isSelected
      ? "inset 0 0 0 2px rgb(37 99 235 / 0.8)"
      : `inset 0 0 0 1px ${borderColor}`,
    opacity: day.isCurrentMonth ? 1 : 0.35,
    transition: "background-color 150ms ease, color 150ms ease",
    userSelect: "none",
    position: "relative",
    padding: "8px 4px",
    borderRadius: 0,
    overflow: "hidden",
  };

  const todayRingStyle: React.CSSProperties = {
    position: "absolute",
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: theme?.todayColor ?? DEFAULT_TODAY_COLOR,
    display: isToday && !isSelected ? "block" : "none",
  };

  const holidayTitle = day.holidayName
    ? day.holidayNameNp
      ? `${day.holidayName} / ${day.holidayNameNp}`
      : day.holidayName
    : undefined;

  return (
    <div
      className="nepali-patro-daycell"
      style={containerStyle}
      onClick={() => day.isCurrentMonth && onPress?.(day)}
      role="button"
      aria-label={`BS ${day.bsYear}-${day.bsMonth}-${day.bsDay}${holidayTitle ? `, ${holidayTitle}` : ""}`}
      aria-pressed={isSelected}
      title={holidayTitle}
    >
      <span style={{ fontSize: "0.95rem", fontWeight: 500, lineHeight: 1.2 }}>
        {day.bsDay}
      </span>

      {day.events.length > 0 && (
        <div style={{ display: "flex", gap: 3, marginTop: 3 }}>
          {day.events.slice(0, 3).map((evt, idx) => (
            <span
              key={idx}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: evt.color ?? theme?.eventDotColor ?? DEFAULT_EVENT_DOT_COLOR,
                flexShrink: 0,
              }}
            />
          ))}
          {day.events.length > 3 && (
            <span style={{ fontSize: "0.55rem", lineHeight: "5px", color: textColor }}>
              +{day.events.length - 3}
            </span>
          )}
        </div>
      )}

      <div style={todayRingStyle} aria-hidden="true" />
    </div>
  );
};
