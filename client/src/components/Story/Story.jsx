import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Story.module.scss";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

// REDUX STATE
import { useSelector } from "react-redux";

const Story = () => {
  const story = useSelector((state) => state.story.story);
  const cloudinaryData = useSelector((state) => state.story.cloudinaryData);

  const navigate = useNavigate();

  const formattedStory = replaceNewlinesWithBr(story);

  const handleTagClick = (e) => {
    const tag = e.target.textContent;
    navigate(`/tags/${tag}`);
  };

  // USE EFFECT TO MAKE MAKE PAGE ON TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.story}>
      <div className={styles.left}>
        <img src={cloudinaryData?.secure_url} alt="img-picstone" />
        <div className={styles.tags}>
          {cloudinaryData?.tags?.map((tag) => {
            return (
              <p key={tag} className={styles.tag} onClick={handleTagClick}>
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
