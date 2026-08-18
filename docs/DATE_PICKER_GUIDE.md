# Using nepali-patro as a BS Date Picker in Forms

`barshik-nepali-patro` is a zero-dependency Bikram Sambat (BS) calendar library for React & React Native. It can be used as a date picker with two approaches: a pre-built `<NepaliCalendar />` component for quick integration, or the `useNepaliCalendar` hook + building blocks for full custom UI.

## Installation

```bash
npm install barshik-nepali-patro
# or
yarn add barshik-nepali-patro
```

## Two Integration Approaches

### Approach 1: Pre-built Component (Quick Start)

Use `<NepaliCalendar />` for standard forms with minimal code.

```tsx
import { NepaliCalendar } from "barshik-nepali-patro";
import { BS_MONTH_NAMES_NP } from "barshik-nepali-patro";

export default function BirthDateForm() {
  const [selected, setSelected] = React.useState<{ bsYear: number; bsMonth: number; bsDay: number } | null>(null);

  const handleSubmit = () => {
    if (!selected) return alert("Select a date");
    const adDate = convertBStoAD(selected); // → Date for your API
    console.log("AD date for submission:", adDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Birth Date (BS):
        <NepaliCalendar
          initialYear={2081}
          initialMonth={1}
          onDayPress={(day) => setSelected({ bsYear: day.bsYear, bsMonth: day.bsMonth, bsDay: day.bsDay })}
        />
      </label>

      <input
        type="text"
        value={selected ? `${selected.bsDay} ${BS_MONTH_NAMES_NP[selected.bsMonth - 1]} ${selected.bsYear}` : "Select date"}
        readOnly
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

**Key props** on `<NepaliCalendar />`:

| Prop | Description | Default |
|---|---|---|
| `initialYear` | BS year to display first | Current BS year |
| `initialMonth` | BS month (1-12) to display first | Current BS month |
| `events` | Array of `CalendarEvent` to overlay on specific days | `[]` |
| `theme` | `CalendarTheme` overrides for colors | Library defaults |
| `onDayPress` | Called when user selects a day | `() => {}` |
| `onMonthChange` | Called when month/year changes via navigation | `() => {}` |
| `renderDay` | Override default day cell renderer | `undefined` (use default) |
| `renderMonthHeader` | Override default month header | `undefined` (use default) |

### Approach 2: Hook + Building Blocks (Full Custom UI)

Use `useNepaliCalendar` + `CalendarGrid` + `DayCell` for custom designs, React Native, or unique layouts.

```tsx
import {
  useNepaliCalendar,
  convertBStoAD,
  convertADtoBS,
  CalendarGrid,
  DayCell,
  CalendarTheme,
  BS_MONTH_NAMES_NP
} from "barshik-nepali-patro";

export default function CustomDatePicker() {
  const {
    year, month, grid, selected, setSelected,
    goNextMonth, goPrevMonth, goToday
  } = useNepaliCalendar({ initialYear: 2081, initialMonth: 1 });

  const handleSelect = (day) => {
    setSelected(day);
    // Optionally convert to AD for your form state
    // const adDate = convertBStoAD(day);
  };

  return (
    <div style={{ maxWidth: 440, fontFamily: "system-ui, sans-serif" }}>
      {/* Month navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <button onClick={goPrevMonth} style={{ padding: "4px 8px" }}>Prev</button>
        <span style={{ fontWeight: 500, margin: "0 16px" }}>
          {BS_MONTH_NAMES_NP[month - 1]} {year}
        </span>
        <button onClick={goNextMonth} style={{ padding: "4px 8px" }}>Next</button>
        <button onClick={goToday} style={{ padding: "4px 8px" }}>Today</button>
      </div>

      {/* Day grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, padding: 4 }}>
        {grid.map((row, rowIdx) =>
          row.map((day, colIdx) => (
            <DayCell
              key={day.bsDay}
              day={day}
              theme={{ selectedColor: "#FFFFFF", textColor: "#212121", borderColor: "#E5E7EB" }}
              isSelected={!!selected && day.bsYear === selected.bsYear && day.bsMonth === selected.bsMonth && day.bsDay === selected.bsDay}
              onPress={handleSelect}
            />
          ))
        )}
      </div>

      {/* Selected date display */}
      {selected && (
        <div style={{ marginTop: 12, fontSize: "0.9rem" }}>
          Selected: {selected.bsDay} {BS_MONTH_NAMES_NP[selected.bsMonth - 1]} {selected.bsYear}
        </div>
      )}
    </div>
  );
}
```

**Exported building blocks**:

| Export | Purpose |
|---|---|
| `useNepaliCalendar({ initialYear, initialMonth, events })` | Hook: returns `year`, `month`, `grid`, `selected`, `setSelected`, navigation (`goNextMonth`, `goPrevMonth`, `goToday`), and month change tracking |
| `CalendarGrid` | 2D array (`CalendarDay[][]`) of day cells to render |
| `DayCell` | Individual day component: `{ day, theme, isSelected, onPress }` |
| `RenderDayCallback` | `(day, defaultProps) => React.ReactNode` — fully customize day rendering |
| `CalendarTheme` | Theme tokens: `selectedColor`, `textColor`, `borderColor`, `surfaceColor`, `saturdayColor`, `holidayColor`, `eventDotColor`, etc. |
| `convertBStoAD({ bsYear, bsMonth, bsDay })` | BS → Gregorian `Date` for form submission |
| `convertADtoBS(adDate)` | Gregorian `Date` → BS `{ year, month, day }` for initializing from backend |
| `BS_MONTH_NAMES_NP` | Devanagari month names: `["बैशाख", "जेठ", ..., "chaitra"]` |
| `BS_MONTH_NAMES_EN` | English month names: `["Baisakh", "Jestha", ..., "Chaitra"]` |

## Converting Dates for Form Submission

### BS → AD (for API submission):

```tsx
import { convertBStoAD } from "barshik-nepali-patro";

