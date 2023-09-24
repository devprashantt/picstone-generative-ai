import { Navbar, Hero, Card } from "../../components";
import styles from "./Landing.module.scss";

const data = [
  {
    id: 1,
    img: "https://picsum.photos/200/300",
    heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
    link: "/",
  },
  {
    id: 2,
    img: "https://picsum.photos/200/300",
    heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
    link: "/",
  },
  {
    id: 3,
    img: "https://picsum.photos/200/300",
    heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    description:
      "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
    link: "/",
  },
];

const Landing = () => {
  return (
    <div className={styles.landing}>
      <Navbar />
      {/* HERO */}
      <Hero />
      {/* CARDS */}
      <div className={styles.cards}>
        {data.map((item) => {
          return (
            <Card
              key={item.id}
              img={item.img}
              heading={item.heading}
              description={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
