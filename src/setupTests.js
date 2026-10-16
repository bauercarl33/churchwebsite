// jest-dom adds custom matchers for asserting on DOM nodes,
// e.g. expect(element).toHaveTextContent(/react/i).
import "@testing-library/jest-dom";

// jsdom does not implement matchMedia; provide a minimal desktop-sized stub.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  });
}

// jsdom does not implement scrollTo.
window.scrollTo = () => {};
