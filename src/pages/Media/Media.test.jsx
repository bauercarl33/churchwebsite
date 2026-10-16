import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";

import Media from "./Media";
import { mockFetch, renderWithProviders } from "../../test/utils";

const renderMedia = (route) =>
  renderWithProviders(
    <Routes>
      <Route path="/media" element={<Media />} />
      <Route path="/media/:name/:id" element={<Media />} />
    </Routes>,
    { route }
  );

describe("Media page", () => {
  let fetchMock;
  afterEach(() => fetchMock.restore());

  it("lists albums from the API", async () => {
    fetchMock = mockFetch(() => ({
      body: { folders: [{ id: "f1", name: "Pascha 2025", firstImageInFolder: "img1" }] },
    }));
    renderMedia("/media");
    const link = await screen.findByRole("link", { name: /Pascha 2025/ });
    expect(link).toHaveAttribute("href", "/media/Pascha 2025/f1");
    expect(screen.getByAltText("Pascha 2025")).toHaveAttribute("src", expect.stringContaining("img1"));
  });

  it("shows an error message instead of crashing when the API fails", async () => {
    fetchMock = mockFetch(() => ({ __status: 500 }));
    renderMedia("/media");
    expect(await screen.findByText(/could not be loaded/)).toBeInTheDocument();
  });

  it("shows the photos of an album", async () => {
    fetchMock = mockFetch((url) =>
      url.includes("listFileIdsInFolder/f1")
        ? { body: { files: [{ id: "p1", name: "Procession" }, { id: "p2", name: "Choir" }] } }
        : { body: { folders: [] } }
    );
    renderMedia("/media/Pascha/f1");
    expect(await screen.findByAltText("Procession")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Choir" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pascha" })).toBeInTheDocument();
  });
});
