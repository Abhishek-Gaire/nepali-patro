/**
 * ============================================================================
 * nepali-patro — React Native NepaliCalendar Component
 * ============================================================================
 * Top-level React Native component. Wires useNepaliCalendar into the
 * native-specific UI primitives.
 *
 * Consumers import this from the native subpath:
 *   import { NepaliCalendar } from "nepali-patro/native";
 * ============================================================================
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
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

  React.useEffect(() => {
    onMonthChange?.(year, month);
  }, [year, month, onMonthChange]);

  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme?.surfaceColor ?? "#FFFFFF" },
      ]}
    >
      <Header year={year} month={month} onPrev={goPrevMonth} onNext={goNextMonth} theme={theme} />

      {/* Today pill */}
      <View style={{ alignItems: "flex-end", paddingHorizontal: 12, paddingBottom: 4 }}>
        <TouchableOpacity onPress={goToday} style={styles.todayPill}>
          <Text style={styles.todayPillText}>Today</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday labels */}
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((d) => (
          <Text
            key={d}
            style={[
              styles.weekdayText,
              d === "Sat" && { color: theme?.saturdayColor ?? "#C0272D" },
            ]}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* Day grid */}
      <View style={styles.grid}>
        {grid.map((week, wIdx) => (
          <View key={wIdx} style={styles.weekRow}>
            {week.map((day, dIdx) => (
              <DayCell
                key={`${day.bsYear}-${day.bsMonth}-${day.bsDay}-${dIdx}`}
                day={day}
                theme={theme}
                isSelected={
                  !!selected &&
                  selected.bsYear === day.bsYear &&
                  selected.bsMonth === day.bsMonth &&
                  selected.bsDay === day.bsDay
                }
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
            ))}
          </View>
        ))}
      </View>

      <HolidayModal
        day={activeHoliday}
        onClose={() => setActiveHoliday(null)}
        theme={theme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    maxWidth: 440,
    alignSelf: "center",
    width: "100%",
  },
  todayPill: {
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  todayPillText: {
    fontSize: 10,
    color: "#4B5563",
  },
  weekdayRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  weekdayText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
    flex: 1,
  },
  grid: {
    padding: 4,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 2,
  },
});
