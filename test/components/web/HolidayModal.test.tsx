import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HolidayModal } from "../../../src/components/web/HolidayModal";
import type { CalendarDay, BSMonth } from "../../../src/types";

const mockDay: CalendarDay = {
  bsYear: 2080,
  bsMonth: 1 as BSMonth,
  bsDay: 1,
  adDate: new Date(2023, 3, 14),
  isSaturday: false,
  isHoliday: true,
  holidayName: "New Year",
  holidayNameNp: "नयाँ वर्ष",
  holidayScope: "national",
  isToday: false,
  isCurrentMonth: true,
  events: [],
};

describe("HolidayModal", () => {
  it("should render null when day is null", () => {
    const { container } = render(<HolidayModal day={null} onClose={vi.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render holiday name when day is provided", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText("New Year")).toBeInTheDocument();
  });

  it("should render Nepali holiday name", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText("नयाँ वर्ष")).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", () => {
    const onClose = vi.fn();
    render(<HolidayModal day={mockDay} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close holiday details"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when clicking backdrop", () => {
    const onClose = vi.fn();
    render(<HolidayModal day={mockDay} onClose={onClose} />);
    fireEvent.click(screen.getByRole("presentation"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should call onClose when Escape key is pressed", () => {
    const onClose = vi.fn();
    render(<HolidayModal day={mockDay} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should not call onClose when Escape is pressed and day is null", () => {
    const onClose = vi.fn();
    render(<HolidayModal day={null} onClose={onClose} />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should display BS date information", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getAllByText(/Baisakh/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/2080/).length).toBeGreaterThan(0);
  });

  it("should display Nepali date information", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText(/वि.सं./)).toBeInTheDocument();
  });

  it("should display Gregorian date", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText("Gregorian Date")).toBeInTheDocument();
  });

  it("should display holiday scope", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText(/National/)).toBeInTheDocument();
  });

  it("should render events when present", () => {
    const dayWithEvents: CalendarDay = {
      ...mockDay,
      events: [
        { bsYear: 2080, bsMonth: 1, bsDay: 1, title: "Celebration" },
      ],
    };
    render(<HolidayModal day={dayWithEvents} onClose={vi.fn()} />);
    expect(screen.getByText("Celebration")).toBeInTheDocument();
    expect(screen.getByText("Events on this date")).toBeInTheDocument();
  });

  it("should not render events section when no events", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.queryByText("Events on this date")).not.toBeInTheDocument();
  });

  it("should apply custom theme colors", () => {
    const { container } = render(
      <HolidayModal
        day={mockDay}
        onClose={vi.fn()}
        theme={{
          holidayColor: "#FF0000",
          surfaceColor: "#000000",
          borderColor: "#333333",
        }}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("should have dialog role and aria-modal", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.getAttribute("aria-modal")).toBe("true");
  });

  it("should have accessible title", () => {
    render(<HolidayModal day={mockDay} onClose={vi.fn()} />);
    expect(screen.getByText("Holiday details")).toBeInTheDocument();
  });

  it("should handle day without Nepali name", () => {
    const dayWithoutNp: CalendarDay = {
      ...mockDay,
      holidayNameNp: undefined,
    };
    render(<HolidayModal day={dayWithoutNp} onClose={vi.fn()} />);
    expect(screen.getByText("New Year")).toBeInTheDocument();
  });

  it("should handle day without holiday scope", () => {
    const dayWithoutScope: CalendarDay = {
      ...mockDay,
      holidayScope: undefined,
    };
    render(<HolidayModal day={dayWithoutScope} onClose={vi.fn()} />);
    expect(screen.getByText("National")).toBeInTheDocument();
  });

  it("should stop propagation on dialog click", () => {
    const onClose = vi.fn();
    render(<HolidayModal day={mockDay} onClose={onClose} />);
    const dialog = screen.getByRole("dialog");
    fireEvent.click(dialog);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("should remove event listener on unmount", () => {
    const onClose = vi.fn();
    const { unmount } = render(<HolidayModal day={mockDay} onClose={onClose} />);
    unmount();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});
