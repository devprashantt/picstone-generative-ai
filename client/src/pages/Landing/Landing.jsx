import { Hero } from "../../components";
import { images } from "../../constant";
import styles from "./Landing.module.scss";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

const Landing = () => {
  const inputText = `
  The sun was shining brightly as the fawn-colored working animal pulled the sleek military uniform-clad military person through the landscape. The soldier was clad in a ballistic vest, military camouflage cargo pants, and a helmet that provided the utmost security as they navigated the asphalt-covered terrain. As they traveled, the soldier held a leash that connected them to the canine breed that was faithfully following along.
  
  The soldier was part of a military organization, and as they reached their destination, they were greeted by their fellow marines in uniforms that matched their own. Each of them carried a backpack with personal protective equipment and a few other items in tow. As they reached the entrance, the non-commissioned officer in charge of the group addressed the soldier with a cheerful smile.
  
  "Welcome to the base!" he said. "We hope you have enjoyed your journey here. Your mission is to secure the area and make sure that no unauthorized personnel enter. Be sure to keep an eye out for any suspicious activity, and be sure to use your automotive tire and other items to your advantage."
  
  The soldier nodded and began to survey the area. They could see the luggage and bags of passengers who had recently arrived, and the military officer made sure to inspect each one. They were also on the lookout for any signs of danger or illegal activity.
  
  After a few hours of patrolling, the soldier was ready to call it a day. They gathered their equipment and headed back to the base. As they walked, the soldier could not help but feel a sense of pride in what they did and the work they did for their country. 
  
  The soldier's mood changed as they reached the entrance of the base. They were met by the non-commissioned officer with a hearty smile and thanked them for their hard work. The soldier felt a sense of accomplishment and joy as they returned the salute.
  
  The soldier returned to their quarters and prepared themselves for the next day's mission. They exchanged their military uniform for a more casual outfit and grabbed their bag filled with items necessary for their mission. With a smile, they looked out at the landscape and thought of the adventures that awaited them.
  
  Tomorrow, they would be part of a larger mission and part of a larger military organization. They would be joined by their fellow soldiers and they would have to rely on each other to complete their objectives.
  
  The soldier felt energized and passionate as they thought of the mission that lay ahead. They thought of the hard work and dedication that would be necessary to complete it and the camaraderie that would come from serving alongside their fellow soldiers. 
  
  The soldier was ready for the challenges that awaited them and the rewards that would come with success. They grabbed their bag, secured their helmet, and headed out the door with a new sense of purpose. The soldier felt that they were part of something larger than themselves and was excited to be part of a larger mission. 
  
  The soldier was ready for the adventure that lay ahead and was passionate about the work they were doing to keep their country safe. There was a sense of security and pride that came with being part of such a large and important military organization. The soldier was ready to serve and protect their nation and its people.`;

  const formattedText = replaceNewlinesWithBr(inputText);

  return (
    <div className={styles.landing}>
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
