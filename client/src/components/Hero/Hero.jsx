// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Hero.module.scss";
import { images } from "../../constant";

// COMPONENTS
import ImageUploader from "../ImageUploader/ImageUploader";

const Hero = ({ subHeading, heading, description }) => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__content}>
        <h2 className={styles.hero__subHeading}>
          {subHeading ? subHeading : "Explore Limitless Possibilities"}
        </h2>{" "}
        {heading ? (
          heading
        ) : (
          <h1 className={styles.hero__heading}>
            <span>Picstone</span>
            <br />
            Where Every Image Paints a Thousand Stories
          </h1>
        )}
        <p className={styles.hero__description}>
          {description
            ? description
            : "Picstone is an innovative platform designed to revolutionize the way you interact with images and stories. With Picstone, your photos come to life with captivating narratives. Whether you're a photography enthusiast, a storyteller, or simply looking to add an extra layer of magic to your images, Picstone has you covered."}
        </p>
      </div>
      {/* IMAGE UPLOADER */}
      <ImageUploader />
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
