import React from "react";
import { Link } from "react-router-dom";

import "./ShopDivisor.css";
import { FaChevronRight } from "react-icons/fa6";
import SearchBar from "./SearchBar/SearchBar";
import CategorySelector from "./CategorySelector/CategorySelector";

const ShopDivisor = () => {
  return (
    <div className="shopDivisor">
      <div className="container">
        <div className="card">
          <SearchBar />
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
      <CategorySelector />
    </div>
  );
};

export default ShopDivisor;
