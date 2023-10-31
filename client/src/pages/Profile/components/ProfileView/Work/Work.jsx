import styles from "./Work.module.scss";

import useStory from "../../../../../api/useStory";

import { Card, Skeleton } from "./../../../../../components";
import { useEffect, useState } from "react";

const Work = () => {
  const { getUserStories, loading } = useStory();

  const [userStories, setUserStories] = useState([]);

  useEffect(() => {
    getUserStories((userStories) => {
      console.log("userStories->", userStories.stories);
      setUserStories(userStories.stories);
    });
  }, []);

  return (
    <div className={styles.work}>
      {loading
        ? // 6 SKELETON
          [...Array(6)].map((_, index) => {
            return <Skeleton key={index} />;
          })
        : userStories
            ?.slice(0, userStories.length)
            .reverse()
            .map((userStory) => {
              return (
                <Card
                  key={userStory.id}
                  link={`/story/${userStory.id}`}
                  img={userStory.image_url}
                  heading={userStory.story_title}
                  description={userStory.story_content}
                />
              );
            })}
    </div>
  );
};

export default Work;
