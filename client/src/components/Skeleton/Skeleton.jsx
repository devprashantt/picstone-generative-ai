import PropTypes from "prop-types";
import styles from "./Skeleton.module.scss";

const Skeleton = ({ type }) => {
  const renderSkeletonByType = () => {
    switch (type) {
      case "card":
        return (
          <div className={styles.skeleton}>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "3.125rem",
                height: "3.125rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "100%",
                height: "5rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "30%",
                height: "2.25rem",
                borderRadius: "0.4rem",
              }}
            ></div>
          </div>
        );
      case "img":
        return (
          <div
            className={styles.skeleton}
            style={{
              width: "100%",
              height: "100%",
              padding: "0",
              boxShadow: "none",
            }}
          >
            <div
              className={styles.loadingAnimation}
              style={{
                width: "40rem",
                height: "25rem",
              }}
            ></div>
          </div>
        );
      case "tags":
        return (
          <div
            className={styles.skeleton}
            style={{
              width: "100%",
              height: "100%",
              padding: "0",
              boxShadow: "none",
            }}
          >
            <div
              className={styles.loadingAnimation}
              style={{
                width: "6rem",
                height: "2.8rem",
              }}
            ></div>
          </div>
        );
      case "text":
        return (
          <div
            className={styles.skeleton}
            style={{
              width: "100%",
              height: "100%",
              padding: "0",
              boxShadow: "none",
            }}
          >
            <div
              className={styles.loadingAnimation}
              style={{
                width: "100%",
                height: "2rem",
              }}
            ></div>
          </div>
        );
      default:
        return (
          <div className={styles.skeleton}>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "3.125rem",
                height: "3.125rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "100%",
                height: "2.25rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "100%",
                height: "5rem",
              }}
            ></div>
            <div
              className={styles.loadingAnimation}
              style={{
                width: "30%",
                height: "2.25rem",
                borderRadius: "0.4rem",
              }}
            ></div>
          </div>
        );
    }
  };

  return renderSkeletonByType();
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(["card", "img"]).isRequired,
};

export default Skeleton;
