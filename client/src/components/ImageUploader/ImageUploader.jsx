// REACT IMPORTS
import { useRef, useState } from "react";

// CONSTANTS
import styles from "./ImageUploader.module.scss";

// ROUTER DOM
import { useNavigate } from "react-router-dom";

// USE APIS
import useStory from "../../api/useStory";

// REDUX STATE
import { useDispatch } from "react-redux";
import { setStory, setCloudinaryData } from "../../store/reducers/storySlice";

const ImageUploader = () => {
  // REF
  const inputRef = useRef(null);

  // REDUX DISPATCH
  const dispatch = useDispatch();

  // NAVIGATE
  const navigate = useNavigate();

  // UPLOADING STATE
  const [isUploading, setIsUploading] = useState(false);

  // UPLOAD STORY
  const { uploadImage } = useStory();

  const handleImageClick = () => {
    // Trigger the hidden input element when the area is clicked
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    // Handle the selected file when it changes
    const file = event.target.files[0];

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", file); // Assuming 'file' is the name expected by the backend

    try {
      console.log("Uploading image...", formData);

      setIsUploading(true); // Set the uploading state to true

      // You can remove the forEach loop for debugging, as it's not needed
      // formData.forEach((value, key) => {
      //   console.log(key, value);
      // });

      await uploadImage(formData, (responseData) => {
        console.log("Response data:", responseData);
        dispatch(setStory(responseData.story));
        dispatch(setCloudinaryData(responseData.cloudinary_data));
        navigate("/story");
      });

      setIsUploading(false); // Set the uploading state back to false

      // You can update your UI or take further actions based on the response
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false); // Set the uploading state to false in case of an error
      // Handle errors if necessary
    }
  };

  return (
    <div onClick={handleImageClick}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      <p className={styles.button}>
        {isUploading ? "Uploading..." : "Upload an image"}
      </p>
    </div>
  );
};

export default ImageUploader;
