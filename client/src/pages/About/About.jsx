// COMPONENTS
import { images } from "../../constant";
import Button from "../../components/Button/Button";
import { Hero } from "../../components";

// STYLES
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      {/* <div className={styles.intro}>
        <p className={styles.text}>Discover Our Story</p>
        <p className={styles.heading}>About us</p>
        <p className={styles.desc}>
          Welcome to our About Us page, where you can dive into the heart of our
          company. Here, we share our journey, values, and aspirations that
          drive us forward. Get to know the people behind the scenes and the
          passion that fuels our work.
        </p>
        <Button buttonText="Contact" className={styles.button} />
      </div> */}
      <Hero />
      <div>
        <div>
          <div className={styles.null}>
            <p>Our story</p>
            <p>
              At PromptSpot, we are passionate about inspiring creativity and
              fostering a love for writing. Since our establishment in 20XX, we
              have been dedicated to providing writers of all levels with a
              platform to explore their imagination and hone their craft. Our
              mission is to empower writers to unleash their creativity, connect
              with others in the writing community, and discover new
              opportunities for growth and development.
            </p>
          </div>
          {/* photo */}
        </div>
      </div>
    </div>
  );
};

export default About;
