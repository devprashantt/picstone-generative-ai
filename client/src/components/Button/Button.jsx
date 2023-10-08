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
  className,
  type,
  to,
}) => {
  const buttonClass = `${styles.button} ${className || ""}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type || "button"}
    >
      <Link className={styles.link} to={`${to}`}>
        {isLoading ? "Loading..." : buttonText}
      </Link>
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  buttonText: "Button",
  onClick: () => {},
  disabled: false,
  isLoading: false,
  className: "",
  type: "button",
  to: "/",
};

export default Button;
