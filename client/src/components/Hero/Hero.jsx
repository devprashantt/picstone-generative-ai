// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Hero.module.scss";
import Button from "../Button/Button";
import { images } from "../../constant";

const Hero = ({ subHeading, heading, description }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__content}>
        <h2 className={styles.hero__subHeading}>
          {subHeading ? subHeading : "Explore Limitless Possibilities"}
        </h2>
        <h1 className={styles.hero__heading}>
          {heading ? heading : "PromptSpot - Ignite Your Creativity"}
        </h1>
        <p className={styles.hero__description}>
          {description
            ? description
            : "Welcome to PromptSpot, the ultimate source of creative inspiration for writers, artists, and creators. Unlock your imagination, overcome creative blocks, and unleash your full creative potential with our diverse collection of prompts."}
        </p>
      </div>
      <Button buttonText="Upload Image" />

      {/* SHAPES */}
      <img src={images.rectangle} alt="rectangle" className={styles.shape1} />
      <img src={images.ellipse} alt="ellipse" className={styles.shape2} />
    </div>
  );
};

Hero.propTypes = {
  subHeading: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default Hero;
