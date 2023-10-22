import styles from "./ProfileOption.module.scss";

import PropTypes from "prop-types";

const ProfileOption = ({ option, activeOption, setActiveOption }) => {
  return (
    <div
      className={`${styles.profile_option} ${
        option === activeOption && styles.active
      }`}
      onClick={() => setActiveOption(option)}
    >
      {option}
    </div>
  );
};

ProfileOption.propTypes = {
  option: PropTypes.string,
  activeOption: PropTypes.string,
  setActiveOption: PropTypes.func,
};

export default ProfileOption;
