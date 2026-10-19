import { featuredEvent, isEventPromoted } from "./event";

const event = { ...featuredEvent, showUntil: "2026-11-15T00:00:00-06:00", live: true };

describe("isEventPromoted", () => {
  it("promotes the event until showUntil", () => {
    expect(isEventPromoted(event, new Date("2026-10-20T12:00:00-05:00"), false)).toBe(true);
    expect(isEventPromoted(event, new Date("2026-11-14T23:59:00-06:00"), false)).toBe(true);
  });

  it("stops at showUntil (Central time)", () => {
    expect(isEventPromoted(event, new Date("2026-11-15T00:00:00-06:00"), false)).toBe(false);
    expect(isEventPromoted(event, new Date("2026-12-01T00:00:00-06:00"), false)).toBe(false);
  });

  it("is hidden in production builds until the event is marked live", () => {
    const draft = { ...event, live: false };
    const before = new Date("2026-10-20T12:00:00-05:00");
    expect(isEventPromoted(draft, before, false)).toBe(false);
    expect(isEventPromoted(draft, before, true)).toBe(true); // dev server preview
  });

  it("handles no featured event", () => {
    expect(isEventPromoted(null)).toBe(false);
  });
});
