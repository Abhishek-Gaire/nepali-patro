import React from "react";
import type { HolidayModalProps } from "../../types";
import { BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP } from "../../data/months.data";
import { formatScope } from "../../utils/formatScope.utils";

export const HolidayModal: React.FC<HolidayModalProps> = ({ day, onClose, theme }) => {
  React.useEffect(() => {
    if (!day) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [day, onClose]);

  if (!day) {
    return null;
  }

  const borderColor = theme?.borderColor ?? "#E5E7EB";
  const surfaceColor = theme?.surfaceColor ?? "#FFFFFF";
  const accentColor = theme?.holidayColor ?? theme?.saturdayColor ?? "#C0272D";
  const scopeLabel = formatScope(day.holidayScope);
  const bsMonthNameEn = BS_MONTH_NAMES_EN[day.bsMonth - 1] ?? String(day.bsMonth);
  const bsMonthNameNp = BS_MONTH_NAMES_NP[day.bsMonth - 1] ?? String(day.bsMonth);
  const adDateLabel = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(day.adDate);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        backgroundColor: "rgb(15 23 42 / 0.55)",
      }}
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nepali-patro-holiday-title"
        style={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 16,
          backgroundColor: surfaceColor,
          border: `1px solid ${borderColor}`,
          boxShadow: "0 24px 60px rgb(0 0 0 / 0.25)",
          overflow: "hidden",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 12,
            padding: 16,
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <div style={{ minWidth: 0, flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, marginBottom: 6 }}>
              Holiday details
            </div>
            <h2
              id="nepali-patro-holiday-title"
              style={{ margin: 0, fontSize: 18, lineHeight: 1.3, color: "#111827" }}
            >
              {day.holidayName ?? "Holiday"}
            </h2>
            {day.holidayNameNp ? (
              <div style={{ marginTop: 4, fontSize: 14, color: "#4B5563" }}>
                {day.holidayNameNp}
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close holiday details"
            style={{
              border: "none",
              background: "#F3F4F6",
              color: "#374151",
              borderRadius: 999,
              width: 32,
              height: 32,
              cursor: "pointer",
              fontSize: 18,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: 16, display: "grid", gap: 12 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 12,
            }}
          >
            <InfoBlock label="BS Date" value={`BS ${day.bsYear} ${bsMonthNameEn} ${day.bsDay}`} />
            <InfoBlock label="Nepali Date" value={`वि.सं. ${day.bsYear} ${bsMonthNameNp} ${day.bsDay}`} />
            <InfoBlock label="Gregorian Date" value={adDateLabel} />
            <InfoBlock label="Scope" value={scopeLabel ?? "National"} />
          </div>

          {day.events.length > 0 ? (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#6B7280", marginBottom: 8 }}>
                Events on this date
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {day.events.map((evt, index) => (
                  <div
                    key={`${evt.bsYear}-${evt.bsMonth}-${evt.bsDay}-${evt.title}-${index}`}
                    style={{
                      borderRadius: 10,
                      border: `1px solid ${borderColor}`,
                      padding: 10,
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        marginTop: 4,
                        flexShrink: 0,
                        backgroundColor: evt.color ?? theme?.eventDotColor ?? "#E8751A",
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{evt.title}</div>
                      <div style={{ marginTop: 2, fontSize: 12, color: "#6B7280" }}>
                        BS {evt.bsYear}-{evt.bsMonth}-{evt.bsDay}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        backgroundColor: "#F9FAFB",
        padding: 10,
        minWidth: 0,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.4, color: "#111827", wordBreak: "break-word" }}>
        {value}
      </div>
    </div>
  );
}
