import { Navbar, Hero, Card } from "../../components";
import { images } from "../../constant";
import styles from "./Landing.module.scss";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

// const data = [
//   {
//     id: 1,
//     img: "https://picsum.photos/200/300",
//     heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     description:
//       "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
//     link: "/",
//   },
//   {
//     id: 2,
//     img: "https://picsum.photos/200/300",
//     heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     description:
//       "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
//     link: "/",
//   },
//   {
//     id: 3,
//     img: "https://picsum.photos/200/300",
//     heading: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     description:
//       "Our platform uses ChatGPT technology to generate a wide range of prompt ideas that you can use to make your portfolio stand out.",
//     link: "/",
//   },
// ];

const Landing = () => {
  const inputText = `\n\nThe water, clouds, and sky\nA stunning view of the atmosphere,\nThe plants, ecoregions, afterglow\nA beautiful sight of the bird, orange, and snow.\n\nThe natural landscape, lake, and body of water\nA perfect sight of the dusk, sunset, and red sky at morning,\nThe sunrise, sunlight, and beach\nThe horizon light up and the atmospheric phenomenon starts showing.\n\nThe landscape, sun, tree, and waterway\nA remarkable view of the shore, calm, and seabird,\nThe dawn, reflection, and evening\nThe coast is a sight to be seen and heard.\n\nThe ocean, wildlife, and sound\nAn amazing view of the astronomical object, wave, and reservoir,\nThe art, tropics, palm tree, and stock photography\nA wonderful view of the upbeat, passionate, and intriguing scene.\n\nThe sentiment is positive, negative, neutral\nThe mood is joyful, melancholic, peaceful, and energetic,\nTheres beauty in every sunrise and sunset\nIn the sky, water, and everything in between.\n\nThe lake, beach, and horizon\nA fabulous view of the atmospheric phenomenon,\nThe sun, tree, and waterway\nThe shore, calm, and seabird can be seen.\n\nThe ocean, wildlife, and sound\nA spectacular view of the astronomical object, wave, and reservoir,\nThe art, tropics, palm tree, and stock photography\nA delightful view of the upbeat, passionate, and intriguing scene.\n\nThe sentiment is positive, negative, neutral\nThe mood is joyful, melancholic, peaceful, and energetic,\nTheres beauty in every evening and dawn\nIn the sky, water, and everything in between.\n\nThe lake, beach, and horizon\nA captivating view of the atmospheric phenomenon,\nThe sun, tree, and waterway\nThe shore, calm, and seabird can be seen.\n\nThe ocean, wildlife, and sound\nAn extraordinary view of the astronomical object, wave, and reservoir,\nThe art, tropics, palm tree, and stock photography\nA wonderful view of the upbeat, passionate, and intriguing scene.\n\nThe sentiment is positive, negative, neutral\nThe mood is joyful, melancholic, peaceful, and energetic,\nThe beauty of the afterglow and red sky at morning\nThe lake, beach, and horizon will always be calling.`;
  const formattedText = replaceNewlinesWithBr(inputText);
  return (
    <div className={styles.landing}>
      <Navbar />
      {/* HERO */}
      <Hero />
      {/* CARDS */}
      {/* <div className={styles.cards}>
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
      </div> */}
      {/* EXAMPLE */}
      <div className={styles.example}>
        <h1>Example</h1>
        <img src={images.nature} alt="nature" />
        <div className={styles.radial_effect} />
        <p dangerouslySetInnerHTML={{ __html: formattedText }}></p>
      </div>
    </div>
  );
};

export default Landing;
