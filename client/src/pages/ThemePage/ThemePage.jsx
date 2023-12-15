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
      images_link: theme.diwaliTheme.imagesLink,
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
      images_link: theme.christmasTheme.imagesLink,
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
        imagesLinks={theme.christmasTheme.imagesLink}
        heading={theme.christmasTheme.heading}
        subHeading={theme.christmasTheme.subHeading}
        description={theme.christmasTheme.description}
        handleTheme={() => handleChristmasTheme()}
        isLoading={loading}
      />
      <Theme
        imagesLinks={theme.diwaliTheme.imagesLink}
        heading={theme.diwaliTheme.heading}
        subHeading={theme.diwaliTheme.subHeading}
        description={theme.diwaliTheme.description}
        handleTheme={() => handleDiwaliTheme()}
        isLoading={loading}
      />
      <Theme
        imagesLinks={theme.winterTheme.imagesLink}
        heading={theme.winterTheme.heading}
        subHeading={theme.winterTheme.subHeading}
        description={theme.winterTheme.description}
        handleTheme={() => console.log("Winter Theme Clicked")}
        isLoading={loading}
      />
    </div>
  );
};

export default ThemePage;
