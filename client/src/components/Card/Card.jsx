// PROP VALIDATION
import PropTypes from "prop-types";

// REACT IMPORTS
// import { Link } from "react-router-dom";

// CONSTANTS
import styles from "./Card.module.scss";

const Card = ({ img, heading, description }) => {
  return (
    <div className={styles.card}>
      <img src={img} alt="" className={styles.img} />
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Card;
