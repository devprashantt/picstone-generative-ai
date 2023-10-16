import PropTypes from "prop-types";

import styles from "./AboutList.module.scss";

const AboutList = ({ title, description, imgLink, position }) => {
  return (
    <div className={styles.list_item}>
      {position ? (
        <>
          <div className={styles.list_text}>
            <p className={styles.heading}>{title}</p>
            <p className={styles.paragraph}>{description}</p>
          </div>
          <div className={styles.image}>
            <img src={imgLink} />
          </div>
        </>
      ) : (
        <>
          <div className={styles.image}>
            <img src={imgLink} />
          </div>
          <div className={styles.list_text}>
            <p className={styles.heading}>{title}</p>
            <p className={styles.paragraph}>{description}</p>
          </div>
        </>
      )}
    </div>
  );
};

AboutList.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imgLink: PropTypes.string,
  position: PropTypes.bool,
};

export default AboutList;
