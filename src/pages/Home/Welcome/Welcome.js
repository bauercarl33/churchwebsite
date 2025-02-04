import React from "react";
import { Link } from "react-router-dom";

import "./welcome.css";
import { FaChevronRight } from "react-icons/fa6";

const Welcome = () => {
  return (
    <div className="welcome">
      <div className="container">
        <div className="card">
          <h5>Temporary Location</h5>
          <p>
            13740 Research Boulevard, 1 Lake Creek Office Park Suite W, Austin,
            TX 78759
          </p>
          <a
            href="https://maps.app.goo.gl/emh2KpYtpmYaEc4o8"
            aria-label="Map to church"
            target="_blank"
          >
            Map
            <span>
              <FaChevronRight size={12} />
            </span>
          </a>
        </div>
        <div className="card">
          <h5>Divine Services</h5>
          <p>
            Vespers at 4pm every Saturday. Orthros on Sundays at 9:30am followed
            by the Divine Liturgy of St. John Chrysostom at 10:30am. Check the
            calendar for more.
          </p>
          <Link to="/calendar" aria-label="Church calendar">
            Calendar
            <span>
              <FaChevronRight size={12} />
            </span>
          </Link>
        </div>
        <div className="card">
          <h5>Visitors Welcome</h5>
          <p>
            Please come, we love visitors! If you have any questions, please see
            the FAQ.
          </p>
          <Link to="/visitors" aria-label="Frequently asked questions">
            Visitors
            <span>
              <FaChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
