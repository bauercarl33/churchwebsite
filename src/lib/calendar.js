// Pure helpers for the calendar page. Kept free of React so they can be tested.

const pad = (n) => String(n).padStart(2, "0");

/** YYYY-MM-DD in local time. */
export function toDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * The window of events the calendar loads: from the first day of the month
 * before `targetDate` to three months after that.
 */
export function getCalendarRange(targetDate) {
  const start = new Date(targetDate.getFullYear(), targetDate.getMonth() - 1, 1);
  const end = new Date(start.getFullYear(), start.getMonth() + 3, 1);
  return { start, end };
}

/** "YYYY-MM-DD HH:mm" in local time — the format Schedule-X expects. */
export function formatScheduleXDate(date) {
  return `${toDateString(date)} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Convert Google Calendar API items into Schedule-X events. */
export function toScheduleXEvents(items) {
  return items.map((item) => ({
    id: item.id,
    start: formatScheduleXDate(new Date(item.start.dateTime)),
    end: formatScheduleXDate(new Date(item.end.dateTime)),
    title: item.summary,
    calendarId: "church",
  }));
}
