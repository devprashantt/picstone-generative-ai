import styles from "./ThemePage.module.scss";

import { Theme } from "./../../components";
import { theme } from "../../constant";

import useStory from "../../api/useStory";

// REDUX STATE
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";

const ThemePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themedStory, loading } = useStory();

  const handleDiwaliTheme = () => {
    // PAYLOAD
    const payload = {
      theme: "diwali",
      images_link: theme.diwali.imagesLink,
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

  const handleChristmasTheme = () => {
    // PAYLOAD
    const payload = {
      theme: "christmas",
      images_link: theme.christmas.imagesLink,
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

  const handleNewYearTheme = () => {
    // PAYLOAD
    const payload = {
      theme: "newYear",
      images_link: theme.ne.imagesLink,
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

  return (
    <div className={styles.theme}>
      <Theme
        imagesLinks={theme.newYear.imagesLink}
        heading={theme.newYear.heading}
        subHeading={theme.newYear.subHeading}
        description={theme.newYear.description}
        theme={theme.newYear.theme}
        isLoading={loading}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          color: "#7c7c7c",
          textAlign: "center",
        }}
      >
        <h1>✨ Older Themes ✨</h1>
      </div>
      <Theme
        imagesLinks={theme.christmas.imagesLink}
        heading={theme.christmas.heading}
        subHeading={theme.christmas.subHeading}
        description={theme.christmas.description}
        theme={theme.christmas.theme}
        isLoading={loading}
      />
      <Theme
        imagesLinks={theme.diwali.imagesLink}
        heading={theme.diwali.heading}
        subHeading={theme.diwali.subHeading}
        description={theme.diwali.description}
        theme={theme.diwali.theme}
        isLoading={loading}
      />
      <Theme
        imagesLinks={theme.winter.imagesLink}
        heading={theme.winter.heading}
        subHeading={theme.winter.subHeading}
        description={theme.winter.description}
        theme={theme.winter.theme}
        isLoading={loading}
      />
    </div>
  );
};

export default ThemePage;
