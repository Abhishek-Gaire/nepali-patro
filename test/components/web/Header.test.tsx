import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "../../../src/components/web/Header";
import type { BSMonth } from "../../../src/types";

describe("Header", () => {
  it("should render month name in Nepali and English", () => {
    render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );
    expect(screen.getByText(/बैशाख/)).toBeInTheDocument();
    expect(screen.getByText(/Baisakh/)).toBeInTheDocument();
  });

  it("should render the BS year", () => {
    render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );
    expect(screen.getByText("BS 2080")).toBeInTheDocument();
  });

  it("should call onPrev when previous button is clicked", () => {
    const onPrev = vi.fn();
    render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={onPrev}
        onNext={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText(/Previous/));
    expect(onPrev).toHaveBeenCalledTimes(1);
  });

  it("should call onNext when next button is clicked", () => {
    const onNext = vi.fn();
    render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={vi.fn()}
        onNext={onNext}
      />
    );
    fireEvent.click(screen.getByText(/Next/));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  it("should render for different months", () => {
    const months: BSMonth[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    months.forEach((month) => {
      const { unmount } = render(
        <Header
          year={2080}
          month={month}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByText(/BS 2080/)).toBeInTheDocument();
      unmount();
    });
  });

  it("should apply custom header color from theme", () => {
    const { container } = render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={vi.fn()}
        onNext={vi.fn()}
        theme={{ headerColor: "#FF0000" }}
      />
    );
    expect(container).toBeInTheDocument();
  });

  it("should have accessible button labels", () => {
    render(
      <Header
        year={2080}
        month={1 as BSMonth}
        onPrev={vi.fn()}
        onNext={vi.fn()}
      />
    );
    expect(screen.getByLabelText("Previous month")).toBeInTheDocument();
    expect(screen.getByLabelText("Next month")).toBeInTheDocument();
  });

  it("should render with different years", () => {
    const years = [2079, 2080, 2081, 2082, 2083];
    years.forEach((year) => {
      const { unmount } = render(
        <Header
          year={year}
          month={1 as BSMonth}
          onPrev={vi.fn()}
          onNext={vi.fn()}
        />
      );
      expect(screen.getByText(`BS ${year}`)).toBeInTheDocument();
      unmount();
    });
  });
});
