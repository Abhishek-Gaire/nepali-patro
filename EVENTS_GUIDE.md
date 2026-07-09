# Adding Custom Events & Holidays to `barshik-nepali-patro`

## Quick Reference

| Goal | How |
|------|-----|
| Show a birthday / exam / meeting on the calendar | Pass a `CalendarEvent` to the `events` prop |
| Change the dot color | Set the optional `color` field |
| React when a day is tapped | `onDayPress` callback |
| Control events dynamically | `useState` / `useEffect` + `events` prop |
| Use events without the UI | `useNepaliCalendar` or `generateCalendarGrid` from `core` |
| Add a permanent public holiday | Edit `src/data/holidays.data.ts` (library maintainers only) |

---

## 1. Basic Events

Every event needs a BS date and a title. Year, month, and day are **required**.

```tsx
import { NepaliCalendar } from "barshik-nepali-patro";

function App() {
  return (
    <NepaliCalendar
      events={[
        {
          bsYear: 2083,
          bsMonth: 2,   // 1 = Baisakh, 2 = Jestha, … 12 = Chaitra
          bsDay: 15,
          title: "Exam begins",
        },
      ]}
    />
  );
}
```

Events appear as small orange dots below the day number. Tapping a day with events opens the holiday modal which lists all events on that date.

---

## 2. With Custom Dot Colors

Set `color` to any CSS/React Native color string.

```tsx
<NepaliCalendar
  events={[
    {
      bsYear: 2083,
      bsMonth: 3,
      bsDay: 10,
      title: "Birthday",
      color: "#EC4899",   // pink
    },
    {
      bsYear: 2083,
      bsMonth: 3,
      bsDay: 10,
      title: "Team standup",
      color: "#3B82F6",   // blue
    },
    {
      bsYear: 2083,
      bsMonth: 3,
      bsDay: 10,
      title: "Project deadline",
      color: "#EF4444",   // red
    },
  ]}
/>
```

Multiple events on the same day render multiple dots in the order they appear in the array (up to 3 visible, then a "+N" overflow).

---

## 3. Responding to Day Presses

```tsx
<NepaliCalendar
  events={myEvents}
  onDayPress={(day) => {
    console.log(`${day.bsYear}-${day.bsMonth}-${day.bsDay}`);
    console.log("Events on this day:", day.events);
    console.log("Holiday:", day.holidayName);
    console.log("Gregorian:", day.adDate.toISOString());
  }}
/>
```

`day.events` contains every `CalendarEvent` that matches that date, so you can build your own side-panel or toast without relying on the built-in modal.

---

## 4. Dynamic Events (from State / API)

```tsx
import { useState, useEffect } from "react";
import { NepaliCalendar } from "barshik-nepali-patro";

function CalendarWithAPI() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events?bsYear=2083")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  return <NepaliCalendar events={events} />;
}
```

---

## 5. Using the Hook Directly (Custom UI)

```tsx
import { useNepaliCalendar } from "barshik-nepali-patro";

function CustomCalendar() {
  const { grid, year, month, goNextMonth, goPrevMonth, holidays } =
    useNepaliCalendar({
      initialYear: 2083,
      initialMonth: 1,
      events: [
        { bsYear: 2083, bsMonth: 1, bsDay: 1, title: "New Year" },
      ],
    });

  return (
    <div>
      <button onClick={goPrevMonth}>&lt;</button>
      <span>{year} / {month}</span>
      <button onClick={goNextMonth}>&gt;</button>

      {grid.map((week) =>
        week.map((day) => (
          <div key={day.bsDay}>
            {day.bsDay}
            {day.events.length > 0 && <span> {day.events[0].title}</span>}
          </div>
        ))
      )}
    </div>
  );
}
```

---

## 6. Without Any UI (Core Utilities)

```tsx
import { generateCalendarGrid, getHolidays } from "barshik-nepali-patro/core";

const grid = generateCalendarGrid(
  2083,
  2,
  [
    { bsYear: 2083, bsMonth: 2, bsDay: 15, title: "Exam" },
  ],
  getHolidays(2083)
);

// grid[weekIndex][dayIndex].events → CalendarEvent[]
```

---

## 7. Using `CalendarEvent` Type

```tsx
import type { CalendarEvent } from "barshik-nepali-patro";

const myEvents: CalendarEvent[] = [
  {
    bsYear: 2083,
    bsMonth: 4,
    bsDay: 20,
    title: "Meeting",
    // color is optional
  },
];
```

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bsYear` | `number` | Yes | Bikram Sambat year |
| `bsMonth` | `1 \| 2 \| … \| 12` | Yes | 1 = Baisakh, 12 = Chaitra |
| `bsDay` | `number` | Yes | Day of month (1-32) |
| `title` | `string` | Yes | Display text |
| `color` | `string` | No | Dot color (default: theme `eventDotColor` or `#E8751A`) |

---

## 8. Custom Cell Rendering with `renderDay`

When the default event dots + holiday colors aren't enough, use the `renderDay` prop to completely customize each day cell.

```tsx
import { NepaliCalendar } from "barshik-nepali-patro";
import type { RenderDayCallback } from "barshik-nepali-patro";

const renderDay: RenderDayCallback = (day, { isSelected, onPress }) => {
  const hasEvents = day.events.length > 0;
  const isHoliday = day.isHoliday && !!day.holidayName;

  if (hasEvents || isHoliday) {
    return (
      <div
        onClick={onPress}
        style={{
          background: isSelected
            ? "#2563EB"
            : isHoliday
              ? "#FEE2E2"
              : "#FEF3C7",
          cursor: "pointer",
          padding: 8,
          minHeight: 78,
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <div>{day.bsDay}</div>
        {isHoliday && (
          <div style={{ fontSize: "0.6rem", color: "#DC2626" }}>
            {day.holidayName}
          </div>
        )}
        {day.events.map((e) => (
          <div
            key={e.title}
            style={{
              fontSize: "0.6rem",
              color: e.color ?? "#E8751A",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {e.title}
          </div>
        ))}
      </div>
    );
  }

  return null; // fall back to default cell
};

<NepaliCalendar renderDay={renderDay} events={myEvents} />
```

Return `null` or `undefined` for days that should use the default `DayCell` rendering.

---

## 9. Common Patterns

### Birthdays that repeat each year

```tsx
const birthdays = [1, 2, 3].map((day) => ({
  bsYear: 2083,
  bsMonth: 1,
  bsDay: day,
  title: "Birthday",
  color: "#EC4899",
}));
```

### Highlight weekends

```tsx
function getSaturdays(year: number, month: number) {
  // generateCalendarGrid + filter isSaturday
}
```

### Color by category

```tsx
const eventColor = (title: string) => {
  if (title.includes("Exam")) return "#EF4444";
  if (title.includes("Birthday")) return "#EC4899";
  if (title.includes("Meeting")) return "#3B82F6";
  return undefined; // fallback to theme default
};
```

---

## 10. Adding Permanent Public Holidays (Library Maintainers Only)

If you are maintaining the library itself, edit `src/data/holidays.data.ts`:

```ts
2083: [
  {
    month: 1,
    day: 1,
    name: "Nepali New Year",
    nameNp: "नयाँ वर्ष",
    scope: "national",
  },
  // ...
],
```

Available scope types: `national`, `dashain`, `tihar`, `ethnic`, `women`, `education`, `kathmandu-valley`, `observed`, `disabilities`, `birth-anniversary`, `office-open`.

---

## Type Reference

```ts
interface CalendarEvent {
  bsYear: number;
  bsMonth: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  bsDay: number;
  title: string;
  color?: string;
}
```
