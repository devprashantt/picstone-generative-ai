import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./StoryPage.module.scss";

// SKELETON
import { Card, Skeleton } from "../../components";
// API
import useStory from "../../api/useStory";
import useUser from "../../api/useUser";

// UTILS
import replaceNewlinesWithBr from "../../utility/replaceNewLineWithBr";

const StoryPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { getStoryById, loading } = useStory();
  const { getUserPublicData, publicLoading } = useUser();

  const [storyData, setStoryData] = useState({});
  const [userData, setUserData] = useState({});

  const fetchStory = async () =>
    await getStoryById(id, (responseData) => {
      setStoryData(responseData?.story);
    });

  const fetchUser = async () => {
    await getUserPublicData(id, (responseData) => {
      setUserData(responseData);
    });
  };

  const handleTagClick = (e) => {
    const tag = e.target.textContent;
    navigate(`/tags/${tag}`);
  };

  useEffect(() => {
    fetchStory();
    fetchUser();

    // CLEAN UP
    return () => {
      setStoryData({});
      setUserData({});
    };
  }, []);

  // TAKE USER TO TOP PAGE
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.story}>
      <div className={styles.left}>
        {loading ? (
          <Skeleton type="img" />
        ) : (
          <div className={styles.image}>
            <img src={storyData?.image_url} alt="img-picstone" />
          </div>
        )}
        <div className={styles.tags}>
          {loading
            ? // SHOW 6 TAGS
              Array.from(Array(6).keys()).map((_, i) => {
                return <Skeleton key={i} type="text" />;
              })
            : storyData?.tags?.slice(0, 10).map((tag) => {
                return (
                  <p key={tag} className={styles.tag} onClick={handleTagClick}>
                    {tag}
                  </p>
                );
              })}
        </div>
      </div>
      <p
        className={styles.story_content}
        dangerouslySetInnerHTML={{
          __html: replaceNewlinesWithBr(storyData?.story_content),
        }}
      ></p>
      <div className={styles.user}>
        {/* <div className={styles.user_detail}>
          <div className={styles.profile}>
            <img src={images.profile} alt="profile" />
          </div>
          <div className={styles.details}>
            <p className={styles.name}>{userData?.user_details?.name}</p>
            <p className={styles.email}>{userData?.user_details?.email}</p>
          </div>
        </div> */}
        <h1>More from the creators</h1>
        <div className={styles.user_stories}>
          {
            // SHOW 3 STORIES
            publicLoading
              ? Array.from(Array(3).keys()).map((_, i) => {
                  return <Skeleton key={i} type="card" />;
                })
              : userData?.stories?.slice(0, 3).map((story) => {
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
                })
          }
        </div>
      </div>
    </div>
  );
};

export default StoryPage;
