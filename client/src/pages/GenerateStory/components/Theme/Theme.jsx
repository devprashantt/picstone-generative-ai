import PropTypes from "prop-types";
import styles from "./Theme.module.scss";

const Theme = ({ img_link, title, isSelected, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.theme} onClick={handleClick}>
      {isSelected ? (
        <div className={styles.selected}>
          <img src={img_link} alt="Theme" className={styles.image} />
          <p className={styles.title}>{title}</p>
        </div>
      ) : (
        <div className={styles.not_selected}>
          <img src={img_link} alt="Theme" className={styles.image} />
          <p className={styles.title}>{title}</p>
        </div>
      )}
    </div>
  );
};

Theme.propTypes = {
  img_link: PropTypes.string,
  title: PropTypes.string,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func, // Add an onClick prop for handling clicks
};

export default Theme;
