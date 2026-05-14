/**
 * ============================================================================
 * nepali-patro — React Native Header Component
 * ============================================================================
 * Month/year navigation bar for React Native.
 * Uses TouchableOpacity for prev/next and Text for labels.
 * ============================================================================
 */

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import type { HeaderProps } from "../../types";
import { BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP } from "../../data/months.data";

const DEFAULT_HEADER_COLOR = "#1F2937";

export const Header: React.FC<HeaderProps> = ({ year, month, onPrev, onNext, theme }) => {
  const color = theme?.headerColor ?? DEFAULT_HEADER_COLOR;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPrev} style={styles.button} accessibilityLabel="Previous month">
        <Text style={[styles.arrow, { color }]}>‹</Text>
      </TouchableOpacity>

      <View style={styles.titleBlock}>
        <Text style={[styles.monthText, { color }]}>
          {BS_MONTH_NAMES_NP[month - 1]} ({BS_MONTH_NAMES_EN[month - 1]})
        </Text>
        <Text style={[styles.yearText, { color }]}>BS {year}</Text>
      </View>

      <TouchableOpacity onPress={onNext} style={styles.button} accessibilityLabel="Next month">
        <Text style={[styles.arrow, { color }]}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  button: {
    paddingHorizontal: 12,
  },
  arrow: {
    fontSize: 22,
    lineHeight: 24,
  },
  titleBlock: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "700",
  },
  yearText: {
    fontSize: 13,
    opacity: 0.8,
    marginTop: 2,
  },
});
