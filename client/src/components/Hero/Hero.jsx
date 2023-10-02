// PROP-VALIDATION
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./Hero.module.scss";
import { images } from "../../constant";

// COMPONENTS
import ImageUploader from "../ImageUploader/ImageUploader";
import Button from "../Button/Button";

const Hero = ({
  subHeading,
  heading,
  description,
  warning,
  btn,
  img_btn,
  btn_text,
}) => {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__content}>
        <h2 className={styles.hero__subHeading}>
          {subHeading ? subHeading : "Explore Limitless Possibilities"}
        </h2>{" "}
        {heading ? (
          <h1 className={styles.hero__heading}>{heading}</h1>
        ) : (
          <h1 className={styles.hero__heading}>
            <span>Picstone</span>
            <br />
            Where Image Paints Thousand Stories
          </h1>
        )}
        <p className={styles.hero__description}>
          {description
            ? description
            : "Picstone is an innovative platform designed to revolutionize the way you interact with images and stories. With Picstone, your photos come to life with captivating narratives. Whether you're a photography enthusiast, a storyteller, or simply looking to add an extra layer of magic to your images, Picstone has you covered."}
        </p>
      </div>
      {/* IMAGE UPLOADER */}
      {img_btn ? (
        <ImageUploader />
      ) : btn ? (
        <Button buttonText={btn_text} />
      ) : null}
      {/* WARNING */}
      {warning && (
        <div className={styles.warning}>
          <span>Warning:</span>{" "}
          <p>
            {/* LIMITED USE */}
            This is a demo site and is intended for limited use only. Please do
            not upload any images that you do not own or have permission to use.
            {/* PUBLIC */}
            Images uploaded here are public and can be viewed by anyone. Please
            do not upload any sensitive or personal images.
          </p>
        </div>
      )}
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
  warning: PropTypes.bool,
  img_btn: PropTypes.bool,
  btn_text: PropTypes.string,
  btn: PropTypes.bool,
};

export default Hero;
