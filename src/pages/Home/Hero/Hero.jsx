import { Link } from "react-router-dom";

import "./hero.css";
import Photo from "../../../components/Photo/Photo";
import EventPill from "../../../components/EventPill/EventPill";
import { SIZES } from "../../../images/photos";

const Hero = () => {
  return (
    <div className="hero">
      <div className='decoration' />
      <div className="title-wrapper">
        <div className="title">
          <EventPill />
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
        <Photo
          name="nativity-icon"
          sizes={SIZES.hero}
          alt="Icon of the Nativity of the Theotokos"
          loading="eager"
          fetchpriority="high"
          withDimensions
        />
      </div>
    </div>
  );
};

export default Hero;
