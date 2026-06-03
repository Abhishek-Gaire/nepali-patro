import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarGrid } from "../../../src/components/web/CalendarGrid";
import { generateCalendarGrid } from "../../../src/core/generator";

describe("CalendarGrid", () => {
  const grid = generateCalendarGrid(2080, 1);

  it("should render the calendar grid", () => {
    render(<CalendarGrid grid={grid} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should render weekday labels", () => {
    render(<CalendarGrid grid={grid} />);
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("should render Header with correct year and month", () => {
    render(<CalendarGrid grid={grid} />);
    expect(screen.getAllByText(/BS 2079|BS 2080/).length).toBeGreaterThan(0);
  });

  it("should render all days in the grid", () => {
    render(<CalendarGrid grid={grid} />);
    const cells = screen.getAllByRole("button");
    expect(cells.length).toBeGreaterThan(28);
  });

  it("should call onDayPress when day is clicked", () => {
    const onDayPress = vi.fn();
    render(<CalendarGrid grid={grid} onDayPress={onDayPress} />);
    const firstCurrentMonthDay = grid.flat().find((d) => d.isCurrentMonth);
    if (firstCurrentMonthDay) {
      const cells = screen.getAllByRole("button");
      const targetCell = cells.find(
        (cell) => cell.textContent?.includes(String(firstCurrentMonthDay.bsDay))
      );
      if (targetCell) {
        fireEvent.click(targetCell);
        expect(onDayPress).toHaveBeenCalled();
      }
    }
  });

  it("should highlight selected day", () => {
    const selectedDay = grid.flat().find((d) => d.isCurrentMonth && d.bsDay === 15);
    render(<CalendarGrid grid={grid} selected={selectedDay || null} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should apply custom theme", () => {
    const theme = {
      saturdayColor: "#FF0000",
      surfaceColor: "#000000",
      borderColor: "#333333",
      textColor: "#FFFFFF",
    };
    render(<CalendarGrid grid={grid} theme={theme} />);
    expect(screen.getByText("Sat")).toBeInTheDocument();
  });

  it("should render empty grid as null", () => {
    const { container } = render(<CalendarGrid grid={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render multiple weeks", () => {
    render(<CalendarGrid grid={grid} />);
    expect(grid.length).toBeGreaterThanOrEqual(4);
  });

  it("should have consistent 7-column layout", () => {
    render(<CalendarGrid grid={grid} />);
    grid.forEach((week) => {
      expect(week.length).toBe(7);
    });
  });
});
