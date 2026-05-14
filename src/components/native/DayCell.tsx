/**
 * ============================================================================
 * barshik-nepali-patro — React Native DayCell Component
 * ============================================================================
 * Renders a single day cell for React Native.
 * Uses View, Text, and TouchableOpacity from react-native.
 *
 * Styling is done via StyleSheet.create for performance, with dynamic
 * colors passed through inline style overrides where necessary.
 * ============================================================================
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { DayCellProps } from "../../types";

const DEFAULT_SATURDAY_COLOR = "#C0272D";
const DEFAULT_TODAY_COLOR = "#E8751A";
const DEFAULT_SELECTED_COLOR = "#2563EB";
const DEFAULT_TEXT_COLOR = "#1F2937";
const DEFAULT_EVENT_DOT_COLOR = "#E8751A";

export const DayCell: React.FC<DayCellProps> = ({ day, theme, isSelected, onPress }) => {
  const isRed = day.isSaturday || day.isHoliday;
  const textColor = isRed
    ? (theme?.saturdayColor ?? DEFAULT_SATURDAY_COLOR)
    : (theme?.textColor ?? DEFAULT_TEXT_COLOR);

  const isToday = day.isToday;

  const containerDynamic = {
    backgroundColor: isSelected
      ? (theme?.selectedColor ?? DEFAULT_SELECTED_COLOR)
      : isToday
        ? (theme?.todayColor ?? DEFAULT_TODAY_COLOR) + "22"
        : "transparent",
    opacity: day.isCurrentMonth ? 1 : 0.35,
  };

  return (
    <TouchableOpacity
      activeOpacity={day.isCurrentMonth ? 0.7 : 1}
      onPress={() => day.isCurrentMonth && onPress?.(day)}
      style={[styles.container, containerDynamic]}
      accessibilityLabel={`BS ${day.bsYear}-${day.bsMonth}-${day.bsDay}`}
      accessibilityState={{ selected: !!isSelected }}
    >
      <Text
        style={[
          styles.dayText,
          { color: isSelected ? "#FFFFFF" : textColor },
        ]}
      >
        {day.bsDay}
      </Text>



      {day.events.length > 0 && (
        <View style={styles.dotsRow}>
          {day.events.slice(0, 3).map((evt, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                { backgroundColor: evt.color ?? theme?.eventDotColor ?? DEFAULT_EVENT_DOT_COLOR },
              ]}
            />
          ))}
          {day.events.length > 3 && (
            <Text style={[styles.overflowText, { color: textColor }]}>
              +{day.events.length - 3}
            </Text>
          )}
        </View>
      )}

      {isToday && !isSelected && (
        <View
          style={[
            styles.todayRing,
            { backgroundColor: theme?.todayColor ?? DEFAULT_TODAY_COLOR },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
  },

  dotsRow: {
    flexDirection: "row",
    gap: 3,
    marginTop: 3,
    alignItems: "center",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  overflowText: {
    fontSize: 7,
    lineHeight: 7,
  },
  todayRing: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
