import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

import "./announcement-bar.css";

/**
 * One-line banner shown above the navbar (inside the fixed header) to
 * promote the featured event. Its height is fixed (see
 * --announcement-height in index.css) so the page can be offset by it.
 */
const AnnouncementBar = ({ event, onDismiss }) => {
  return (
    <aside className="announcement" aria-label="Announcement">
      <p className="announcement-text">
        <span className="long">
          You&rsquo;re invited: {event.title} · {event.dateLabel}
        </span>
        <span className="short">
          {event.shortTitle} · {event.shortDateLabel}
        </span>
        <Link to={event.path} className="announcement-link">
          Details<span aria-hidden="true"> →</span>
        </Link>
      </p>
      <button
        type="button"
        className="announcement-close"
        onClick={onDismiss}
        aria-label="Close announcement"
      >
        <FaTimes aria-hidden="true" />
      </button>
    </aside>
  );
};

export default AnnouncementBar;
