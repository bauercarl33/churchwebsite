import { useCallback, useState } from "react";

import { featuredEvent, isEventPromoted } from "../../data/event";

const storageKey = (event) => `announcement-dismissed:${event.id}`;

// localStorage can be unavailable (private mode, blocked storage).
const readDismissed = (event) => {
  try {
    return window.localStorage.getItem(storageKey(event)) === "1";
  } catch {
    return false;
  }
};

/**
 * Whether the announcement bar is showing, and a function to close it.
 * The "closed" choice is remembered per event in the visitor's browser.
 * It is read synchronously so the page never renders with the bar and then
 * removes it (which would make the layout jump).
 */
export function useAnnouncement(event = featuredEvent, now = new Date()) {
  const promoted = isEventPromoted(event, now);
  const [dismissed, setDismissed] = useState(() => promoted && readDismissed(event));

  const dismiss = useCallback(() => {
    setDismissed(true);
    try {
      window.localStorage.setItem(storageKey(event), "1");
    } catch {
      // Not remembered, but still hidden for this visit.
    }
  }, [event]);

  return { event, visible: promoted && !dismissed, dismiss };
}
