import { Input, Button, ImageUploader } from "../../components";
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

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log("Uploading image...", formData);

      setIsUploading(true); // Set the uploading state to true

      await uploadImage(formData, (responseData) => {
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
      <div className={styles.inputs}>
        <Input />

        <div className={styles.describe}></div>

        <div className={styles.image}>
          <p className={styles.label}>{}</p>
          <ImageUploader
            handleFileChange={handleFileChange}
            isUploading={isUploading}
            className={styles.image_uploader}
          >
            <img src={images} alt="" />
          </ImageUploader>
        </div>
      </div>
      <Button />
    </div>
  );
};

export default GenerateStory;
