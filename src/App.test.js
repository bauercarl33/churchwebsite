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
