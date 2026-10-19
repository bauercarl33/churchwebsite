import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import AnnouncementBar from "./AnnouncementBar";
import { useAnnouncement } from "./useAnnouncement";
import EventPill from "../EventPill/EventPill";
import { featuredEvent } from "../../data/event";

const event = { ...featuredEvent, id: "test-event", live: true };
const before = new Date("2026-10-20T12:00:00-05:00");
const after = new Date("2026-11-16T12:00:00-06:00");

const Harness = ({ now }) => {
  const announcement = useAnnouncement(event, now);
  return announcement.visible ? (
    <AnnouncementBar event={announcement.event} onDismiss={announcement.dismiss} />
  ) : (
    <p>no banner</p>
  );
};

const renderHarness = (now = before) =>
  render(
    <MemoryRouter>
      <Harness now={now} />
    </MemoryRouter>
  );

describe("AnnouncementBar", () => {
  beforeEach(() => window.localStorage.clear());

  it("shows the event and links to its page", () => {
    renderHarness();
    const banner = screen.getByRole("complementary", { name: "Announcement" });
    expect(banner).toHaveTextContent("Consecration of our new church");
    expect(banner).toHaveTextContent("November 13–14");
    expect(screen.getByRole("link", { name: /Details/ })).toHaveAttribute("href", "/consecration");
  });

  it("can be closed, and stays closed on the next visit", () => {
    const { unmount } = renderHarness();
    userEvent.click(screen.getByRole("button", { name: "Close announcement" }));
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(screen.getByText("no banner")).toBeInTheDocument();

    unmount();
    renderHarness();
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });

  it("is hidden after the event", () => {
    renderHarness(after);
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
  });
});

describe("EventPill", () => {
  it("links to the event page before the event", () => {
    render(
      <MemoryRouter>
        <EventPill event={event} now={before} />
      </MemoryRouter>
    );
    const link = screen.getByRole("link", { name: /Consecration of our new church/ });
    expect(link).toHaveAttribute("href", "/consecration");
    expect(link).toHaveTextContent("Nov 13–14");
  });

  it("renders nothing after the event", () => {
    const { container } = render(
      <MemoryRouter>
        <EventPill event={event} now={after} />
      </MemoryRouter>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
