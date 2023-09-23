import { Navbar, Hero } from "../../components";
import styles from "./Landing.module.scss";

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Navbar />
      {/* HERO */}
      <Hero />
    </div>
  );
};

export default Landing;
