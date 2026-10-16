import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./timeline.css";
import { timeline } from "../AboutVars";

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);

  // Highlight the section that crosses the vertical middle of the viewport.
  // IntersectionObserver replaces a scroll listener that measured every
  // section on every scroll event.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sectionRefs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline">
      <div className="left">
        <div className="desktop-photos">
          <AnimatePresence>
            {timeline.map(
              (item, index) =>
                index === activeIndex && (
                  <motion.img
                    key={index}
                    className="desktop-photo"
                    src={item.image}
                    alt={item.heading}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="right">
        {timeline.map((item, index) => (
          <section
            className="desktop-content-section"
            key={item.heading}
            data-index={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
          >
            <div className="desktop-content">
              <span style={{ color: "var(--accent)" }}>{item.span}</span>
              <h4>{item.heading}</h4>
              {item.paragraphs.map((para, paraIndex) => (
                <p key={paraIndex}>{para}</p>
              ))}
              <div className="mobile-photo">
                <img src={item.image} alt={item.heading} loading="lazy" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
