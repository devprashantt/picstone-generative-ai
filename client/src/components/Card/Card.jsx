// PROP VALIDATION
import PropTypes from "prop-types";

// REACT IMPORTS
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// CONSTANTS
import styles from "./Card.module.scss";

// ENUMS
const MAX_CHARACTERS = 110;

// TITLE
const TITLE = 50;

const Card = ({ img, heading, description, link }) => {
  return (
    <motion.div
      className={styles.card}
      whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <img src={img} alt="" className={styles.img} />
      <h3 className={styles.heading}>{heading.substring(0, TITLE)}</h3>
      <p className={styles.description}>
        {description.length > MAX_CHARACTERS
          ? `${description.substring(0, MAX_CHARACTERS)}...`
          : description}
      </p>
      <Link to={`${link}`} className={styles.link}>
        Read more
      </Link>
    </motion.div>
  );
};

Card.propTypes = {
  img: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Card;
