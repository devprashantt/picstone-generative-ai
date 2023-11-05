import styles from "./ProfileView.module.scss";

// COMPONENTS
import Work from "./Work/Work";

import PropTypes from "prop-types";

const ProfileView = ({ option }) => {
  return (
    <div>
      {/* DELIVER DATA ON BASIS OF SELECTED OPTION, MAKE SWITCH CASES */}
      {option === "Work" && <Work />}
      {option === "boosted_shots" && (
        <div className={styles.profile_view}>
          <div className={styles.profile_view_header}>
            <h1>Boosted Shots</h1>
          </div>
          <div className={styles.profile_view_content}>
            <p>Boosted Shots</p>
          </div>
        </div>
      )}
      {option === "Collections" && (
        <div className={styles.profile_view}>
          <div className={styles.profile_view_header}>
            <h1>Collections</h1>
          </div>
          <div className={styles.profile_view_content}>
            <p>Collections</p>
          </div>
        </div>
      )}
      {option === "liked_shots" && (
        <div className={styles.profile_view}>
          <div className={styles.profile_view_header}>
            <h1>Liked Shots</h1>
          </div>
          <div className={styles.profile_view_content}>
            <p>Liked Shots</p>
          </div>
        </div>
      )}
      {option === "About" && (
        <div className={styles.profile_view}>
          <div className={styles.profile_view_header}>
            <h1>About</h1>
          </div>
          <div className={styles.profile_view_content}>
            <p>About</p>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileView.propTypes = {
  option: PropTypes.string.isRequired,
};

export default ProfileView;
