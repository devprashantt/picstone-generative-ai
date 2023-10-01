// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Button.module.scss";

const Button = ({
  buttonText,
  onClick,
  disabled,
  isLoading,
  isLoadingText,
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
      {isLoading ? isLoadingText : buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingText: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
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
