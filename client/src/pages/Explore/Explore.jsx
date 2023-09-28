import { useState, useEffect } from "react";

import styles from "./Explore.module.scss";

// COMPONENTS
import { Card, Skeleton } from "../../components";

// API's
import useStory from "../../api/useStory";

const Explore = () => {
  const { getAllStories, loading } = useStory();

  //   STATE TO MANAGE ALL STORIES
  const [story, setStory] = useState([]);

  const fetchStories = async () => {
    await getAllStories((responseData) => {
      console.log("responseData", responseData.stories);
      setStory(responseData.stories);
    });
  };

  //   FETCH ALL STORIES
  useEffect(() => {
    fetchStories();
  }, []); // Empty dependency array to run this effect only once

  // Use another useEffect to log the updated state
  useEffect(() => {
    console.log("stories", story);
  }, [story]); // Dependency array includes 'story'

  return (
    <div className={styles.explore}>
      {loading
        ? // Display the skeleton loading UI when data is loading
          [1, 2, 3, 4, 5, 6]?.map((story) => {
            return <Skeleton key={story?.id} />;
          })
        : // Display the actual content when data is available
          story?.map((story) => {
            return (
              <Card
                key={story?.id}
                img={story?.image_url}
                heading={"Picstone"}
                description={story?.story_content}
                link={`/story/${story?.id}`}
              />
            );
          })}
    </div>
  );
};

export default Explore;
