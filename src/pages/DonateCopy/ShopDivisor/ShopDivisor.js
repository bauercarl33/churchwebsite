import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import SearchBar from "./SearchBar/SearchBar";

import "./ShopDivisor.css";

const ShopDivisor = ({ categories, onCategorySelect }) => {
  const [localCategories, setLocalCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);

  const localCatSelect = (category) => {
    onCategorySelect(category);
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLocalCategories(categories);
    }
  }, [categories]);
  useEffect(() => {
    const handleResize = () => {
      if (!scrollRef.current) return;
      setShowArrows(
        scrollRef.current.scrollWidth > scrollRef.current.clientWidth
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [localCategories]);
  const scrollByAmount = 200;
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -scrollByAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: scrollByAmount, behavior: "smooth" });
  };

  return (
    <div className="shopDivisor">
      <div className="tab-scroll-container">
        {showArrows && (
          <button className="scroll-arrow left" onClick={scrollLeft}>
            <FaChevronLeft />
          </button>
        )}
        <div className="tab-list-wrapper" ref={scrollRef}>
          <ul className="tab-list" role="navigation">
            <li
              className={`tab-item ${
                currentCategory === "All" ? "active" : ""
              }`}
              onClick={() => localCatSelect("All")}
            >
              All
            </li>
            {localCategories.map((category) => (
              <li
                key={category}
                className={`tab-item ${
                  currentCategory === category ? "active" : ""
                }`}
                onClick={() => localCatSelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        {showArrows && (
          <button className="scroll-arrow right" onClick={scrollRight}>
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopDivisor;
