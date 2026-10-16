import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../App";

export const createTestQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { retry: false } } });

/** Render the full app at `route` with an isolated react-query cache. */
export const renderApp = (route = "/") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App queryClient={createTestQueryClient()} />
    </MemoryRouter>
  );

/** Render a component that needs router + react-query context. */
export const renderWithProviders = (ui, { route = "/" } = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={createTestQueryClient()}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );

/**
 * Replace global fetch with `handler(url, options)` returning a JSON body,
 * or throwing / returning { status } for errors. Returns a restore function
 * and the list of calls made.
 */
export const mockFetch = (handler) => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (url, options = {}) => {
    calls.push({ url, options });
    const result = await handler(url, options);
    const status = result?.__status ?? 200;
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => result,
    };
  };
  return {
    calls,
    restore: () => {
      global.fetch = original;
    },
  };
};
