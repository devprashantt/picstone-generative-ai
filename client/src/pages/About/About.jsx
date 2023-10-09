// COMPONENTS
// import { images } from "../../constant";
import { Hero } from "../../components";
import AboutList from "./components/AboutList";
import AboutData from "./AboutData";

// STYLES
import styles from "./About.module.scss";

const About = () => {
  return (
    <div className={styles.about}>
      <Hero
        subHeading="Discover Our Story"
        heading="About us"
        description="Welcome to our About Us page, where you can dive into the heart of our company. Here, we share our journey, values, and aspirations that drive us forward. Get to know the people behind the scenes and the passion that fuels our work."
        btn_text="Contact"
      />
      <div className={styles.list}>
        {AboutData.map((dataItem) => {
          console.log(!!(dataItem.id % 2 === 1));
          const pos = !!(dataItem.id % 2 === 1);
          return (
            <AboutList
              key={dataItem.id}
              title={dataItem.title}
              description={dataItem.description}
              imgLink={dataItem.imgLink}
              position={pos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default About;
