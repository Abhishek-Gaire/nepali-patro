/**
 * ============================================================================
 * barshik-nepali-patro — Web NepaliCalendar Component
 * ============================================================================
 * Top-level web component. Wires useNepaliCalendar hook into the
 * web-specific CalendarGrid + Header UI.
 *
 * Consumers import this from the main package entry:
 *   import { NepaliCalendar } from "barshik-nepali-patro";
 * ============================================================================
 */

import React from "react";
import type { NepaliCalendarProps } from "../../types";
import { useNepaliCalendar } from "../../hooks/useNepaliCalendar";
import { Header } from "./Header";
import { DayCell } from "./DayCell";
import { HolidayModal } from "./HolidayModal";
import { WEEKDAYS } from "../../constants";

export const NepaliCalendar: React.FC<NepaliCalendarProps> = ({
  initialYear,
  initialMonth,
  events,
  theme,
  onDayPress,
  onMonthChange,
}) => {
  const {
    year,
    month,
    grid,
    selected,
    setSelected,
    goNextMonth,
    goPrevMonth,
    goToday,
  } = useNepaliCalendar({ initialYear, initialMonth, events });
  const [activeHoliday, setActiveHoliday] = React.useState<typeof selected>(null);

  // Notify consumer when month changes
  React.useEffect(() => {
    onMonthChange?.(year, month);
  }, [year, month, onMonthChange]);

  const surfaceColor = theme?.surfaceColor ?? "#FFFFFF";
  const borderColor = theme?.borderColor ?? "#E5E7EB";

  return (
    <div
      className="barshik-nepali-patro-calendar"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        overflow: "visible",
      }}
    >
      <div
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: surfaceColor,
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        }}
      >
        <Header year={year} month={month} onPrev={goPrevMonth} onNext={goNextMonth} theme={theme} />

        {/* Today pill */}
        <div style={{ textAlign: "right", padding: "0 12px 4px" }}>
          <button
            onClick={goToday}
            style={{
              fontSize: "0.7rem",
              background: "#F3F4F6",
              border: "none",
              borderRadius: 999,
              padding: "2px 10px",
              cursor: "pointer",
              color: "#4B5563",
            }}
          >
            Today
          </button>
        </div>

        {/* Weekday labels */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            textAlign: "center",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#6B7280",
            padding: 1,
            borderBottom: `1px solid ${borderColor}`,
            backgroundColor: borderColor,
            gap: 1,
          }}
        >
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              style={{
                backgroundColor: surfaceColor,
                padding: "8px 0",
                color: d === "Sat" ? (theme?.saturdayColor ?? "#C0272D") : undefined,
                boxShadow: `inset 0 0 0 1px ${borderColor}`,
              }}
            >
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
                    onPress={(d) => {
                      const shouldClear =
                        !!selected &&
                        selected.bsYear === d.bsYear &&
                        selected.bsMonth === d.bsMonth &&
                        selected.bsDay === d.bsDay;
                      const isHoliday = !!d.holidayName || !!d.holidayScope;

                      setSelected(shouldClear ? null : d);
                      setActiveHoliday(shouldClear || !isHoliday ? null : d);
                      onDayPress?.(d);
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <HolidayModal
          day={activeHoliday}
          onClose={() => setActiveHoliday(null)}
          theme={theme}
        />
      </div>
    </div>
  );
};
