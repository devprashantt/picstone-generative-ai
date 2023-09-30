import { useState, useEffect } from "react";

import styles from "./Explore.module.scss";
import PropTypes from "prop-types";

// COMPONENTS
import { Card, Skeleton } from "../../components";

// API's
import useStory from "../../api/useStory";

const Explore = ({ storyLength }) => {
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
          Array.from({ length: 9 }).map((_, index) => <Skeleton key={index} />)
        : // Display the actual content when data is available
          story
            ?.slice(
              storyLength ? story?.length - storyLength : 0,
              story?.length
            )
            .reverse()
            .map((story) => {
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

Explore.propTypes = {
  storyLength: PropTypes.number,
};

export default Explore;
