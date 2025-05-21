import React, { useEffect, useState, useRef } from "react";
import "./navbar.css";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  GrHomeRounded,
  GrCircleInformation,
  GrCalendar,
  GrCamera,
} from "react-icons/gr";
import { LuDoorOpen } from "react-icons/lu";

import AlertBar from "./AlertBar";
import { FaTimes } from "react-icons/fa";

import logo from "../../images/logo.png";

const Navbar = () => {
  const pages = {
    Home: {
      link: "/",
      icon: <GrHomeRounded className="icon" />,
    },
    About: {
      link: "/about",
      icon: <GrCircleInformation className="icon" />,
    },
    Calendar: {
      link: "/calendar",
      icon: <GrCalendar className="icon" />,
    },
    Media: {
      link: "/media",
      icon: <GrCamera className="icon" />,
    },
    Visitors: {
      link: "/visitors",
      icon: <LuDoorOpen className="icon" />,
    },
  };

  const location = useLocation();

  const [click, setClick] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const [navpillStyle, setnavpillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [alertActive, setAlertActive] = useState(false);

  const navRef = useRef(null);

  const closeMenu = () => {
    setClick(false);
  };

  const handleClick = () => {
    setClick(!click);
  };

  const handleLink = (link) => {
    setActiveLink(link);
    closeMenu();
  };

  useEffect(() => {
    setActiveLink(location.pathname);
    window.scroll(0, 0);
  }, [location]);

  useEffect(() => {
    if (click) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [click]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 960) {
        setClick(false);
      }

      // Recalculate the navpill position and size based on the active link on resize
      const activeElement = navRef.current?.querySelector(".active a");
      if (activeElement) {
        updatePillPosition(activeElement);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (activeLink === "/donate") {
      setnavpillStyle({ display: "none" });
      return;
    }
    const activeElement = navRef.current?.querySelector(".active a");
    if (activeElement) {
      updatePillPosition(activeElement);
    }
  }, [activeLink]);

  const updatePillPosition = (element) => {
    const rect = element.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setnavpillStyle({
      top: rect.top - navRect.top - 7,
      left: rect.left - navRect.left - 17,
      width: rect.width + 32,
    });
  };

  const handleMouseEnter = (e) => {
    const target = e.currentTarget.querySelector("a");
    if (target) {
      updatePillPosition(target);
    }
  };

  const handleMouseLeave = () => {
    if (activeLink === "/donate") {
      setnavpillStyle({ opacity: 0 });
      return;
    }
    const activeElement = navRef.current?.querySelector(".active a");
    if (activeElement) {
      updatePillPosition(activeElement);
    }
  };

  const closeAlert = () => {
    setAlertActive(false);
  };

  return (
    <>
      {alertActive ? (
        <div>
          <AlertBar active={alertActive} />
          <button className="closeAlertBtn" onClick={closeAlert}>
            <FaTimes />
          </button>
        </div>
      ) : (
        <div />
      )}
      <header
        className="navbar"
        style={{
          top: alertActive ? "32px" : 0,
        }}
      >
        <nav ref={navRef}>
          <RouterLink to="/" onClick={closeMenu} className="logo">
            <img src={logo} />
          </RouterLink>
          <div className="button-wrapper">
            <RouterLink to="/donate" id="mobile" className="button filled">
              Donate
            </RouterLink>
            <div className="hamburger" onClick={handleClick}>
              <div
                className={click ? "hamburger-icon active" : "hamburger-icon"}
              />
            </div>
          </div>
          <ul className={click ? "active" : ""}>
            <div className="navpill" style={navpillStyle} />
            {Object.entries(pages).map(([name, data]) => (
              <li
                key={name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleLink(data.link)}
                className={activeLink === data.link ? "active" : ""}
              >
                <RouterLink to={data.link}>
                  {data.icon}
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
