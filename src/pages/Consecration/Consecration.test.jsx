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
    expect(screen.getAllByText("November 13–15, 2026").length).toBeGreaterThan(0);
    const where = screen.getByRole("heading", { name: "Where" }).closest(".c-card");
    expect(within(where).getByText("200 Monaco Drive, Cedar Park, TX 78613")).toBeInTheDocument();
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
      "dates=20261113%2F20261116"
    );
    expect(screen.getByRole("button", { name: /Apple \/ Outlook/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Parking & transportation" })).toBeInTheDocument();
    expect(screen.getByText(/dedicated bus will run back and forth/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "2121 S Bell Blvd, Cedar Park, TX 78613" })).toBeInTheDocument();
    expect(screen.getByAltText(/parking along Monaco Dr/)).toBeInTheDocument();
    expect(screen.getByAltText(/overflow parking lot/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /737/ })).toHaveAttribute("href", "tel:+17374004458");
    expect(screen.getByRole("link", { name: "Visitor guide" })).toHaveAttribute("href", "/visitors");
  });

  it("does not show the announcement bar on the event page itself", async () => {
    renderApp("/consecration");
    await screen.findByRole("heading", { level: 1 });
    expect(screen.queryByRole("complementary", { name: "Announcement" })).not.toBeInTheDocument();
  });

  it("lists the full weekend program with the consecration service highlighted", async () => {
    renderApp("/consecration");
    await screen.findByRole("heading", { level: 1 });
    const saturday = screen.getByRole("region", { name: /Saturday/ });
    const item = within(saturday).getByText("Consecration Service of the Church").closest("li");
    expect(item).toHaveClass("highlight");
    expect(within(item).getByText("9:00 AM")).toHaveAttribute("datetime", "2026-11-14T09:00");
    expect(within(saturday).getByText("No dinner on Saturday evening.")).toBeInTheDocument();
    const friday = screen.getByRole("region", { name: /Friday/ });
    expect(within(friday).getByText(/Anastasios Byzantine Chant Group/)).toBeInTheDocument();
    const sunday = screen.getByRole("region", { name: /Sunday/ });
    expect(within(sunday).getAllByRole("listitem")).toHaveLength(4);
  });

  it("shows the hotel with the group rate", async () => {
    renderApp("/consecration");
    await screen.findByRole("heading", { level: 1 });
    const hotel = screen.getByRole("heading", { name: "Hotel" }).closest(".c-card");
    expect(hotel).toHaveTextContent("AVID");
    expect(hotel).toHaveTextContent("13830 N FM 620, Austin, TX 78717");
    expect(hotel).toHaveTextContent("Mention SAINT MARY");
    expect(hotel).toHaveTextContent("$75/room");
  });
});
