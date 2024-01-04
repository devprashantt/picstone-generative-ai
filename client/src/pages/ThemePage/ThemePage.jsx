import styles from "./ThemePage.module.scss";

import { Theme } from "./../../components";
import { theme } from "../../constant";

const ThemePage = () => {
  return (
    <div className={styles.theme}>
      <Theme
        imagesLinks={theme.newYear.imagesLink}
        heading={theme.newYear.heading}
        subHeading={theme.newYear.subHeading}
        description={theme.newYear.description}
        theme={theme.newYear.theme}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          color: "#7c7c7c",
          textAlign: "center",
        }}
      >
        <h1>✨ Older Themes ✨</h1>
      </div>
      <Theme
        imagesLinks={theme.christmas.imagesLink}
        heading={theme.christmas.heading}
        subHeading={theme.christmas.subHeading}
        description={theme.christmas.description}
        theme={theme.christmas.theme}
      />
      <Theme
        imagesLinks={theme.diwali.imagesLink}
        heading={theme.diwali.heading}
        subHeading={theme.diwali.subHeading}
        description={theme.diwali.description}
        theme={theme.diwali.theme}
      />
      <Theme
        imagesLinks={theme.winter.imagesLink}
        heading={theme.winter.heading}
        subHeading={theme.winter.subHeading}
        description={theme.winter.description}
        theme={theme.winter.theme}
      />
    </div>
  );
};

export default ThemePage;
