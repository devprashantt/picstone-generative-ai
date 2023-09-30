import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./StoryPage.module.scss";

// SKELETON
import { Skeleton } from "../../components";
// API
import useStory from "../../api/useStory";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

const StoryPage = () => {
  const { id } = useParams();
  const { getStoryById, loading } = useStory();

  const [storyData, setStoryData] = useState({});
  const [story, setStory] = useState();

  const fetchStory = async () =>
    await getStoryById(id, (responseData) => {
      console.log("responseData", responseData);
      setStoryData(responseData?.story);
      setStory(replaceNewlinesWithBr(responseData?.story?.story_content));
    });

  useEffect(() => {
    fetchStory();
  }, []);

  return (
    <div className={styles.story}>
      <div className={styles.left}>
        {loading ? (
          <Skeleton type="img" />
        ) : (
          <img src={storyData?.image_url} alt="img-picstone" />
        )}
        {/* <div className={styles.tags}>
          {tags?.map((tag) => {
            return (
              <p key={tag} className={styles.tag}>
                {tag}
              </p>
            );
          })}
        </div> */}
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: story,
        }}
      ></p>
    </div>
  );
};

export default StoryPage;
