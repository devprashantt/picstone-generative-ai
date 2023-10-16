// COMPONENTS
import { Hero } from "../../components";
import AboutList from "./components/AboutList";
import AboutData from "./AboutData";

// STYLES
import styles from "./About.module.scss";

//CONSTANTS
// import { images } from "../../constant";

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
      {/* <div>
        <img style={styles.in_page_icon1} src={images.ellipse_2} />
      </div> */}
      {/* <img style={styles.inpage_Icon2} src={images.star} />
      <img style={styles.inpage_Icon1} src={images.triangle_1} />
      <img style={styles.inpage_Icon2} src={images.triangle_2} /> */}
    </div>
  );
};

export default About;
