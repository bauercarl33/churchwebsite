
import "./infinite-slider.css";
import { s3Image } from "../../../lib/api";

// The image list is rendered twice so the CSS animation can loop seamlessly.
// The second copy is decorative, so it is hidden from assistive technology.
const InfiniteSlider = ({ images, reverse }) => {
  return (
    <div className="infinite-wrapper">
      <div className={reverse ? "infinite-slider reverse" : "infinite-slider"}>
        {images.map((image) => (
          <img
            src={s3Image(image)}
            key={image}
            alt="Our community"
            decoding="async"
          />
        ))}
        {images.map((image) => (
          <img
            src={s3Image(image)}
            key={`${image}-copy`}
            alt=""
            aria-hidden="true"
            decoding="async"
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlider;
