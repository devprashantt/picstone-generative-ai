import styles from "./StoryByTag.module.scss";

import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import useTags from "../../api/useTags";
import { Card, Skeleton } from "../../components";

const StoryByTag = () => {
  const { getStoryByTag, tagLoading } = useTags();
  const { tag } = useParams();

  const [storyByTag, setStoryByTag] = useState([]);

  const fetchStoryByTag = async () => {
    await getStoryByTag(tag, (responseData) => {
      console.log("responseData", responseData);
      setStoryByTag(responseData.stories);
    });
  };

  useEffect(() => {
    fetchStoryByTag();
  }, []);

  return (
    <div className={styles.stories_container}>
      <h1 className={styles.heading}>{tag}</h1>
      <div className={styles.stories}>
        {/* IF TAG LOADING SHOW SKELETON */}
        {tagLoading
          ? Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : storyByTag
              ?.slice(0, storyByTag?.length)
              .reverse()
              .map((story) => (
                <Card
                  key={story?.id}
                  img={story?.image_url}
                  heading={story?.story_title ? story?.story_title : "Picstone"}
                  description={story?.story_content}
                  link={`/story/${story?.id}`}
                />
              ))}
      </div>
    </div>
  );
};

export default StoryByTag;
