import styles from "./Theme.module.scss";
import Button from "./../Button/Button";
import PropTypes from "prop-types";
import { images } from "../../constant";

const Theme = ({
  imagesLinks,
  heading,
  subHeading,
  description,
  handleTheme,
}) => {
  return (
    <div className={styles.theme}>
      <h1 className={styles.heading}>{subHeading}</h1>
      <div className={styles.img_container}>
        {imagesLinks.map((image, index) => (
          <img
            src={image}
            alt={index}
            key={index}
            className={styles.theme_img}
          />
        ))}
      </div>

      <div className={styles.content}>
        <img src={images.triangle_2} className={styles.shape1} alt="" />
        <img src={images.ellipse_2} className={styles.shape2} alt="" />
        <h1 className={styles.theme_name}>{heading}</h1>
        <p className={styles.theme_desc}>{description}</p>
        <Button
          className={styles.theme_btn}
          buttonText="Explore"
          onClick={handleTheme}
        />
      </div>
    </div>
  );
};

Theme.propTypes = {
  imagesLinks: PropTypes.arrayOf(PropTypes.string),
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  description: PropTypes.string,
  handleTheme: PropTypes.func,
};

export default Theme;
