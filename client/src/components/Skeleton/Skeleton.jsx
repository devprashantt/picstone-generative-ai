import styles from "./Skeleton.module.scss";

const Skeleton = () => {
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
};

export default Skeleton;
