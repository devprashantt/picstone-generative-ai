// PROP-VALIDATION
import PropTypes from "prop-types";

// IMPORT FRAMER MOTION
import { motion } from "framer-motion";

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
    <motion.button
      // SET MOTION PROPS
      whileTap={{ scale: 0.95 }}
      whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={buttonClass}
      onClick={onClick}
      disabled={isLoading ? "disabled" : disabled}
      type={type ? type : "button"}
    >
      {isLoading ? isLoadingText : buttonText}
    </motion.button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingText: PropTypes.string,
  className: PropTypes.string,
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
