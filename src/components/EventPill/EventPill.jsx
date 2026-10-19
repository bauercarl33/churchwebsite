import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";

import "./event-pill.css";
import { featuredEvent, isEventPromoted } from "../../data/event";

/** Compact link to the featured event, shown above the home page title. */
const EventPill = ({ event = featuredEvent, now }) => {
  if (!isEventPromoted(event, now)) return null;
  return (
    <Link
      to={event.path}
      className="event-pill"
      aria-label={`${event.dateLabel}: ${event.title}. Event details`}
    >
      <FaRegCalendarAlt className="event-pill-icon" aria-hidden="true" />
      <span>
        <span className="event-pill-date">{event.shortDateLabel}</span>
        <span aria-hidden="true"> · </span>
        {event.title}
      </span>
      <span aria-hidden="true">→</span>
    </Link>
  );
};

export default EventPill;
