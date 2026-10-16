import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  GrHomeRounded,
  GrCircleInformation,
  GrCalendar,
  GrCamera,
} from "react-icons/gr";
import { LuDoorOpen } from "react-icons/lu";
import { FaTimes } from "react-icons/fa";

import "./navbar.css";
import AlertBar from "./AlertBar";
import logo from "../../images/logo.webp";

const pages = [
  { name: "Home", link: "/", icon: <GrHomeRounded className="icon" /> },
  { name: "About", link: "/about", icon: <GrCircleInformation className="icon" /> },
  { name: "Calendar", link: "/calendar", icon: <GrCalendar className="icon" /> },
  { name: "Media", link: "/media", icon: <GrCamera className="icon" /> },
  { name: "Visitors", link: "/visitors", icon: <LuDoorOpen className="icon" /> },
];

const MOBILE_BREAKPOINT = 960;

const Navbar = () => {
  const location = useLocation();
  const activeLink = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [navpillStyle, setNavpillStyle] = useState({ top: 0, left: 0, width: 0 });
  // Set to true to show the announcement bar above the navbar.
  const [alertActive, setAlertActive] = useState(false);

  const navRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  const updatePillPosition = useCallback((element) => {
    if (!element || !navRef.current) return;
    const rect = element.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setNavpillStyle({
      top: rect.top - navRect.top - 7,
      left: rect.left - navRect.left - 17,
      width: rect.width + 32,
    });
  }, []);

  const resetPill = useCallback(() => {
    const activeElement = navRef.current?.querySelector(".active a");
    if (activeElement) {
      updatePillPosition(activeElement);
    } else {
      // No nav item for this page (e.g. /donate): hide the pill.
      setNavpillStyle({ opacity: 0 });
    }
  }, [updatePillPosition]);

  // Scroll to top and close the mobile menu on every navigation.
  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    resetPill();
  }, [activeLink, resetPill]);

  // Lock page scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMenuOpen(false);
      resetPill();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resetPill]);

  const handleMouseEnter = (e) => {
    updatePillPosition(e.currentTarget.querySelector("a"));
  };

  return (
    <>
      {alertActive && (
        <div>
          <AlertBar active={alertActive} />
          <button
            className="closeAlertBtn"
            onClick={() => setAlertActive(false)}
            aria-label="Close announcement"
          >
            <FaTimes />
          </button>
        </div>
      )}
      <header className="navbar" style={{ top: alertActive ? "32px" : 0 }}>
        <nav ref={navRef} aria-label="Main">
          <RouterLink to="/" onClick={closeMenu} className="logo" aria-label="Home">
            <img src={logo} alt="St. Mary Orthodox Church" width="60" height="60" />
          </RouterLink>
          <div className="button-wrapper">
            <RouterLink to="/donate" id="mobile" className="button filled">
              Donate
            </RouterLink>
            <button
              type="button"
              className="hamburger"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-menu"
            >
              <span className={menuOpen ? "hamburger-icon active" : "hamburger-icon"} />
            </button>
          </div>
          <ul id="main-menu" className={menuOpen ? "active" : ""}>
            <div className="navpill" style={navpillStyle} aria-hidden="true" />
            {pages.map(({ name, link, icon }) => (
              <li
                key={name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={resetPill}
                className={activeLink === link ? "active" : ""}
              >
                <RouterLink
                  to={link}
                  onClick={closeMenu}
                  aria-current={activeLink === link ? "page" : undefined}
                >
                  {icon}
                  {name}
                </RouterLink>
              </li>
            ))}
          </ul>
          <RouterLink to="/donate" id="fullscreen" className="button filled">
            Donate
          </RouterLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
