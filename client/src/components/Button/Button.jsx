// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Button.module.scss";

const Button = ({
  buttonText,
  onClick,
  disabled,
  isLoading,
  className,
  type,
}) => {
  const buttonClass = `${styles.button} ${className || ""}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type || "button"}
    >
      {isLoading ? "Loading..." : buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

Button.defaultProps = {
  buttonText: "Button",
  onClick: () => {},
  disabled: false,
  isLoading: false,
  className: "",
  type: "button",
};

export default Button;
