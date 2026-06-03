import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useNepaliCalendar } from "../../src/hooks/useNepaliCalendar";
import { convertADtoBS } from "../../src/core/converter";
import type { BSMonth, CalendarEvent } from "../../src/types";

describe("useNepaliCalendar", () => {
  describe("initialization", () => {
    it("should initialize with current BS year and month by default", () => {
      const { result } = renderHook(() => useNepaliCalendar());
      const todayBS = convertADtoBS(new Date());
      expect(result.current.year).toBe(todayBS.year);
      expect(result.current.month).toBe(todayBS.month);
    });

    it("should initialize with provided initialYear and initialMonth", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      expect(result.current.year).toBe(2080);
      expect(result.current.month).toBe(1);
    });

    it("should generate a valid grid on initialization", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      expect(result.current.grid.length).toBeGreaterThanOrEqual(4);
      expect(result.current.grid.length).toBeLessThanOrEqual(6);
      result.current.grid.forEach((week) => {
        expect(week.length).toBe(7);
      });
    });

    it("should start with no selected day", () => {
      const { result } = renderHook(() => useNepaliCalendar());
      expect(result.current.selected).toBeNull();
    });

    it("should initialize with empty events array by default", () => {
      const { result } = renderHook(() => useNepaliCalendar());
      expect(result.current.events).toEqual([]);
    });

    it("should initialize with provided events", () => {
      const events: CalendarEvent[] = [
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "Test Event" },
      ];
      const { result } = renderHook(() =>
        useNepaliCalendar({ events })
      );
      expect(result.current.events).toEqual(events);
    });
  });

  describe("goNextMonth", () => {
    it("should increment month", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.goNextMonth();
      });
      expect(result.current.month).toBe(2);
      expect(result.current.year).toBe(2080);
    });

    it("should roll over to next year when month is 12", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 12 as BSMonth })
      );
      act(() => {
        result.current.goNextMonth();
      });
      expect(result.current.month).toBe(1);
      expect(result.current.year).toBe(2081);
    });

    it("should clear selection", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.setSelected(result.current.grid[0][0]);
      });
      expect(result.current.selected).not.toBeNull();
      act(() => {
        result.current.goNextMonth();
      });
      expect(result.current.selected).toBeNull();
    });

    it("should regenerate grid", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      const initialGrid = result.current.grid;
      act(() => {
        result.current.goNextMonth();
      });
      expect(result.current.grid).not.toBe(initialGrid);
    });
  });

  describe("goPrevMonth", () => {
    it("should decrement month", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 2 as BSMonth })
      );
      act(() => {
        result.current.goPrevMonth();
      });
      expect(result.current.month).toBe(1);
      expect(result.current.year).toBe(2080);
    });

    it("should roll over to previous year when month is 1", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.goPrevMonth();
      });
      expect(result.current.month).toBe(12);
      expect(result.current.year).toBe(2079);
    });

    it("should clear selection", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.setSelected(result.current.grid[0][0]);
      });
      expect(result.current.selected).not.toBeNull();
      act(() => {
        result.current.goPrevMonth();
      });
      expect(result.current.selected).toBeNull();
    });
  });

  describe("jumpTo", () => {
    it("should jump to specified year and month", () => {
      const { result } = renderHook(() => useNepaliCalendar());
      act(() => {
        result.current.jumpTo(2082, 6 as BSMonth);
      });
      expect(result.current.year).toBe(2082);
      expect(result.current.month).toBe(6);
    });

    it("should clear selection", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.setSelected(result.current.grid[0][0]);
      });
      act(() => {
        result.current.jumpTo(2081, 3 as BSMonth);
      });
      expect(result.current.selected).toBeNull();
    });

    it("should regenerate grid", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      const initialGrid = result.current.grid;
      act(() => {
        result.current.jumpTo(2081, 6 as BSMonth);
      });
      expect(result.current.grid).not.toBe(initialGrid);
    });
  });

  describe("goToday", () => {
    it("should reset to current BS date", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2075, initialMonth: 1 as BSMonth })
      );
      const todayBS = convertADtoBS(new Date());
      act(() => {
        result.current.goToday();
      });
      expect(result.current.year).toBe(todayBS.year);
      expect(result.current.month).toBe(todayBS.month);
    });

    it("should clear selection", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.setSelected(result.current.grid[0][0]);
      });
      act(() => {
        result.current.goToday();
      });
      expect(result.current.selected).toBeNull();
    });
  });

  describe("setSelected", () => {
    it("should set selected day", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      const day = result.current.grid[2][0];
      act(() => {
        result.current.setSelected(day);
      });
      expect(result.current.selected).toBe(day);
    });

    it("should clear selection when set to null", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      const day = result.current.grid[2][0];
      act(() => {
        result.current.setSelected(day);
      });
      expect(result.current.selected).not.toBeNull();
      act(() => {
        result.current.setSelected(null);
      });
      expect(result.current.selected).toBeNull();
    });
  });

  describe("isCurrentMonth", () => {
    it("should be true when viewing current month", () => {
      const todayBS = convertADtoBS(new Date());
      const { result } = renderHook(() =>
        useNepaliCalendar({
          initialYear: todayBS.year,
          initialMonth: todayBS.month as BSMonth,
        })
      );
      expect(result.current.isCurrentMonth).toBe(true);
    });

    it("should be false when viewing different month", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2075, initialMonth: 1 as BSMonth })
      );
      expect(result.current.isCurrentMonth).toBe(false);
    });
  });

  describe("holidays", () => {
    it("should load holidays for current year", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      expect(Array.isArray(result.current.holidays)).toBe(true);
      expect(result.current.holidays.length).toBeGreaterThan(0);
    });

    it("should update holidays when year changes", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      const initialHolidays = result.current.holidays;
      act(() => {
        result.current.jumpTo(2081, 1 as BSMonth);
      });
      expect(result.current.holidays).not.toBe(initialHolidays);
    });
  });

  describe("grid regeneration", () => {
    it("should regenerate grid when events change", () => {
      const events1: CalendarEvent[] = [];
      const { result, rerender } = renderHook(
        ({ events }) => useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth, events }),
        { initialProps: { events: events1 } }
      );
      const initialGrid = result.current.grid;
      const events2: CalendarEvent[] = [
        { bsYear: 2080, bsMonth: 1, bsDay: 15, title: "New Event" },
      ];
      rerender({ events: events2 });
      expect(result.current.grid).not.toBe(initialGrid);
    });
  });

  describe("navigation sequence", () => {
    it("should handle multiple next month navigations", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 1 as BSMonth })
      );
      act(() => {
        result.current.goNextMonth();
        result.current.goNextMonth();
        result.current.goNextMonth();
      });
      expect(result.current.year).toBe(2080);
      expect(result.current.month).toBe(4);
    });

    it("should handle next and previous month navigations", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 6 as BSMonth })
      );
      act(() => {
        result.current.goNextMonth();
        result.current.goNextMonth();
        result.current.goPrevMonth();
      });
      expect(result.current.month).toBe(7);
    });

    it("should handle year boundary crossing", () => {
      const { result } = renderHook(() =>
        useNepaliCalendar({ initialYear: 2080, initialMonth: 11 as BSMonth })
      );
      act(() => {
        result.current.goNextMonth();
        result.current.goNextMonth();
      });
      expect(result.current.year).toBe(2081);
      expect(result.current.month).toBe(1);
    });
  });
});
