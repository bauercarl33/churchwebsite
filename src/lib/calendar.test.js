import {
  formatScheduleXDate,
  getCalendarRange,
  toDateString,
  toScheduleXEvents,
} from "./calendar";

describe("getCalendarRange", () => {
  it("starts on the first of the previous month and spans three months", () => {
    const { start, end } = getCalendarRange(new Date(2026, 9, 16)); // Oct 16 2026
    expect(toDateString(start)).toBe("2026-09-01");
    expect(toDateString(end)).toBe("2026-12-01");
  });

  it("crosses year boundaries", () => {
    const { start, end } = getCalendarRange(new Date(2026, 0, 31)); // Jan 31 2026
    expect(toDateString(start)).toBe("2025-12-01");
    expect(toDateString(end)).toBe("2026-03-01");
  });
});

describe("formatScheduleXDate", () => {
  it("pads month, day, hour and minute", () => {
    expect(formatScheduleXDate(new Date(2026, 2, 5, 9, 7))).toBe("2026-03-05 09:07");
  });
});

describe("toScheduleXEvents", () => {
  it("maps Google Calendar items to Schedule-X events", () => {
    const start = new Date(2026, 10, 13, 10, 30);
    const end = new Date(2026, 10, 13, 12, 0);
    const events = toScheduleXEvents([
      {
        id: "abc",
        summary: "Divine Liturgy",
        start: { dateTime: start.toISOString() },
        end: { dateTime: end.toISOString() },
      },
    ]);
    expect(events).toEqual([
      {
        id: "abc",
        title: "Divine Liturgy",
        start: "2026-11-13 10:30",
        end: "2026-11-13 12:00",
        calendarId: "church",
      },
    ]);
  });
});
