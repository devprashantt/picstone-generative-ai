import styles from "./ProfileView.module.scss";

import PropTypes from "prop-types";

const ProfileView = ({ option }) => {
  return (
    <div>
      {/* DELIVER DATA ON BASIS OF SELECTED OPTION, MAKE SWITCH CASES */}
      {option === "work" && (
        <div className={styles.profile_view}>
          <div className={styles.profile_view_header}>
            <h1>Work</h1>
          </div>
          <div className={styles.profile_view_content}>
            <p>Work</p>
          </div>
        </div>
      )}
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
      {option === "collections" && (
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
      {option === "about" && (
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
