import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Donate, { uniqueCategories } from "./Donate";
import { filterByCategory, itemProgress, buildDonationEmail } from "./ItemsGrid/ItemsGrid";
import { mockFetch, renderWithProviders } from "../../test/utils";

const items = [
  { itemName: "icon1", displayName: "Icon of St. Mary", category: "Iconography", cost: 100, quantity: 1, progress: 25, imgUrl: "a.png" },
  { itemName: "lamp", displayName: "Oil Lamp", category: "Fixtures", cost: 50, quantity: 4, progress: 200, imgUrl: "b.png" },
  { itemName: "bench", displayName: "Bench", category: "Fixtures", cost: 300, quantity: 2, progress: 300, imgUrl: "c.png" },
];

describe("donation helpers", () => {
  it("lists unique categories in first-seen order, skipping blanks", () => {
    expect(uniqueCategories([...items, { category: "" }, { category: undefined }])).toEqual([
      "Iconography",
      "Fixtures",
    ]);
  });

  it("filters by category, with All returning everything", () => {
    expect(filterByCategory(items, "All")).toHaveLength(3);
    expect(filterByCategory(items, "Fixtures").map((i) => i.itemName)).toEqual(["lamp", "bench"]);
  });

  it("computes remaining amount and funded state", () => {
    expect(itemProgress(items[0])).toEqual({ remaining: 75, isFunded: false, percent: 25 });
    expect(itemProgress(items[1])).toMatchObject({ remaining: 0, isFunded: true });
    expect(itemProgress(items[2])).toMatchObject({ remaining: 300, isFunded: false, percent: 50 });
  });

  it("builds the notification email body", () => {
    const body = buildDonationEmail(
      { email: "", phone: "5125550100", amount: "20", message: "God bless" },
      "Venmo",
      items[0],
      new Date(2026, 10, 13, 10, 0)
    );
    expect(body).toContain("Benefactor Email: anonymous");
    expect(body).toContain("Payment Type: Venmo");
    expect(body).toContain("Donation Item: Icon of St. Mary");
  });
});

describe("Donate page", () => {
  let fetchMock;
  beforeEach(() => {
    fetchMock = mockFetch(() => ({ body: { items } }));
  });
  afterEach(() => fetchMock.restore());

  it("shows all items by default and filters by category", async () => {
    renderWithProviders(<Donate />, { route: "/donate" });

    // Regression: the initial category used to be ["All"] (an array), which
    // only worked thanks to loose == comparison.
    expect(await screen.findByText("Icon of St. Mary")).toBeInTheDocument();
    expect(screen.getByText("Oil Lamp")).toBeInTheDocument();
    expect(screen.getByText("$75 left!")).toBeInTheDocument();
    expect(screen.getByText("Item Purchased!")).toBeInTheDocument();

    const tabs = screen.getByRole("tablist", { name: "Donation categories" });
    userEvent.click(within(tabs).getByRole("tab", { name: "Fixtures" }));

    expect(within(tabs).getByRole("tab", { name: "Fixtures" })).toHaveAttribute("aria-selected", "true");
    expect(screen.queryByText("Icon of St. Mary")).not.toBeInTheDocument();
    expect(screen.getByText("Bench")).toBeInTheDocument();
  });

  it("switches the visible QR code and keeps Zelle non-clickable", async () => {
    renderWithProviders(<Donate />, { route: "/donate" });
    await screen.findByText("Icon of St. Mary");

    const cashapp = screen.getByAltText("Cashapp QR code");
    expect(cashapp.closest(".qr")).toHaveClass("selected");
    expect(cashapp.closest("a")).toHaveAttribute("href", expect.stringContaining("cash.app"));

    userEvent.click(screen.getByRole("button", { name: "Zelle" }));
    const zelle = screen.getByAltText("Zelle QR code");
    expect(zelle.closest(".qr")).toHaveClass("selected");
    expect(zelle.closest("a")).toBeNull();
  });

  it("opens the item modal without placeholder description text", async () => {
    renderWithProviders(<Donate />, { route: "/donate" });
    userEvent.click(await screen.findByText("Oil Lamp"));
    const dialog = screen.getByRole("dialog", { name: "Oil Lamp" });
    expect(within(dialog).queryByText(/Very nice item/)).not.toBeInTheDocument();
    expect(within(dialog).getByLabelText("Donation amount")).toBeInTheDocument();
  });

  it("validates the donation form before showing a payment QR", async () => {
    renderWithProviders(<Donate />, { route: "/donate" });
    userEvent.click(await screen.findByText("Oil Lamp"));
    const dialog = screen.getByRole("dialog", { name: "Oil Lamp" });

    userEvent.click(within(dialog).getByRole("button", { name: "Venmo" }));
    expect(within(dialog).getByText("Please enter a valid donation amount")).toBeInTheDocument();
    expect(within(dialog).getByText("Please enter a valid email address")).toBeInTheDocument();
    expect(within(dialog).getByText("Please enter a valid phone number")).toBeInTheDocument();
  });
});
