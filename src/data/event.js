// The event currently promoted site-wide (announcement bar above the navbar
// and a link in the home page hero). Edit this file to change the wording or
// dates. To remove the promotion entirely, set `featuredEvent` to null (or
// delete this file along with AnnouncementBar and EventPill).

export const featuredEvent = {
  // Used to remember a visitor closing the banner; change it for a new event.
  id: "consecration-2026",
  title: "Consecration of our new church",
  shortTitle: "Consecration",
  dateLabel: "November 13–14",
  shortDateLabel: "Nov 13–14",
  fullDateLabel: "November 13–14, 2026",
  // All-day dates for "Add to calendar" (end is the last day, inclusive).
  startDate: "2026-11-13",
  endDate: "2026-11-14",
  location: "Saint Mary Orthodox Church, 200 Monaco Dr., Cedar Park, TX 78613",
  mapLink: "https://maps.app.goo.gl/fZGhZrtWCDrdrJtY7",
  path: "/consecration",
  // Hidden automatically from this moment on (Central time).
  showUntil: "2026-11-15T00:00:00-06:00",
  // Production builds only show the promotion while this is true. The dev
  // server (`npm start`) always shows it so it can be reviewed.
  live: true,
};

/** Whether `event` should be promoted at `now`. */
export function isEventPromoted(event, now = new Date(), isDev = import.meta.env.DEV) {
  if (!event) return false;
  if (!event.live && !isDev) return false;
  return now < new Date(event.showUntil);
}
