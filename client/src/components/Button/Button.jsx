// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Button.module.scss";

// LINK
import { Link } from "react-router-dom";

const Button = ({
  buttonText,
  onClick,
  disabled,
  isLoading,
  isLoadingText,
  className,
  type,
  to,
}) => {
  const buttonClass = `${styles.button} ${className || ""}`;

  return (
    // <Link className={styles.link} to={`${to}`}>
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type ? type : "button"}
    >
      {isLoading ? isLoadingText : buttonText}
    </button>
    // </Link>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingText: PropTypes.string,
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
};

Button.defaultProps = {
  buttonText: "Button",
  onClick: () => {},
  disabled: false,
  isLoading: false,
  isLoadingText: "Loading...",
  className: "",
  type: "button",
};

export default Button;
