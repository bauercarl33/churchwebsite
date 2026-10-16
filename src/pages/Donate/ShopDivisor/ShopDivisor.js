import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

import "./ShopDivisor.css";

const SCROLL_AMOUNT = 200;

/** Horizontally scrollable category filter for the donation items. */
const ShopDivisor = ({ categories = [], onCategorySelect }) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const [showArrows, setShowArrows] = useState(false);
  const scrollRef = useRef(null);

  const selectCategory = (category) => {
    setCurrentCategory(category);
    onCategorySelect(category);
  };

  useEffect(() => {
    const handleResize = () => {
      if (!scrollRef.current) return;
      setShowArrows(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  const scrollBy = (left) => scrollRef.current?.scrollBy({ left, behavior: "smooth" });

  return (
    <div className="shopDivisor">
      <div className="tab-scroll-container">
        {showArrows && (
          <button
            className="scroll-arrow left"
            onClick={() => scrollBy(-SCROLL_AMOUNT)}
            aria-label="Scroll categories left"
          >
            <FaChevronLeft />
          </button>
        )}
        <div className="tab-list-wrapper" ref={scrollRef}>
          <ul className="tab-list" role="tablist" aria-label="Donation categories">
            {["All", ...categories].map((category) => {
              const isCurrent = currentCategory === category;
              return (
                <li
                  key={category}
                  role="tab"
                  tabIndex={0}
                  aria-selected={isCurrent}
                  className={`tab-item ${isCurrent ? "active" : ""}`}
                  data-current={isCurrent}
                  onClick={() => selectCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      selectCategory(category);
                    }
                  }}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        {showArrows && (
          <button
            className="scroll-arrow right"
            onClick={() => scrollBy(SCROLL_AMOUNT)}
            aria-label="Scroll categories right"
          >
            <FaChevronRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default ShopDivisor;
