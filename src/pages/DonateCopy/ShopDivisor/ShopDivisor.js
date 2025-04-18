import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import "./ShopDivisor.css";
import { FaChevronRight } from "react-icons/fa6";
import SearchBar from "./SearchBar/SearchBar";
import CategorySelector from "./CategorySelector/CategorySelector";

const ShopDivisor = ({ categories, onCategorySelect }) => {
  const [localCategories, setLocalCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("All");

  const localCatSelect = (category) => {
    onCategorySelect(category);
    setCurrentCategory(category);
  };

  useEffect(() => {
    if (categories && categories.length > 0) {
      setLocalCategories(categories);
    }
  }, [categories]);
  return (
    <div className="shopDivisor">
      <SearchBar />
      <div className="container">
        <div className="card">
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
          <Link to="/calendar" aria-label="Church calendar">
            Calendar
            <span>
              <FaChevronRight size={12} />
            </span>
          </Link>
        </div>
      </div>
      <div class="section-with-margin section-with-padding section-four">
        <ul class="tab-list" role="navigation">
          <li
            role="menuitem"
            class="tab-item tab-link"
            data-career=""
            data-current={currentCategory === "All"}
            onClick={() => {
              localCatSelect("All");
            }}
          >
            All
          </li>
          {localCategories.map((category) => (
            <div>
              <li
                role="menuitem"
                class="tab-item tab-link"
                data-career="Design"
                data-current={currentCategory === category}
                onClick={() => {
                  localCatSelect(category);
                }}
              >
                {category}
              </li>
            </div>
          ))}
        </ul>
        <ul class="career-list" id="jobListing"></ul>
      </div>
    </div>
  );
};

export default ShopDivisor;
