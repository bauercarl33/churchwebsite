import React from "react";
import PropTypes from "prop-types";
import "./curtain.css";

const CurtainLoadingEffect = ({ isOpen, children }) => {
  return (
    <div className="curtain-container">
      {/* Content underneath the curtain */}
      <div className="curtain-content">{children}</div>

      {/* Curtain overlay */}
      <div className={`curtain ${isOpen ? "open" : ""}`} />
    </div>
  );
};

CurtainLoadingEffect.propTypes = {
  isOpen: PropTypes.bool.isRequired, // Controls curtain animation
  children: PropTypes.node, // Content to be revealed underneath the curtain
};

export default CurtainLoadingEffect;
