/**
 * ============================================================================
 * barshik-nepali-patro — Web Header Component
 * ============================================================================
 * Month/year navigation bar for the web calendar.
 * Displays the current BS month name + year with previous/next chevrons.
 * ============================================================================
 */

import React from "react";
import type { HeaderProps } from "../../types";
import { BS_MONTH_NAMES_EN, BS_MONTH_NAMES_NP } from "../../data/months.data";

const DEFAULT_HEADER_COLOR = "#1F2937";

export const Header: React.FC<HeaderProps> = ({ year, month, onPrev, onNext, theme }) => {
  const color = theme?.headerColor ?? DEFAULT_HEADER_COLOR;

  const btnStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "1.25rem",
    padding: "0 12px",
    color,
    lineHeight: 1,
  };

  return (
    <div
      className="barshik-nepali-patro-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 8px",
        userSelect: "none",
      }}
    >
      <button style={btnStyle} onClick={onPrev} aria-label="Previous month">
        {"<"} Previous
      </button>

      <div style={{ textAlign: "center", color }}>
        <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
          {BS_MONTH_NAMES_NP[month - 1]} ({BS_MONTH_NAMES_EN[month - 1]})
        </div>
        <div style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: 2 }}>
          BS {year}
        </div>
      </div>

      <button style={btnStyle} onClick={onNext} aria-label="Next month">
        Next {">"}
      </button>
    </div>
  );
};
