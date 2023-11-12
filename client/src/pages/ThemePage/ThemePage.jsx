import styles from "./ThemePage.module.scss";

import { Theme } from "./../../components";
import { theme } from "../../constant";

const ThemePage = () => {
  return (
    <div className={styles.theme}>
      <Theme
        imagesLinks={theme.diwaliTheme.imagesLink}
        heading={theme.diwaliTheme.heading}
        subHeading={theme.diwaliTheme.subHeading}
        description={theme.diwaliTheme.description}
      />
      <Theme
        imagesLinks={theme.winterTheme.imagesLink}
        heading={theme.winterTheme.heading}
        subHeading={theme.winterTheme.subHeading}
        description={theme.winterTheme.description}
      />
    </div>
  );
};

export default ThemePage;
