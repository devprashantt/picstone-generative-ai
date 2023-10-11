import { Input, Button, ImageUploader, Textarea } from "../../components";
import Theme from "./components/Theme/Theme";
import styles from "./GenerateStory.module.scss";
import { useState } from "react";

// ROUTER DOM
import { useNavigate } from "react-router-dom";

// USE APIS
import useStory from "../../api/useStory";

// REDUX STATE
import { useDispatch } from "react-redux";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";
import { images } from "../../constant";

const GenerateStory = () => {
  // REDUX DISPATCH
  const dispatch = useDispatch();

  // NAVIGATE
  const navigate = useNavigate();

  // UPLOAD STORY
  const { uploadImage } = useStory();

  // UPLOADING STATE
  const [isUploading, setIsUploading] = useState(false);

  const [storyData, setStoryData] = useState({
    title: "",
    description: "",
    file: null,
    themes: {
      romance: false,
      horror: false,
      scifi: false,
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // UPDATE STORY DATA
    setStoryData({ ...storyData, file: file });
  };

  const handleThemeSelection = (theme) => {
    console.log("Theme:", theme);
    const updatedThemes = { ...storyData.themes };
    updatedThemes[theme] = !updatedThemes[theme];
    setStoryData({ ...storyData, themes: updatedThemes });
  };

  const handleRemoveImage = () => {
    setStoryData({ ...storyData, file: null });
  };

  const handleGenerateStory = async () => {
    try {
      console.log("Uploading image...", storyData);

      setIsUploading(true);

      await uploadImage(storyData, (responseData) => {
        console.log("Response data:", responseData);
        dispatch(setStory(responseData.story));
        dispatch(setCloudinaryData(responseData.cloudinary_data));
        navigate("/story");
      });

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.generate_story}>
      <h1>{"Generate Story from Image"}</h1>
      <div className={styles.image}>
        <p className={styles.label}>{"Upload Image"}</p>
        {storyData.file ? (
          <div className={styles.uploaded}>
            <img
              src={URL.createObjectURL(storyData.file)}
              alt="Uploaded"
              className={styles.uploaded_image}
            />
            <p className={styles.uploaded_text} onClick={handleRemoveImage}>
              Remove image
            </p>
          </div>
        ) : (
          <ImageUploader
            handleFileChange={handleFileChange}
            isUploading={isUploading}
            className={styles.image_uploader}
          >
            <img src={images.upload} alt="upload" />
            <p>Upload image</p>
          </ImageUploader>
        )}
      </div>
      <div className={styles.inputs}>
        <Input
          value={storyData.title}
          onChange={(event) =>
            setStoryData({ ...storyData, title: event.target.value })
          }
          placeholder={"Title"}
          label={"Title"}
          className={styles.input}
        />

        <Textarea
          rows={8}
          value={storyData.description}
          onChange={(event) =>
            setStoryData({ ...storyData, description: event.target.value })
          }
          placeholder={"Description"}
          label={"Description"}
        />
      </div>
      <div className={styles.theme}>
        <p className={styles.label}>{"Theme"}</p>
        <div className={styles.themes}>
          <Theme
            img_link={images.nature}
            title={"Romance"}
            isSelected={storyData.themes.romance}
            onClick={() => handleThemeSelection("romance")}
          />
          <Theme
            img_link={images.nature}
            title={"Horror"}
            isSelected={storyData.themes.horror}
            onClick={() => handleThemeSelection("horror")}
          />
          <Theme
            img_link={images.nature}
            title={"Sci-Fi"}
            isSelected={storyData.themes.scifi}
            onClick={() => handleThemeSelection("scifi")}
          />
        </div>
      </div>
      <Button
        onClick={handleGenerateStory}
        buttonText="Generate Story"
        className={styles.button}
      />
    </div>
  );
};

export default GenerateStory;
