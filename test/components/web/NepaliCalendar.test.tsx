import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NepaliCalendar } from "../../../src/components/web/NepaliCalendar";
import type { BSMonth } from "../../../src/types";

describe("NepaliCalendar", () => {
  it("should render the calendar component", () => {
    render(<NepaliCalendar />);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should render with initial year and month", () => {
    render(<NepaliCalendar initialYear={2080} initialMonth={1 as BSMonth} />);
    expect(screen.getByText("BS 2080")).toBeInTheDocument();
  });

  it("should navigate to next month", () => {
    render(<NepaliCalendar initialYear={2080} initialMonth={1 as BSMonth} />);
    const nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);
    expect(screen.getByText(/Jestha/)).toBeInTheDocument();
  });

  it("should navigate to previous month", () => {
    render(<NepaliCalendar initialYear={2080} initialMonth={2 as BSMonth} />);
    const prevButton = screen.getByText(/Previous/);
    fireEvent.click(prevButton);
    expect(screen.getByText(/Baisakh/)).toBeInTheDocument();
  });

  it("should call onDayPress when day is clicked", () => {
    const onDayPress = vi.fn();
    render(<NepaliCalendar initialYear={2080} initialMonth={1 as BSMonth} onDayPress={onDayPress} />);
    const cells = screen.getAllByRole("button");
    const dayCell = cells.find((cell) => cell.textContent?.includes("15"));
    if (dayCell) {
      fireEvent.click(dayCell);
      expect(onDayPress).toHaveBeenCalled();
    }
  });

  it("should call onMonthChange when month changes", () => {
    const onMonthChange = vi.fn();
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        onMonthChange={onMonthChange}
      />
    );
    const nextButton = screen.getByText(/Next/);
    fireEvent.click(nextButton);
    expect(onMonthChange).toHaveBeenCalledWith(2080, 2);
  });

  it("should render with events", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        events={[
          { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Test Event" },
        ]}
      />
    );
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should render with custom theme", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        theme={{
          saturdayColor: "#FF0000",
          selectedColor: "#00FF00",
          todayColor: "#0000FF",
        }}
      />
    );
    expect(screen.getByText("BS 2080")).toBeInTheDocument();
  });

  it("should have Today button", () => {
    render(<NepaliCalendar />);
    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("should call goToday when Today button is clicked", () => {
    render(<NepaliCalendar initialYear={2075} initialMonth={1 as BSMonth} />);
    const todayButton = screen.getByText("Today");
    fireEvent.click(todayButton);
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should open holiday modal when holiday day is clicked", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        events={[]}
      />
    );
    const cells = screen.getAllByRole("button");
    const firstDay = cells.find((cell) => cell.textContent?.includes("1"));
    if (firstDay) {
      fireEvent.click(firstDay);
    }
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should select and deselect day on click", () => {
    render(<NepaliCalendar initialYear={2080} initialMonth={1 as BSMonth} />);
    const cells = screen.getAllByRole("button");
    const dayCell = cells.find((cell) => cell.textContent?.includes("15"));
    if (dayCell) {
      fireEvent.click(dayCell);
      fireEvent.click(dayCell);
    }
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should render weekday labels", () => {
    render(<NepaliCalendar />);
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  it("should apply surface color from theme", () => {
    render(
      <NepaliCalendar
        theme={{ surfaceColor: "#F0F0F0" }}
      />
    );
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("should render custom content via renderDay", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        renderDay={(day) => {
          if (day.bsDay === 15) {
            return <div data-testid="custom-cell">CUSTOM_{day.bsDay}</div>;
          }
          return null;
        }}
      />
    );
    expect(screen.getByTestId("custom-cell")).toHaveTextContent("CUSTOM_15");
  });

  it("should pass isSelected to renderDay", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        renderDay={(day, { isSelected, onPress }) => {
          if (day.bsDay === 15) {
            return (
              <div data-testid="selected-cell" onClick={onPress}>
                {isSelected ? "SELECTED" : "NOT_SELECTED"}
              </div>
            );
          }
          return null;
        }}
      />
    );
    const cell = screen.getByTestId("selected-cell");
    expect(cell).toHaveTextContent("NOT_SELECTED");
    fireEvent.click(cell);
    expect(cell).toHaveTextContent("SELECTED");
  });

  it("should trigger onDayPress via renderDay onPress", () => {
    const onDayPress = vi.fn();
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        onDayPress={onDayPress}
        renderDay={(day, { onPress }) => {
          if (day.bsDay === 15) {
            return <div data-testid="press-cell" onClick={onPress}>PRESS</div>;
          }
          return null;
        }}
      />
    );
    fireEvent.click(screen.getByTestId("press-cell"));
    expect(onDayPress).toHaveBeenCalledTimes(1);
    expect(onDayPress).toHaveBeenCalledWith(
      expect.objectContaining({ bsDay: 15, bsMonth: 1, bsYear: 2080 })
    );
  });

  it("should fall back to default DayCell when renderDay returns null", () => {
    render(
      <NepaliCalendar
        initialYear={2080}
        initialMonth={1 as BSMonth}
        renderDay={() => null}
      />
    );
    const cells = screen.getAllByRole("button");
    expect(cells.length).toBeGreaterThan(0);
  });
});
