import styles from "./ThemePage.module.scss";

import { Theme } from "./../../components";

const ThemePage = () => {
  return (
    <div className={styles.theme}>
      <Theme />
    </div>
  );
};

export default ThemePage;
