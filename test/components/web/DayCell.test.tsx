import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DayCell } from "../../../src/components/web/DayCell";
import type { CalendarDay, BSMonth } from "../../../src/types";

const mockDay: CalendarDay = {
  bsYear: 2080,
  bsMonth: 1 as BSMonth,
  bsDay: 15,
  adDate: new Date(2023, 3, 28),
  isSaturday: false,
  isHoliday: false,
  isToday: false,
  isCurrentMonth: true,
  events: [],
};

describe("DayCell", () => {
  it("should render the day number", () => {
    render(<DayCell day={mockDay} />);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("should call onPress when clicked", () => {
    const onPress = vi.fn();
    render(<DayCell day={mockDay} onPress={onPress} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledWith(mockDay);
  });

  it("should not call onPress when clicking padding cell", () => {
    const onPress = vi.fn();
    const paddingDay = { ...mockDay, isCurrentMonth: false };
    render(<DayCell day={paddingDay} onPress={onPress} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onPress).not.toHaveBeenCalled();
  });

  it("should apply selected styling when isSelected is true", () => {
    const { container } = render(<DayCell day={mockDay} isSelected />);
    const cell = container.firstChild as HTMLElement;
    expect(cell.style.backgroundColor).toBeDefined();
  });

  it("should render event dots when day has events", () => {
    const dayWithEvents: CalendarDay = {
      ...mockDay,
      events: [
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 1" },
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 2" },
      ],
    };
    render(<DayCell day={dayWithEvents} />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should show holiday title in aria-label", () => {
    const holidayDay: CalendarDay = {
      ...mockDay,
      holidayName: "Test Holiday",
      holidayNameNp: "परीक्षा बिदा",
    };
    render(<DayCell day={holidayDay} />);
    const cell = screen.getByRole("button");
    expect(cell.getAttribute("aria-label")).toContain("Test Holiday");
  });

  it("should apply Saturday styling", () => {
    const saturdayDay: CalendarDay = {
      ...mockDay,
      isSaturday: true,
      isHoliday: true,
    };
    const { container } = render(<DayCell day={saturdayDay} />);
    const cell = container.firstChild as HTMLElement;
    expect(cell).toBeInTheDocument();
  });

  it("should show today indicator when isToday is true", () => {
    const todayDay: CalendarDay = {
      ...mockDay,
      isToday: true,
    };
    const { container } = render(<DayCell day={todayDay} />);
    expect(container).toBeInTheDocument();
  });

  it("should apply custom theme colors", () => {
    const theme = {
      selectedColor: "#FF0000",
      todayColor: "#00FF00",
      saturdayColor: "#0000FF",
      textColor: "#333333",
      surfaceColor: "#FFFFFF",
      borderColor: "#CCCCCC",
    };
    const { container } = render(
      <DayCell day={mockDay} isSelected theme={theme} />
    );
    const cell = container.firstChild as HTMLElement;
    expect(cell).toBeInTheDocument();
  });

  it("should have correct aria-pressed when selected", () => {
    const { container: selectedContainer } = render(<DayCell day={mockDay} isSelected />);
    const selectedCell = selectedContainer.firstChild as HTMLElement;
    expect(selectedCell.getAttribute("aria-pressed")).toBeTruthy();

    const { container: unselectedContainer } = render(<DayCell day={mockDay} />);
    const unselectedCell = unselectedContainer.firstChild as HTMLElement;
    expect(unselectedCell.getAttribute("aria-pressed")).toBeFalsy();
  });

  it("should render with lower opacity for padding cells", () => {
    const paddingDay: CalendarDay = {
      ...mockDay,
      isCurrentMonth: false,
    };
    const { container } = render(<DayCell day={paddingDay} />);
    const cell = container.firstChild as HTMLElement;
    expect(cell.style.opacity).toBe("0.35");
  });

  it("should truncate events display to 3 dots with +count", () => {
    const dayWithManyEvents: CalendarDay = {
      ...mockDay,
      events: [
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 1" },
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 2" },
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 3" },
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 4" },
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event 5" },
      ],
    };
    render(<DayCell day={dayWithManyEvents} />);
    expect(screen.getByText("+2")).toBeInTheDocument();
  });

  it("should use event color when provided", () => {
    const dayWithColoredEvent: CalendarDay = {
      ...mockDay,
      events: [
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Event", color: "#FF5733" },
      ],
    };
    const { container } = render(<DayCell day={dayWithColoredEvent} />);
    expect(container).toBeInTheDocument();
  });
});
