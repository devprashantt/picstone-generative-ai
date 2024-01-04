import { theme } from "../../constant";

import { Hero, Theme } from "../../components";
import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.landing}>
      {/* HERO */}
      <Hero
        warning={true}
        img_btn={false}
        btn={true}
        btn_text={"Generate story"}
        to={"generate-story"}
      />
      {/* GAP */}
      {/* <div
        style={{
          height: "2rem",
          width: "100%",
        }}
      /> */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0 2rem  0",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          color: "#7c7c7c",
          textAlign: "center",
        }}
      >
        <h2>✨ OCR For Text Extraction From Images Supported Now!! ✨</h2>
      </div>

      <Theme
        imagesLinks={theme.newYear.imagesLink}
        heading={theme.newYear.heading}
        subHeading={theme.newYear.subHeading}
        description={theme.newYear.description}
        theme={"newYear"}
      />
    </div>
  );
};

export default Landing;
