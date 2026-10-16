import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Visitors from "./Visitors";
import { QAs } from "./QAs";

describe("Visitors FAQ accordion", () => {
  it("renders every question collapsed", () => {
    render(<Visitors />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(QAs.length);
    buttons.forEach((button) => expect(button).toHaveAttribute("aria-expanded", "false"));
  });

  it("opens one answer at a time and closes it when clicked again", () => {
    render(<Visitors />);
    const [first, second] = screen.getAllByRole("button");

    userEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(first.closest(".item")).toHaveClass("open");

    userEvent.click(second);
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");

    userEvent.click(second);
    expect(second).toHaveAttribute("aria-expanded", "false");
  });
});
