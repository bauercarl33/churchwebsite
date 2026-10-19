import { screen, waitFor } from "@testing-library/react";

import { renderApp } from "./test/utils";

describe("App routing", () => {
  it("renders the home page with navigation and footer", () => {
    renderApp("/");
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: /St\. Mary/ })).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toHaveTextContent("St. Mary Orthodox Church");
  });

  it("marks the current page in the navbar", async () => {
    renderApp("/visitors");
    const link = screen.getByRole("link", { name: /Visitors/, current: "page" });
    expect(link).toHaveAttribute("href", "/visitors");
    // The page itself is lazy-loaded.
    expect(
      await screen.findByRole("button", { name: /Do I have to be Romanian/ })
    ).toBeInTheDocument();
  });

  it("redirects the legacy /donateCopy URL to /donate", async () => {
    const original = global.fetch;
    global.fetch = async () => ({ ok: true, status: 200, json: async () => ({ body: { items: [] } }) });
    try {
      renderApp("/donateCopy");
      await waitFor(() =>
        expect(screen.getByText("Click here to donate with Tithely.")).toBeInTheDocument()
      );
    } finally {
      global.fetch = original;
    }
  });

  it("has accessible names for logo images", () => {
    renderApp("/");
    expect(screen.getAllByAltText("St. Mary Orthodox Church")).toHaveLength(2);
  });
});

describe("featured event promotion", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-10-20T12:00:00-05:00"));
  });
  afterEach(() => vi.useRealTimers());

  it("shows the announcement bar and offsets the page for it", () => {
    const { container } = renderApp("/");
    expect(screen.getByRole("complementary", { name: "Announcement" })).toBeInTheDocument();
    expect(container.querySelector(".app")).toHaveClass("has-announcement");
    // Hero link to the event page.
    expect(
      screen.getByRole("link", { name: "November 13–15: Consecration of our new church. Event details" })
    ).toHaveAttribute("href", "/consecration");
  });

  it("removes the offset when the bar is closed", async () => {
    const { container } = renderApp("/");
    screen.getByRole("button", { name: "Close announcement" }).click();
    await waitFor(() =>
      expect(container.querySelector(".app")).not.toHaveClass("has-announcement")
    );
  });

  it("is gone after the event", () => {
    vi.setSystemTime(new Date("2026-11-16T08:00:00-06:00"));
    const { container } = renderApp("/");
    expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
    expect(container.querySelector(".app")).not.toHaveClass("has-announcement");
    expect(screen.queryByRole("link", { name: /Consecration/ })).not.toBeInTheDocument();
  });
});
