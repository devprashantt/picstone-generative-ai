import { Hero, Theme } from "../../components";
import styles from "./Landing.module.scss";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

const Landing = () => {
  const inputText = `
  Once upon a time, in a lush natural environment, there was a small fawn, happily roaming the grass and vegetation. Everywhere it looked, there was something new and intriguing to engage with. The fawn loved to explore the natural landscape and it was especially fond of the trees, leaves and flowers, spending hours examining their shapes and colors.\n\nOne day, while exploring, the fawn stumbled upon a toy in the shape of a small to medium-sized cat. Intrigued, it grabbed the toy and started to explore it. As it did, it noticed the felidae’s whiskers and the artfully painted petal. This made the fawn even more interested and it started to play with the toy, running around and making it leap and jump.\n\nAt the same time, nearby, a butterfly was fluttering from flower to flower, gathering pollen and nectar from the blooming vegetation. The fawn watched in awe and amusement, as the pollinator flew gracefully from one plant to another. It was a sight to behold and it filled the fawn with a feeling of joy and delight.\n\nNot far away, an animated cartoon was playing on a screen in a nearby house. It depicted a family of small to medium-sized cats, living in the heart of the jungle. The fawn watched in wonder as the cats roamed the wildlife, chasing each other and playing around. It was a fun and exciting sight, and the fawn felt energized and passionate.\n\nMeanwhile, on the lawn, a small lawn ornament in the shape of a butterfly was making its way across the grass. It was a colorful and intricate illustration, with a playful and lively design. The fawn was fascinated and it watched with admiration as the butterfly fluttered around, playing in the spring breeze. It was a sight to behold and the fawn felt peaceful and content.\n\nThe day eventually turned to night and the fawn returned home with its newfound toy. It had experienced so many wonderful things that day and the fawn was filled with a sense of joy and satisfaction. It had explored the natural environment and engaged with the wildlife, and it had even gotten to experience a bit of fun and leisure with its new toy.\n\nThe fawn was grateful to have such a wonderful natural landscape to explore and it was passionate about protecting the environment. It was determined to make sure that future generations could experience the same joy and delight that it had experienced that day.\n\nThe fawn looked forward to many more days filled with exploration and discovery, and it was determined to make the most of every moment. It was a day that the fawn would never forget and it was a reminder of the importance of protecting the environment and all its inhabitants.`;

  const formattedText = replaceNewlinesWithBr(inputText);

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

      <div
        style={{
          height: "1rem",
          width: "100%",
        }}
      />
      {/* EXPLORE */}
      {/* <Explore storyLength={9} /> */}
      {/* EXAMPLE */}
      <div className={styles.example}>
        <h1>Example</h1>
        <img
          src={
            "https://res.cloudinary.com/dfa9vxyte/image/upload/v1695900337/picstone/hcigohcfosvgwaity3f1.jpg"
          }
          alt="nature"
        />
        <p dangerouslySetInnerHTML={{ __html: formattedText }}></p>
      </div>
    </div>
  );
};

export default Landing;
