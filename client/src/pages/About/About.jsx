// COMPONENTS
import { images } from "../../constant";

// STYLES
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <a href="https://peerlist.io/prashantkumar/project/picstone">
        <img src={images.generative_ai} alt="ai" />
      </a>
    </div>
  );
};

export default About;
