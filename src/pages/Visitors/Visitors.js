import React, { useState } from "react";

import "./visitors.css";
import { QAs } from "./QAs";

const Visitors = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    setSelected((current) => (current === index ? null : index));
  };

  return (
    <div className="visitors">
      <div className="accordion">
        {QAs.map((item, index) => {
          const isOpen = selected === index;
          return (
            <div className={isOpen ? "item open" : "item"} key={item.question}>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <h6>{item.question}</h6>
              </button>
              <p
                id={`faq-answer-${index}`}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visitors;
