import styles from "./Story.module.scss";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

// REDUX STATE
import { useSelector } from "react-redux";

const Story = () => {
  const story = useSelector((state) => state.story.story);
  const cloudinaryData = useSelector((state) => state.story.cloudinaryData);

  const formattedStory = replaceNewlinesWithBr(story);

  return (
    <div className={styles.story}>
      <div className={styles.left}>
        <img src={cloudinaryData?.secure_url} alt="img-picstone" />
        <div className={styles.tags}>
          {cloudinaryData?.tags?.map((tag) => {
            return (
              <p key={tag} className={styles.tag}>
                {tag}
              </p>
            );
          })}
        </div>
      </div>
      <p dangerouslySetInnerHTML={{ __html: formattedStory }}></p>
    </div>
  );
};

export default Story;
