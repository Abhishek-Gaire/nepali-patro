/**
 * ============================================================================
 * barshik-nepali-patro — Web CalendarGrid Component
 * ============================================================================
 * Renders the full 7-column calendar table for web.
 * Composed of Header + weekday labels + DayCell rows.
 * ============================================================================
 */

import React from "react";
import type { CalendarGridProps } from "../../types";
import { Header } from "./Header";
import { DayCell } from "./DayCell";
import { WEEKDAYS } from "../../constants";

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  grid,
  theme,
  selected,
  onDayPress,
}) => {
  if (!grid.length) return null;

  const { bsYear, bsMonth } = grid[0][0]; // derive from first cell
  const surfaceColor = theme?.surfaceColor ?? "#FFFFFF";
  const borderColor = theme?.borderColor ?? "#E5E7EB";

  return (
    <div
      className="barshik-nepali-patro-calendar"
      style={{
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        maxWidth: 420,
        border: `1px solid ${borderColor}`,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: surfaceColor,
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      }}
    >
      <Header
        year={bsYear}
        month={bsMonth}
        onPrev={() => {
          /* wired by parent */
        }}
        onNext={() => {
          /* wired by parent */
        }}
        theme={theme}
      />

      {/* Weekday labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          textAlign: "center",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#6B7280",
          padding: "6px 0",
          borderBottom: `1px solid ${borderColor}`,
          backgroundColor: surfaceColor,
        }}
      >
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ color: d === "Sat" ? (theme?.saturdayColor ?? "#C0272D") : undefined }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        style={{
          backgroundColor: borderColor,
          padding: 1,
          display: "grid",
          gap: 1,
        }}
      >
        {grid.map((week, weekIdx) => (
          <div
            key={`week-${weekIdx}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
              gap: 1,
              alignItems: "stretch",
            }}
          >
            {week.map((day, dayIdx) => {
              const isSelected =
                !!selected &&
                selected.bsYear === day.bsYear &&
                selected.bsMonth === day.bsMonth &&
                selected.bsDay === day.bsDay;

              return (
                <DayCell
                  key={`${day.bsYear}-${day.bsMonth}-${day.bsDay}-${weekIdx}-${dayIdx}`}
                  day={day}
                  theme={theme}
                  isSelected={isSelected}
                  onPress={onDayPress}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
