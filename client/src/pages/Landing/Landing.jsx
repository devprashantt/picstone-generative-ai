import useStory from "../../api/useStory";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";
import { useDispatch } from "react-redux";
import { theme } from "../../constant";

import { Hero, Theme } from "../../components";
import styles from "./Landing.module.scss";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { themedStory, loading } = useStory();

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
    <div className={styles.landing}>
      {/* HERO */}
      <Hero
        warning={true}
        img_btn={false}
        btn={true}
        btn_text={"Generate story"}
        to={"generate-story"}
      />
      {/* GAP */}
      {/* <div
        style={{
          height: "2rem",
          width: "100%",
        }}
      /> */}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0 2rem  0",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          color: "#7c7c7c",
          textAlign: "center",
        }}
      >
        <h2>✨ OCR For Text Extraction From Images Supported Now!! ✨</h2>
      </div>

      <Theme
        imagesLinks={theme.christmasTheme.imagesLink}
        heading={theme.christmasTheme.heading}
        subHeading={theme.christmasTheme.subHeading}
        description={theme.christmasTheme.description}
        handleTheme={() => handleChristmasTheme()}
        isLoading={loading}
      />

      {/* <Theme /> */}
    </div>
  );
};

export default Landing;
