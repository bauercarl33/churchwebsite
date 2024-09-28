import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function SimpleSlider() {
  const settings = {
    dots: true, // Show navigation dots
    infinite: true, // Loop through the images infinitely
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Automatically scroll through images
    autoplaySpeed: 7000, // Time between slides in milliseconds
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };
  return (
    <div className="slider-container">
      <Slider {...settings} style={imageStyle}>
        <div style={{ width: "100%", height: "auto" }}>
          <img
            style={imageStyle}
            src="/pictures/pic5-cropped.jpeg"
            alt="Image 1"
          />
        </div>
        <div style={{ width: "100%", height: "auto" }}>
          <img
            style={imageStyle}
            src="/pictures/pic3-cropped.jpeg"
            alt="Image 2"
          />
        </div>
        <div style={{ width: "100%", height: "auto" }}>
          <img
            style={imageStyle}
            src="/pictures/pic2-cropped.jpeg"
            alt="Image 3"
          />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
