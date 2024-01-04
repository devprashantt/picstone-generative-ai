import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// CONSTANTS
import { theme } from "./../../constant";
import styles from "./ThemeDetail.module.scss";

// COMPONENTS
import { Theme, Hero, Card, Skeleton } from "./../../components";

// API
import useTheme from "../../api/useTheme";
import useUnsplash from "../../api/useUnsplash";
import useStory from "../../api/useStory";

// STATE
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";

const ThemeDetail = () => {
  const [images, setImages] = useState([]);
  const [themeData, setThemeData] = useState({});

  const { getThemeImages, loadingImg } = useUnsplash();
  const { getAllStoryByTheme, themeLoading } = useTheme();
  const { themedStory, loading } = useStory();
  const { themeName } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // FETCH IMAGES
  const fetchImages = async () => {
    // CREATE A PAYLOAD
    const payload = {
      count: 5,
      theme: themeName ? themeName : "",
    };
    await getThemeImages(payload, (responseData) => {
      console.log(responseData);
      setImages(responseData ? responseData : []);
    });
  };

  // FETCH ALL STORIES BY THEME
  const fetchAllStoriesByTheme = async () => {
    const payload = {
      theme: themeName ? themeName : "",
    };
    await getAllStoryByTheme(payload, (responseData) => {
      console.log(responseData);
      setThemeData(responseData ? responseData : {});
    });
  };

  // HANDLE THEME
  const handleTheme = (themeName) => {
    // PAYLOAD
    const payload = {
      theme: themeName,
      images_link: images.map((image) => image?.urls?.regular),
    };

    // SEND REQ TO BACKEND WITH ALL IMAGE LINKS IN PAYLOAD
    themedStory(payload, (response, err) => {
      if (err) {
        console.log(err);
      } else {
        // DISPACTH TO REDUCER
        dispatch(setStory(response?.story));
        dispatch(setCloudinaryData(response?.cloudinary_data));
        toast.success("Story generated successfully");
        navigate("/story");
      }
    });
  };

  useEffect(() => {
    fetchImages();
    fetchAllStoriesByTheme();
  }, []);

  return (
    <div className={styles.theme}>
      {/* HERO SECTION */}
      <Hero
        heading={themeName ? theme[themeName]?.heading : ""}
        description={themeName ? theme[themeName]?.description : ""}
        subHeading={themeName ? theme[themeName]?.subHeading : ""}
        btn_text={"Generate Story"}
        isLoading={loading}
        btn={true}
        onClick={
          themeName
            ? () => {
                handleTheme(themeName);
              }
            : () => {}
        }
      />
      {/* IMAGES */}
      <div className={styles.images}>
        {loadingImg ? (
          <Skeleton type={"img"} />
        ) : (
          images?.map((image, index) => (
            <img
              key={image?.id}
              src={image?.urls?.regular}
              alt={image?.alt_description}
              className={styles.image}
              style={{
                gridArea:
                  index === 0
                    ? "e"
                    : index === 1
                    ? "a"
                    : index === 2
                    ? "b"
                    : index === 3
                    ? "c"
                    : index === 4
                    ? "d"
                    : "f",
              }}
            />
          ))
        )}
      </div>
      {/* MORE FROM SAME STORIES */}
      <div className={styles.theme_detail}>
        <h2 className={styles.heading}>
          More from{" "}
          {
            // MAKE THEME NAM EFIRST LETTER CAPITAL
            themeName
              ? themeName.charAt(0).toUpperCase() + themeName.slice(1)
              : ""
          }{" "}
          theme
        </h2>
        <div className={styles.stories}>
          {themeLoading
            ? Array.from({ length: 9 }).map((_, index) => (
                <Skeleton key={index} />
              ))
            : themeData?.stories?.map((story) => (
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
    </div>
  );
};

export default ThemeDetail;
