import { useEffect } from "react";

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
import { useDispatch, useSelector } from "react-redux";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";

const GenerateStory = () => {
  // AUTH DATA
  const { auth_data } = useSelector((state) => state.user);

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
    email: "",
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
      festive: false,
    },
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // UPDATE STORY DATA
    setStoryData({ ...storyData, file: file });
  };

  const handleThemeSelection = (theme) => {
    const updatedThemes = { ...storyData.themes };
    updatedThemes[theme] = !updatedThemes[theme];
    setStoryData({ ...storyData, themes: updatedThemes });
  };

  const handleRemoveImage = () => {
    setStoryData({ ...storyData, file: null });
  };

  // USE EFFECT FOR MAKING PAGE START FROM TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleGenerateStory = async () => {
    try {
      // Check if email is of correct format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(storyData.email)) {
        toast.error("Invalid email address");
        return;
      }

      if (storyData.file || storyData.email || storyData.title) {
        // Convert the image to base64
        const reader = new FileReader();

        reader.onload = async (event) => {
          try {
            const base64Image = event.target.result;

            setIsUploading(true);

            // Create a new object with the base64 image data
            const base64Data = { ...storyData, file: base64Image };

            console.log("data:", storyData);

            await uploadImage(base64Data, (responseData) => {
              dispatch(setStory(responseData.story));
              dispatch(setCloudinaryData(responseData.cloudinary_data));

              toast.success("Story generated successfully");
              navigate("/story");
            });

            setIsUploading(false);
          } catch (error) {
            toast.error("Error uploading image");
            setIsUploading(false);
          }
        };

        // Read the image file as a data URL (base64 format)
        reader.readAsDataURL(storyData.file);
      } else {
        // Handle the case where no file is selected
        toast.error("No file selected for upload or email/title is incomplete");
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
            <p
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Upload image
              <br />
              <span
                style={{
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                {"Max Size: 2MB"}
              </span>
            </p>
          </ImageUploader>
        )}
      </div>
      <div className={styles.inputs}>
        <Input
          type={"text"}
          value={storyData.title}
          onChange={(event) =>
            setStoryData({ ...storyData, title: event.target.value })
          }
          placeholder={"Enter your story title..."}
          label={"Story Title"}
          className={styles.input}
        />

        {!auth_data?.session_token && (
          <Input
            value={storyData.email}
            type={"email"}
            onChange={(event) =>
              setStoryData({ ...storyData, email: event.target.value })
            }
            placeholder={"Enter your email..."}
            label={"Email Address"}
            className={styles.input}
          />
        )}

        <Textarea
          rows={8}
          value={storyData.description}
          onChange={(event) =>
            setStoryData({ ...storyData, description: event.target.value })
          }
          placeholder={"Provide a brief about the story..."}
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
          <Theme
            img_link={
              "https://res.cloudinary.com/dixoiunbw/image/upload/v1699783744/picstone/themes/mvcsl771af8qpdojxbch.jpg"
            }
            title={"Festive"}
            isSelected={storyData.themes.festive}
            onClick={() => handleThemeSelection("festive")}
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
