import { Input, Button, ImageUploader, Textarea } from "../../components";

import Theme from "./components/Theme/Theme";
import Suggestion from "./components/Suggestion/Suggestion";

import styles from "./GenerateStory.module.scss";
import { images } from "../../constant";

// REACT IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// USE APIS
import useStory from "../../api/useStory";

// REDUX STATE
import { useDispatch } from "react-redux";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";

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
      fantasy: false,
      survival: false,
      mystery: false,
      biography: false,
      halloween: false,
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
      if (storyData.file) {
        // Convert the image to base64
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            const base64Image = event.target.result;

            console.log("Uploading image...", storyData);

            setIsUploading(true);

            // Create a new object with the base64 image data
            const base64Data = { ...storyData, file: base64Image };

            await uploadImage(base64Data, (responseData) => {
              console.log("Response data:", responseData);
              dispatch(setStory(responseData.story));
              dispatch(setCloudinaryData(responseData.cloudinary_data));

              toast.success("Story generated successfully");
              navigate("/story");
            });

            setIsUploading(false);
          } catch (error) {
            toast.error("Error uploading image");
            console.error("Error converting image to base64:", error);
            setIsUploading(false);
          }
        };

        // Read the image file as a data URL (base64 format)
        reader.readAsDataURL(storyData.file);
      } else {
        // Handle the case where no file is selected
        toast.error("No file selected for upload");
      }
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
          label={"Story Title"}
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
        <Suggestion />
      </div>
      <div className={styles.theme}>
        <p className={styles.label}>{"Theme"}</p>
        <div className={styles.themes}>
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697917569/picstone/themes/ddcvlnzdfbzambf357ba.jpg"
            }
            title={"Halloween"}
            isSelected={storyData.themes.halloween}
            onClick={() => handleThemeSelection("halloween")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697208046/picstone/themes/btkyu0z3xasnqssw6mwp.jpg"
            }
            title={"Romance"}
            isSelected={storyData.themes.romance}
            onClick={() => handleThemeSelection("romance")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697145296/picstone/themes/yyp6lqubhqdw64o3nisx.jpg"
            }
            title={"Horror"}
            isSelected={storyData.themes.horror}
            onClick={() => handleThemeSelection("horror")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697145552/picstone/themes/nvz2olgc5otz2ogtia75.jpg"
            }
            title={"Sci-Fi"}
            isSelected={storyData.themes.scifi}
            onClick={() => handleThemeSelection("scifi")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697208046/picstone/themes/w0bh9ezersy2teynrexl.webp"
            }
            title={"Fantasy"}
            isSelected={storyData.themes.fantasy}
            onClick={() => handleThemeSelection("fantasy")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697208047/picstone/themes/nhwuzljbvr07lgevtk9j.jpg"
            }
            title={"Survival"}
            isSelected={storyData.themes.survival}
            onClick={() => handleThemeSelection("survival")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697208047/picstone/themes/t8uqfwbgw0ri2hsl0x76.jpg"
            }
            title={"Mystery"}
            isSelected={storyData.themes.mystery}
            onClick={() => handleThemeSelection("mystery")}
          />
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1697208046/picstone/themes/icmogpttkhmkgc4btit6.jpg"
            }
            title={"Biography"}
            isSelected={storyData.themes.biography}
            onClick={() => handleThemeSelection("biography")}
          />
        </div>
      </div>
      <Button
        onClick={handleGenerateStory}
        buttonText="Generate Story"
        className={styles.button}
        isLoading={isUploading}
        isLoadingText={"Generating Story..."}
      />
    </div>
  );
};

export default GenerateStory;
