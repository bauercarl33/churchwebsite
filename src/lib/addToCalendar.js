// "Add to calendar" helpers for all-day events (no times are published).

const compact = (isoDate) => isoDate.replaceAll("-", "");

/** The day after an ISO date (all-day end dates are exclusive). */
export const nextDay = (isoDate) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  const next = new Date(Date.UTC(y, m - 1, d + 1));
  return next.toISOString().slice(0, 10);
};

/** Google Calendar "create event" link. */
export function googleCalendarUrl({ title, startDate, endDate, location, details = "" }) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${compact(startDate)}/${compact(nextDay(endDate))}`,
    location,
    details,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

const escapeIcs = (text) =>
  text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

// RFC 5545 limits content lines to 75 octets; longer lines are folded onto
// continuation lines that start with a space.
const fold = (line) => {
  const out = [];
  let rest = line;
  while (new TextEncoder().encode(rest).length > 75) {
    let cut = 74;
    while (new TextEncoder().encode(rest.slice(0, cut)).length > 74) cut--;
    out.push(rest.slice(0, cut));
    rest = " " + rest.slice(cut);
  }
  out.push(rest);
  return out.join("\r\n");
};

/** An .ics file (Apple Calendar, Outlook, …) for an all-day event. */
export function icsFile({ id, title, startDate, endDate, location, details = "", url = "" }, now = new Date()) {
  const stamp = now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//St. Mary Orthodox Church//saintmaryaustin.org//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${id}@saintmaryaustin.org`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(startDate)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(endDate))}`,
    `SUMMARY:${escapeIcs(title)}`,
    `LOCATION:${escapeIcs(location)}`,
    ...(details ? [`DESCRIPTION:${escapeIcs(details)}`] : []),
    ...(url ? [`URL:${url}`] : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .map(fold)
    .join("\r\n")
    .concat("\r\n");
}
