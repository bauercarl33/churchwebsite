import React, { useState } from "react";
import "../css/FolderTabs.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";

function FolderTabs() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    "Home Page",
    "Bulletin",
    "Calendars",
    "Photo Album",
    "About Us",
    "FAQs",
  ];
  const navigate = useNavigate();

  const handleTouch = (index, tab) => {
    setActiveTab(index);
    if (tab === "Home Page") {
      navigate("/");
    } else if (tab === "Bulletin") {
      navigate("/bulletin");
    } else if (tab === "Calendars") {
      navigate("/calendars");
    } else if (tab === "Photo Album") {
      navigate("/photo-album");
    } else if (tab === "About Us") {
      navigate("/about-us");
    } else if (tab === "FAQs") {
      navigate("/frequently-asked-questions");
    }
  };
  return (
    <div className="content">
      <div className="tabBar">
        {tabs.map((tab, index) => (
          <a
            key={index}
            className={`tabBar-tab ${activeTab === index ? "is-active" : ""}`}
            onClick={() => {
              handleTouch(index, tab);
            }}
          >
            {tab}
          </a>
        ))}
      </div>
    </div>
  );
}

export default FolderTabs;
