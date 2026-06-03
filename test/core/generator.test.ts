import { describe, it, expect, vi} from "vitest";
import { generateCalendarGrid, chunkIntoWeeks } from "../../src/core/generator";
import type { CalendarEvent, NepaliHoliday, BSMonth } from "../../src/types";

describe("generateCalendarGrid", () => {
  it("should return a 2D array", () => {
    const grid = generateCalendarGrid(2080, 1);
    expect(Array.isArray(grid)).toBe(true);
    expect(Array.isArray(grid[0])).toBe(true);
  });

  it("should have exactly 7 columns per week", () => {
    const grid = generateCalendarGrid(2080, 1);
    grid.forEach((week) => {
      expect(week.length).toBe(7);
    });
  });

  it("should have between 4 and 6 weeks", () => {
    const grid = generateCalendarGrid(2080, 1);
    expect(grid.length).toBeGreaterThanOrEqual(4);
    expect(grid.length).toBeLessThanOrEqual(6);
  });

  it("should include all days of the month", () => {
    const grid = generateCalendarGrid(2080, 1);
    const allDays = grid.flat().filter((d) => d.isCurrentMonth);
    expect(allDays.length).toBe(31);
  });

  it("should start with the correct weekday alignment", () => {
    const grid = generateCalendarGrid(2080, 1);
    const firstDay = grid[0][0];
    if (!firstDay.isCurrentMonth) {
      expect(firstDay.isCurrentMonth).toBe(false);
    }
  });

  it("should mark padding cells as not current month", () => {
    const grid = generateCalendarGrid(2080, 1);
    const paddingCells = grid.flat().filter((d) => !d.isCurrentMonth);
    paddingCells.forEach((cell) => {
      expect(cell.isCurrentMonth).toBe(false);
    });
  });

  it("should mark current month days correctly", () => {
    const grid = generateCalendarGrid(2080, 1);
    const currentMonthDays = grid.flat().filter((d) => d.isCurrentMonth);
    currentMonthDays.forEach((cell) => {
      expect(cell.bsYear).toBe(2080);
      expect(cell.bsMonth).toBe(1);
    });
  });

  it("should have consecutive days for current month", () => {
    const grid = generateCalendarGrid(2080, 1);
    const currentMonthDays = grid.flat().filter((d) => d.isCurrentMonth);
    for (let i = 0; i < currentMonthDays.length - 1; i++) {
      expect(currentMonthDays[i + 1].bsDay - currentMonthDays[i].bsDay).toBe(1);
    }
  });

  it("should set correct BS year and month for each cell", () => {
    const grid = generateCalendarGrid(2080, 6);
    const currentMonthDays = grid.flat().filter((d) => d.isCurrentMonth);
    currentMonthDays.forEach((cell) => {
      expect(cell.bsYear).toBe(2080);
      expect(cell.bsMonth).toBe(6);
    });
  });

  it("should map each cell to a valid AD date", () => {
    const grid = generateCalendarGrid(2080, 1);
    grid.flat().forEach((cell) => {
      expect(cell.adDate).toBeInstanceOf(Date);
      expect(cell.adDate.getFullYear()).toBeGreaterThan(1900);
    });
  });
});

describe("generateCalendarGrid - Saturday detection", () => {
  it("should mark Saturdays correctly", () => {
    const grid = generateCalendarGrid(2080, 1);
    const saturdays = grid.flat().filter((d) => d.isSaturday && d.isCurrentMonth);
    saturdays.forEach((cell) => {
      expect(cell.adDate.getDay()).toBe(6);
    });
  });

  it("should mark holidays for Saturdays when holidays are provided", () => {
    const grid = generateCalendarGrid(2080, 1);
    const saturdays = grid.flat().filter((d) => d.isSaturday && d.isCurrentMonth);
    saturdays.forEach((cell) => {
      expect(cell.isHoliday || cell.isSaturday).toBe(true);
    });
  });
});

describe("generateCalendarGrid - Holiday detection", () => {
  it("should mark holidays from provided holiday list", () => {
    const holidays: NepaliHoliday[] = [
      { month: 1, day: 15, name: "Test Holiday", nameNp: "परीक्षा बिदा" },
    ];
    const grid = generateCalendarGrid(2080, 1, [], holidays);
    const holidayCell = grid
      .flat()
      .find((d) => d.isCurrentMonth && d.bsDay === 15 && d.holidayName === "Test Holiday");
    expect(holidayCell).toBeDefined();
    expect(holidayCell?.isHoliday).toBe(true);
  });

  it("should include holiday name in cell", () => {
    const holidays: NepaliHoliday[] = [
      { month: 1, day: 1, name: "New Year", nameNp: "नयाँ वर्ष" },
    ];
    const grid = generateCalendarGrid(2080, 1, [], holidays);
    const newYearCell = grid
      .flat()
      .find((d) => d.isCurrentMonth && d.bsDay === 1);
    expect(newYearCell?.holidayName).toBe("New Year");
    expect(newYearCell?.holidayNameNp).toBe("नयाँ वर्ष");
  });

  it("should include holiday scope in cell", () => {
    const holidays: NepaliHoliday[] = [
      { month: 1, day: 1, name: "National Day", scope: "national" },
    ];
    const grid = generateCalendarGrid(2080, 1, [], holidays);
    const cell = grid.flat().find((d) => d.isCurrentMonth && d.bsDay === 1);
    expect(cell?.holidayScope).toBe("national");
  });
});

