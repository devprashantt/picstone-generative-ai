import { useRef } from "react";
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./ImageUploader.module.scss";

// USE APIS
import useStory from "../../api/useStory";

const ImageUploader = () => {
  const inputRef = useRef(null);
  const { uploadImage } = useStory();

  const handleImageClick = () => {
    // Trigger the hidden input element when the area is clicked
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    // Handle the selected file when it changes
    const selectedFile = event.target.files[0];

    // Check if a file was selected
    if (!selectedFile) {
      alert("Please select a file.");
      return; // Abort further processing
    }

    // Perform file type (extension) validation
    const allowedFileTypes = ["image/jpeg", "image/png"];
    if (!allowedFileTypes.includes(selectedFile.type)) {
      alert("Invalid file type. Please select a JPEG or PNG image.");
      return; // Abort further processing
    }

    // Perform file size validation (in bytes)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed (5MB).");
      return; // Abort further processing
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", selectedFile); // Assuming 'file' is the name expected by the backend

    try {
      await uploadImage(formData, (response) => {
        // Handle the response from the backend here
        console.log("Response from backend:", response);
        // You can update your UI or take further actions based on the response
      });
    } catch (error) {
      console.error("Error uploading image:", error);
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
      <p className={styles.button}>Upload an image</p>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageUpload: PropTypes.func.isRequired,
};

export default ImageUploader;
