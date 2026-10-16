import React from "react";
import { Link } from "react-router-dom";

import { footerLinks, pageLinks, socialLinks } from "./footerVars";
import "./footer.css";
import logo from "../../images/logo.webp";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="logo">
          <Link to="/" aria-label="Go back to home page">
            <img src={logo} alt="St. Mary Orthodox Church" loading="lazy" />
          </Link>
        </div>
        <div className="info">
          {footerLinks.map((item) => (
            <a
              href={item.link}
              key={item.link}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              <span className="item">
                {item.icon}
                <p>
                  <span className={item.bold ? "bold" : "no-bold"}>
                    {item.boldContent} &nbsp;
                  </span>
                  {item.content}
                </p>
              </span>
            </a>
          ))}
          <Link to="/donate" className="button filled" aria-label="Go to donation page">
            Donate
          </Link>
        </div>
      </div>
      <div className="bottom">
        <ul className="links">
          {pageLinks.map((item) => (
            <li key={item.link}>
              <Link to={item.link} aria-label={item.label}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="social">
          {socialLinks.map((item) => (
            <li key={item.link}>
              <a href={item.link} aria-label={item.label} target="_blank" rel="noreferrer">
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
        <p>St. Mary Orthodox Church</p>
      </div>
    </footer>
  );
};

export default Footer;
