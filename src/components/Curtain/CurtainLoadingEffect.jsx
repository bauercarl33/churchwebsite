import "./curtain.css";

/**
 * Renders `children` under a curtain image that slides away when `isOpen`
 * becomes true.
 */
const CurtainLoadingEffect = ({ isOpen, children }) => {
  return (
    <div className="curtain-container">
      <div className="curtain-content">{children}</div>
      <div className={`curtain ${isOpen ? "open" : ""}`} aria-hidden="true" />
    </div>
  );
};

export default CurtainLoadingEffect;
