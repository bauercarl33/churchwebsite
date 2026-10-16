import "./infinite-slider.css";
import Photo from "../../../components/Photo/Photo";
import { SIZES } from "../../../images/photos";

// The photo list is rendered twice so the CSS animation can loop seamlessly.
// The second copy is decorative, so it is hidden from assistive technology.
// Photos load eagerly: lazy-loading would leave blanks as photos slide into
// view horizontally.
const InfiniteSlider = ({ images, reverse }) => {
  return (
    <div className="infinite-wrapper">
      <div className={reverse ? "infinite-slider reverse" : "infinite-slider"}>
        {images.map((name) => (
          <Photo
            name={name}
            key={name}
            sizes={SIZES.marquee}
            alt="Our community"
            loading="eager"
          />
        ))}
        {images.map((name) => (
          <Photo
            name={name}
            key={`${name}-copy`}
            sizes={SIZES.marquee}
            alt=""
            aria-hidden="true"
            loading="eager"
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;
