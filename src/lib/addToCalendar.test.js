import { googleCalendarUrl, icsFile, nextDay } from "./addToCalendar";

const event = {
  id: "consecration-2026",
  title: "Consecration of our new church",
  startDate: "2026-11-13",
  endDate: "2026-11-14",
  location: "Saint Mary Orthodox Church, 200 Monaco Dr., Cedar Park, TX 78613",
};

describe("addToCalendar", () => {
  it("computes the exclusive end date, across month ends", () => {
    expect(nextDay("2026-11-14")).toBe("2026-11-15");
    expect(nextDay("2026-11-30")).toBe("2026-12-01");
    expect(nextDay("2026-12-31")).toBe("2027-01-01");
  });

  it("builds an all-day Google Calendar link", () => {
    const url = new URL(googleCalendarUrl(event));
    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("dates")).toBe("20261113/20261115");
    expect(url.searchParams.get("text")).toBe("Consecration of our new church");
    expect(url.searchParams.get("location")).toContain("200 Monaco Dr.");
  });

  it("builds a valid all-day .ics file", () => {
    const ics = icsFile(event, new Date("2026-10-20T12:00:00Z"));
    expect(ics).toContain("DTSTART;VALUE=DATE:20261113");
    expect(ics).toContain("DTEND;VALUE=DATE:20261115");
    expect(ics).toContain("DTSTAMP:20261020T120000Z");
    // Commas must be escaped in iCalendar text.
    expect(ics).toContain("LOCATION:Saint Mary Orthodox Church\\, 200 Monaco Dr.\\, Cedar Park");
    expect(ics.split("\r\n")[0]).toBe("BEGIN:VCALENDAR");
    expect(ics.endsWith("END:VCALENDAR\r\n")).toBe(true);
  });

  it("folds long lines to at most 75 octets", () => {
    const ics = icsFile({ ...event, details: "A long description. ".repeat(20) });
    const lines = ics.split("\r\n");
    lines.forEach((line) => expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75));
    // Unfolding restores the original text.
    expect(ics.replace(/\r\n /g, "")).toContain("DESCRIPTION:" + "A long description. ".repeat(20).trim());
  });
});
