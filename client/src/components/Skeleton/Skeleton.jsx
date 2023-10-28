import PropTypes from "prop-types";
import styles from "./Skeleton.module.scss";

import { motion } from "framer-motion";

const Skeleton = ({ type, width }) => {
  const renderSkeletonByType = () => {
    switch (type) {
      case "card":
        return (
          <motion.div
            whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={styles.skeleton}
          >
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
          </motion.div>
        );
      case "img":
        return (
          <motion.div
            whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
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
          </motion.div>
        );
      case "tags":
        return (
          <motion.div
            whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className={styles.skeleton}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
          </motion.div>
        );
      case "text":
        return (
          <motion.div
            whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={styles.skeleton}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "100%",
              padding: "0",
              boxShadow: "none",
            }}
          >
            <div
              className={styles.loadingAnimation}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: width ? width : "100%",
                height: "2.4rem",
              }}
            ></div>
          </motion.div>
        );
      default:
        return (
          <motion.div
            whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
            transition={{ duration: 0.5 }}
            className={styles.skeleton}
          >
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
          </motion.div>
        );
    }
  };

  return renderSkeletonByType();
};

Skeleton.propTypes = {
  type: PropTypes.oneOf(["card", "img"]).isRequired,
};

export default Skeleton;
