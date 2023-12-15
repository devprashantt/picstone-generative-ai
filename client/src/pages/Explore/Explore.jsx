import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import styles from "./Explore.module.scss";
import PropTypes from "prop-types";

// COMPONENTS
import { Card, Skeleton, Hero, Input } from "../../components";

// API's
import useStory from "../../api/useStory";
import useTags from "../../api/useTags";
import { images } from "../../constant";

const Explore = ({ storyLength }) => {
  const { getStoriesByPage, searchStory, loading } = useStory();
  const { getAllTags, tagLoading } = useTags();

  // STATE TO MANAGE ALL STORIES
  const [story, setStory] = useState([]);
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);

  // STATE VARIABLE FOR SEARCH QUERY
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStories = async (pageNumber) => {
    await getStoriesByPage(pageNumber ? pageNumber : 1, (responseData) => {
      setStory(responseData.stories);
    });
  };

  const fetchTags = async () => {
    await getAllTags((responseData) => {
      setTags(responseData.tags);
    });
  };

  // FILTER STORIES BASED ON SEARCH QUERY USING SEARCH STORY SUCH THAT INITIALLY SHOW ALL
  const filterStories = async () => {
    // CALL ONLY WHEN INPUT CHANGES NOT INITIALLY
    if (searchQuery) {
      await searchStory(searchQuery, (responseData) => {
        setStory(responseData.stories);
      });
    } else {
      fetchStories();
    }
  };

  const handleRightClick = () => {
    setPage((prevPage) => prevPage + 1);
    fetchStories(page + 1); // Pass the updated page value
  };

  const handleLeftClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      fetchStories(page - 1); // Pass the updated page value
    }
  };

  //  USE EFFECT TO FILTER STORIES BASED ON SEARCH QUERY
  useEffect(() => {
    // SET DEBOUNCING
    const timer = setTimeout(() => {
      filterStories();
    }, 1000);

    // CLEAN UP FUNCTION
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  //  FETCH ALL STORIES
  useEffect(() => {
    fetchStories();
    fetchTags();
  }, []);

  useEffect(() => {}, [story]);

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
                    <Skeleton type="tags" key={index} />
                  </div>
                ))
              : tags?.slice(0, 5)?.map((tag, index) => {
                  return (
                    <motion.div
                      key={index}
                      whileInView={{ y: [120, 50, 0], opacity: [0, 0, 1] }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5,
                      }}
                    >
                      <Link
                        className={styles.tag}
                        to={{
                          pathname: `/tags/${tag}`,
                          state: {
                            tag_name: tag,
                          },
                        }}
                      >
                        {tag}
                      </Link>
                    </motion.div>
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
              story
                ?.slice(
                  storyLength ? story?.length - storyLength : 0,
                  story?.length
                )
                .map((story) => {
                  return (
                    <Card
                      key={story?.id}
                      img={story?.image_url}
                      heading={
                        story?.story_title ? story?.story_title : "Picstone"
                      }
                      description={story?.story_content}
                      link={`/story/${story?.id}`}
                    />
                  );
                })}
        </div>
      </div>
      <div className={styles.page}>
        <div className={styles.btn} onClick={handleLeftClick}>
          <img src={images.arrow_left} alt="left" />
        </div>
        {/* SHOW CURRENT */}
        <div className={styles.current}>{page}</div>
        <div className={styles.btn} onClick={handleRightClick}>
          <img src={images.arrow_right} alt="right" />
        </div>
      </div>
    </div>
  );
};

Explore.propTypes = {
  storyLength: PropTypes.number,
};

export default Explore;
