import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import type { HolidayModalProps } from "../../types";
import { BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP } from "../../data/months.data";
import { formatScope } from "../../utils/formatScope.utils";

export const HolidayModal: React.FC<HolidayModalProps> = ({ day, onClose, theme }) => {
  const visible = !!day;
  const borderColor = theme?.borderColor ?? "#E5E7EB";
  const surfaceColor = theme?.surfaceColor ?? "#FFFFFF";
  const accentColor = theme?.holidayColor ?? theme?.saturdayColor ?? "#C0272D";

  const scopeLabel = day ? formatScope(day.holidayScope) : null;
  const bsMonthNameEn = day ? (BS_MONTH_NAMES_EN[day.bsMonth - 1] ?? String(day.bsMonth)) : "";
  const bsMonthNameNp = day ? (BS_MONTH_NAMES_NP[day.bsMonth - 1] ?? String(day.bsMonth)) : "";
  const adDateLabel = day
    ? new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(day.adDate)
    : "";

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={[
            styles.card,
            { backgroundColor: surfaceColor, borderColor },
          ]}
          onPress={() => undefined}
        >
          <View style={[styles.header, { borderBottomColor: borderColor }]}>
            <View style={styles.headerTextBlock}>
              <Text style={[styles.kicker, { color: accentColor }]}>Holiday details</Text>
              <Text style={styles.title}>{day?.holidayName ?? "Holiday"}</Text>
              {day?.holidayNameNp ? (
                <Text style={styles.subtitle}>{day.holidayNameNp}</Text>
              ) : null}
            </View>

            <Pressable onPress={onClose} style={styles.closeButton} accessibilityLabel="Close holiday details">
              <Text style={styles.closeButtonText}>×</Text>
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.body}>
            {day ? (
              <View style={styles.grid}>
                <InfoBlock label="BS Date" value={`BS ${day.bsYear} ${bsMonthNameEn} ${day.bsDay}`} />
                <InfoBlock label="Nepali Date" value={`वि.सं. ${day.bsYear} ${bsMonthNameNp} ${day.bsDay}`} />
                <InfoBlock label="Gregorian Date" value={adDateLabel} />
                <InfoBlock label="Scope" value={scopeLabel ?? "National"} />
              </View>
            ) : null}

            {day && day.events.length > 0 ? (
              <View style={styles.eventsSection}>
                <Text style={styles.sectionLabel}>Events on this date</Text>
                {day.events.map((evt, index) => (
                  <View
                    key={`${evt.bsYear}-${evt.bsMonth}-${evt.bsDay}-${evt.title}-${index}`}
                    style={[styles.eventCard, { borderColor }]}
                  >
                    <View
                      style={[
                        styles.eventDot,
                        { backgroundColor: evt.color ?? theme?.eventDotColor ?? "#E8751A" },
                      ]}
                    />
                    <View style={styles.eventTextBlock}>
                      <Text style={styles.eventTitle}>{evt.title}</Text>
                      <Text style={styles.eventMeta}>
                        BS {evt.bsYear}-{evt.bsMonth}-{evt.bsDay}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : null}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTextBlock: {
    flex: 1,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#4B5563",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 18,
    lineHeight: 18,
    color: "#374151",
  },
  body: {
    padding: 16,
    gap: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  infoBlock: {
    flexBasis: "48%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    padding: 10,
    minWidth: 140,
  },
  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 13,
    lineHeight: 18,
    color: "#111827",
  },
  eventsSection: {
    gap: 8,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6B7280",
  },
  eventCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  eventDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 4,
    flexShrink: 0,
  },
  eventTextBlock: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  eventMeta: {
    marginTop: 2,
    fontSize: 12,
    color: "#6B7280",
  },
});
