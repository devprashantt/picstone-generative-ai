import styles from "./Story.module.scss";

// PROP-TYPE
import PropTypes from "prop-types";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

const Story = (story, secure_url, tags) => {
  const formattedStory = replaceNewlinesWithBr(story);

  return (
    <div className={styles.story}>
      <div className={styles.left}>
        <img src={secure_url} alt="img-picstone" />
        <div className={styles.tags}>
          {tags?.map((tag) => {
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

Story.propTypes = {
  secure_url: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  story: PropTypes.string.isRequired,
};

export default Story;
