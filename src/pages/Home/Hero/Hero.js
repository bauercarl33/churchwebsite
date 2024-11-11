import React from "react";
import { Link } from "react-router-dom";

import "./hero.css";

const Hero = () => {
  const donationLink =
    "https://give.tithe.ly/?formId=e10072ba-83d2-456a-99c7-dad8b23177f0";

  return (
    <div className="hero">
      <div className="title-wrapper">
        <div className="title">
          <h4>
            St. Mary<span className="highlight">Orthodox Church</span>
          </h4>
          <p>An Orthodox Christian parish in Austin, TX.</p>
          <div className="buttons">
            <Link
              to='/donate'
              aria-label="To donation page."
              className="button filled"
            >
              Donate
            </Link>
            <Link to="/visitors" className="button empty">
              Visitors
            </Link>
          </div>
        </div>
      </div>
      <div className="image-wrapper">
        <img
          src={
            "https://saintmarychurch.s3.us-east-1.amazonaws.com/images/1CaD4tWqWQYvnOpsJLnXmyoEgjNa6NJhn"
          }
          alt="Icon of the Nativity of the Theotokos"
        />
      </div>
    </div>
  );
};

export default Hero;