const handleSubmit = (e) => {
  e.preventDefault();
  if (!selectedBSCalendarDay) return alert("Select a BS date first");
  
  const adDate = convertBStoAD(selectedBSCalendarDay);
  // adDate is a JavaScript Date object ready for your API
  console.log("Submitting AD date:", adDate.toISOString());
  
  // Send adDate to your backend, or send BS string if your API supports BS dates
};
```

### AD → BS (for pre-populating from backend):

```tsx
import { convertADtoBS } from "barshik-nepali-patro";

// When mounting form with existing date from backend
const [bsDate, setBsDate] = React.useState(() => {
  const adFromBackend = new Date("2024-03-15"); // example from your API
  return convertADtoBS(adFromBackend); // → { bsYear, bsMonth, bsDay }
});
```

## Theme Customization

```tsx
<NepaliCalendar
  theme={{
    selectedColor: "#FFFFFF",      /* selected day background */
    textColor: "#212121",          /* normal day text */
    borderColor: "#E5E7EB",        /* cell border */
    surfaceColor: "#FAFAFA",       /* calendar surface */
    saturdayColor: "#C0272D",      /* Saturday text/background */
    holidayColor: "#C0272D",       /* public holiday */
    eventDotColor: "#E8751A",      /* event dot for events without explicit color */
    headerColor: "#212121",        /* month header */
  }}
/>
```

## Adding Events/Holidays

```tsx
import { NEPALI_HOLIDAYS, CalendarEvent } from "barshik-nepali-patro";

const birthEvents: CalendarEvent[] = [
  { bsYear: 2081, bsMonth: 1, bsDay: 1, title: "My Birthday", color: "#FF5252" },
  { bsYear: 2081, bsMonth: 10, bsDay: 15, title: "Exam", color: "#2196F3" },
];

<NepaliCalendar
  initialMonth={1}
  events={birthEvents}
/>
```

Events render as colored dots on the corresponding day cells. The `color` field overrides the default `eventDotColor`.

## Accessibility Notes

- The calendar grid is keyboard-navigable (tab through days, arrow keys to navigate)
- `onMonthChange` fires when user navigates months — announce year/month changes to screen readers
- `today` cell gets `isToday={true}` flag for current date announcement
- All color contrasts follow accessible defaults (customizable via `theme`)
- `renderDay` callback receives `defaultProps { isSelected, onPress }` for custom accessible implementations

## Full API Reference (Exports)

```ts
// Core conversion
convertBStoAD({ bsYear, bsMonth, bsDay }) → Date
convertADtoBS(adDate: Date) → { bsYear: number; bsMonth: BSMonth; bsDay: number }

// Calendar state hook
useNepaliCalendar({ initialYear, initialMonth, events }) → {
  year: number, month: number, grid: CalendarDay[][], 
  selected: CalendarDay | null, setSelected: (day: CalendarDay) => void,
  goNextMonth: () => void, goPrevMonth: () => void, goToday: () => void
}

// Components
<NepaliCalendar {initialYear, initialMonth, events, theme, onDayPress, onMonthChange, renderDay} />
<CalendarGrid grid={grid} theme={theme} selected={selected} onDayPress={onDayPress} />
<DayCell day={day} theme={theme} isSelected={!!selected} onPress={onPress} />

// Types/exports
CalendarEvent { bsYear, bsMonth, bsDay, title?, color? }
CalendarDay { bsDay, bsMonth, bsYear, adDate, isSaturday, isHoliday, holidayName?, holidayNameNp?, holidayScope?, isToday, isCurrentMonth, events: CalendarEvent[] }
CalendarTheme { saturdayColor?, holidayColor?, eventDotColor?, selectedColor?, todayColor?, textColor?, headerColor?, surfaceColor?, borderColor? }
BS_MONTH_NAMES_NP, BS_MONTH_NAMES_EN
NEPALI_HOLIDAYS: CalendarEvent[] (pre-defined national holidays)
```

## Browser / Runtime Support

- **React 18+** (peer dependency)
- **React Native 0.72+** (peer dependency, optional via `peerDependenciesMeta`)
- Modern browsers supporting ES modules (the package uses ESM)
- No DOM dependencies — works in React Native out of the box
- Server-side rendering (Next.js, Remix, etc.) — all calculations are pure JS, no browser APIs

## Development & Testing

```bash
# Install dev dependencies
npm install

# Typecheck
npm run typecheck

# Lint
npm run lint

# Run tests
npm test

# Test with coverage
npm run test:coverage

# Build for publish
npm run build
```

## When to Choose Which Approach

| Choose `<NepaliCalendar />` (component) when... | Choose `useNepaliCalendar` + grid (hook) when... |
|---|---|
| Standard form date picker | Custom calendar UI design |
| Rapid prototyping | React Native integration |
| No unique day rendering needed | Full control over cell appearance |
| Default theme suffices | Need custom colors/interactions |
| Simpler codebase preferred | Willingness for more code in exchange for flexibility |

## Quick Checklist

- [ ] `npm i barshik-nepali-patro`
- [ ] Import `NepaliCalendar` or `useNepaliCalendar` + conversion hooks
- [ ] Set `initialYear`/`initialMonth` or rely on defaults
- [ ] Wire `onDayPress` to capture selected BS day
- [ ] Display selected date in input (BS string or converted AD)
- [ ] On form submit, `convertBStoAD(selected)` → send to API
- [ ] (Optional) Pass `events` prop for birthday/holiday overlays
- [ ] (Optional) Customize via `theme` prop
- [ ] Run `npm test` to verify integration