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
      <div
        style={{
          height: "1rem",
          width: "100%",
        }}
      />

      <Theme />
    </div>
  );
};

export default Landing;
