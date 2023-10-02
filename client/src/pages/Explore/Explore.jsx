import { useState, useEffect } from "react";

import styles from "./Explore.module.scss";
import PropTypes from "prop-types";

// COMPONENTS
import { Card, Skeleton, Hero, Input } from "../../components";

// API's
import useStory from "../../api/useStory";
import useTags from "../../api/useTags";

const Explore = ({ storyLength }) => {
  const { getAllStories, loading } = useStory();
  const { getAllTags, tagLoading } = useTags();

  //   STATE TO MANAGE ALL STORIES
  const [story, setStory] = useState([]);
  const [tags, setTags] = useState([]);

  // STATE VARIABLE FOR SEARCH QUERY
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStories, setFilteredStories] = useState([]);

  const fetchStories = async () => {
    await getAllStories((responseData) => {
      console.log("responseData", responseData.stories);
      setStory(responseData.stories);
      setFilteredStories(responseData.stories);
    });
  };

  const fetchTags = async () => {
    await getAllTags((responseData) => {
      console.log("responseData", responseData.tags);
      setTags(responseData.tags);
      console.log("tags", tags);
    });
  };

  // FILTER STORIES BASED ON SEARCH QUERY
  const filterStories = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = story.filter((story) => {
      const story_content = story.story_content.toLowerCase();

      return story_content.includes(lowerCaseQuery);
    });
    setFilteredStories(filtered);
  };

  //  USE EFFECT TO FILTER STORIES BASED ON SEARCH QUERY
  useEffect(() => {
    filterStories();
  }, [searchQuery]);

  //  FETCH ALL STORIES
  useEffect(() => {
    fetchStories();
    fetchTags();
  }, []);

  useEffect(() => {
    console.log("stories", story);
  }, [story]);

  return (
    <div className={styles.explore}>
      <Hero
        subHeading={"Explore a World of Imagination and Creativity"}
        heading={"Discover Captivating Stories Through Visuals"}
        description={
          "Welcome to our Explore page, where stunning visuals blend seamlessly with captivating stories. Immerse yourself in a world full of creativity as you discover a diverse range of narratives that evoke emotions and spark your imagination."
        }
        btn={false}
      />
      <div className={styles.search_filter}>
        <Input
          placeholder={"Search for tags, titles, or descriptions"}
          type={"text"}
          name={"search"}
          className={styles.search}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className={styles.tags}>
          {
            // Display the skeleton loading UI when data is loading
            tagLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton type="tags" />
                  </div>
                ))
              : tags?.slice(0, 5)?.map((tag) => {
                  return (
                    <div className={styles.tag} key={tag?.id}>
                      {/* MAKE FIRST LETTER UPPERCASE AND WHOLE SHOULD NOT ME GREATER THAN 11 CHAR */}
                      {tag}
                    </div>
                  );
                })
          }
        </div>
      </div>
      <div className={styles.stories_container}>
        <h1 className={styles.heading}>Stories from the Picstone Community </h1>
        <div className={styles.stories}>
          {loading
            ? // Display the skeleton loading UI when data is loading
              Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : // Display the actual content when data is available
              filteredStories
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
      </div>
    </div>
  );
};

Explore.propTypes = {
  storyLength: PropTypes.number,
};

export default Explore;
