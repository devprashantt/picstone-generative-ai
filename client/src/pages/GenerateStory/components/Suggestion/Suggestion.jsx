import styles from "./Suggestion.module.scss";
import PropTypes from "prop-types";
import { images } from "./../../../../constant";

const Suggestion = ({ suggestion }) => {
  return (
    <div className={styles.suggestion}>
      <img src={images.bulb} alt="bulb" className={styles.logo} />
      <p className={styles.desc}>
        {suggestion
          ? suggestion
          : "Describe the first signs of spring you notice around you: the blooming flowers, the singing birds, or the gentle breeze."}
      </p>
    </div>
  );
};

Suggestion.propTypes = {
  suggestion: PropTypes.string,
};

export default Suggestion;
