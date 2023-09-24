// REACT IMPORTS
import { Link } from "react-router-dom";

// CONSTANTS
import styles from "./Card.module.scss";

const Card = () => {
  return (
    <div className={styles.card}>
      <img src="" alt="" className={styles.img} />
      <h3 className={styles.heading}></h3>
      <p className={styles.description}></p>
      <Link className={styles.link}></Link>
    </div>
  );
};

export default Card;
