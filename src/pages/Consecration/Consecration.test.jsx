import { screen, within } from "@testing-library/react";

import { renderApp } from "../../test/utils";

describe("Consecration page", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-20T12:00:00-05:00"));
  });
  afterEach(() => vi.useRealTimers());

  it("shows the event headline, date and address", async () => {
    renderApp("/consecration");
    expect(
      await screen.findByRole("heading", { level: 1, name: "Consecration of our new church" })
    ).toBeInTheDocument();
    expect(screen.getAllByText("November 13–14, 2026").length).toBeGreaterThan(0);
    const where = screen.getByRole("heading", { name: "Where" }).closest(".c-card");
    expect(within(where).getByText("200 Monaco Dr., Cedar Park, TX 78613")).toBeInTheDocument();
    expect(document.title).toContain("Consecration of our new church");
  });

  it("offers directions, calendar links, parking maps and contact", async () => {
    renderApp("/consecration");
    await screen.findByRole("heading", { level: 1 });
    expect(screen.getAllByRole("link", { name: /Get directions/ })[0]).toHaveAttribute(
      "href",
      "https://maps.app.goo.gl/fZGhZrtWCDrdrJtY7"
    );
    expect(screen.getByRole("link", { name: /Google Calendar/ }).getAttribute("href")).toContain(
      "dates=20261113%2F20261115"
    );
    expect(screen.getByRole("button", { name: /Apple \/ Outlook/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Parking" })).toBeInTheDocument();
    expect(screen.getByAltText(/street parking/)).toBeInTheDocument();
    expect(screen.getByAltText(/overflow parking lot/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /737/ })).toHaveAttribute("href", "tel:+17374004458");
    expect(screen.getByRole("link", { name: "Visitor guide" })).toHaveAttribute("href", "/visitors");
  });

  it("does not show the announcement bar on the event page itself", async () => {
    renderApp("/consecration");
    await screen.findByRole("heading", { level: 1 });
    expect(screen.queryByRole("complementary", { name: "Announcement" })).not.toBeInTheDocument();
  });
});