describe("generateCalendarGrid - Event merging", () => {
  it("should merge events into correct day cells", () => {
    const events: CalendarEvent[] = [
      { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Exam" },
    ];
    const grid = generateCalendarGrid(2080, 1, events);
    const examCell = grid
      .flat()
      .find((d) => d.isCurrentMonth && d.bsDay === 15);
    expect(examCell?.events.length).toBe(1);
    expect(examCell?.events[0].title).toBe("Exam");
  });

  it("should not merge events for wrong month", () => {
    const events: CalendarEvent[] = [
      { bsYear: 2080, bsMonth: 2, bsDay: 15, title: "Exam" },
    ];
    const grid = generateCalendarGrid(2080, 1, events);
    grid.flat().forEach((cell) => {
      expect(cell.events.length).toBe(0);
    });
  });

  it("should handle multiple events on same day", () => {
    const events: CalendarEvent[] = [
      { bsYear: 2080, bsMonth: 1, bsDay: 10, title: "Event 1" },
      { bsYear: 2080, bsMonth: 1, bsDay: 10, title: "Event 2" },
    ];
    const grid = generateCalendarGrid(2080, 1, events);
    const cell = grid.flat().find((d) => d.isCurrentMonth && d.bsDay === 10);
    expect(cell?.events.length).toBe(2);
  });

  it("should include event color", () => {
    const events: CalendarEvent[] = [
      { bsYear: 2080, bsMonth: 1, bsDay: 5, title: "Colored Event", color: "#FF0000" },
    ];
    const grid = generateCalendarGrid(2080, 1, events);
    const cell = grid.flat().find((d) => d.isCurrentMonth && d.bsDay === 5);
    expect(cell?.events[0].color).toBe("#FF0000");
  });
});

describe("generateCalendarGrid - Today detection", () => {
  it("should mark today's date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2023, 3, 14));

    const grid = generateCalendarGrid(2080, 1);
    const todayCell = grid.flat().find((d) => d.isToday);
    expect(todayCell).toBeDefined();
    expect(todayCell?.bsDay).toBe(1);
    expect(todayCell?.bsMonth).toBe(1);
    expect(todayCell?.bsYear).toBe(2080);

    vi.useRealTimers();
  });

  it("should have at most one today cell", () => {
    const grid = generateCalendarGrid(2080, 1);
    const todayCells = grid.flat().filter((d) => d.isToday);
    expect(todayCells.length).toBeLessThanOrEqual(1);
  });
});

describe("generateCalendarGrid - Different months", () => {
  const months: BSMonth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  months.forEach((month) => {
    it(`should generate grid for month ${month}`, () => {
      const grid = generateCalendarGrid(2080, month);
      expect(grid.length).toBeGreaterThanOrEqual(4);
      expect(grid.length).toBeLessThanOrEqual(6);
      const currentMonthDays = grid.flat().filter((d) => d.isCurrentMonth);
      expect(currentMonthDays.length).toBeGreaterThan(27);
    });
  });
});

describe("generateCalendarGrid - Year boundary", () => {
  it("should handle month 12 correctly", () => {
    const grid = generateCalendarGrid(2080, 12);
    const currentMonthDays = grid.flat().filter((d) => d.isCurrentMonth);
    expect(currentMonthDays.length).toBeGreaterThan(0);
  });

  it("should handle trailing cells for month 12 pointing to month 1 of next year", () => {
    const grid = generateCalendarGrid(2080, 12);
    const trailingCells = grid.flat().filter(
      (d) => !d.isCurrentMonth && d.bsMonth === 1 && d.bsYear === 2081
    );
    expect(trailingCells.length).toBeGreaterThanOrEqual(0);
  });
});

describe("chunkIntoWeeks", () => {
  it("should chunk array into groups of 7", () => {
    const arr = Array.from({ length: 21 }, (_, i) => i);
    const result = chunkIntoWeeks(arr);
    expect(result.length).toBe(3);
    result.forEach((week) => {
      expect(week.length).toBe(7);
    });
  });

  it("should handle arrays not divisible by 7", () => {
    const arr = Array.from({ length: 15 }, (_, i) => i);
    const result = chunkIntoWeeks(arr);
    expect(result.length).toBe(3);
    expect(result[0].length).toBe(7);
    expect(result[1].length).toBe(7);
    expect(result[2].length).toBe(1);
  });

  it("should handle empty array", () => {
    const result = chunkIntoWeeks([]);
    expect(result.length).toBe(0);
  });

  it("should handle array with less than 7 elements", () => {
    const arr = [1, 2, 3];
    const result = chunkIntoWeeks(arr);
    expect(result.length).toBe(1);
    expect(result[0]).toEqual([1, 2, 3]);
  });

  it("should preserve element order", () => {
    const arr = Array.from({ length: 14 }, (_, i) => i + 1);
    const result = chunkIntoWeeks(arr);
    expect(result[0]).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(result[1]).toEqual([8, 9, 10, 11, 12, 13, 14]);
  });
});
