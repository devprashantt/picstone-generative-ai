import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./StoryPage.module.scss";

// PROP-TYPE
import PropTypes from "prop-types";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

// API
import useStory from "../../api/useStory";

const StoryPage = () => {
  const { id } = useParams();
  const { getStoryById } = useStory();

  const [storyData, setStoryData] = useState({});

  const fetchStory = async () =>
    await getStoryById(id, (responseData) => {
      console.log("responseData", responseData);
      setStoryData(responseData);
    });

  useEffect(() => {
    fetchStory();
  }, []);

  // const formattedStory = replaceNewlinesWithBr(story);

  return (
    // <div className={styles.story}>
    //   <div className={styles.left}>
    //     <img src={secure_url} alt="img-picstone" />
    //     <div className={styles.tags}>
    //       {tags?.map((tag) => {
    //         return (
    //           <p key={tag} className={styles.tag}>
    //             {tag}
    //           </p>
    //         );
    //       })}
    //     </div>
    //   </div>
    //   <p dangerouslySetInnerHTML={{ __html: formattedStory }}></p>
    // </div>
    <div></div>
  );
};

StoryPage.propTypes = {
  secure_url: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  story: PropTypes.string.isRequired,
};

export default StoryPage;
