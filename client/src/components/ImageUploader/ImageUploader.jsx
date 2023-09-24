import { useRef } from "react";
import PropTypes from "prop-types";

// CONSTANTS
import styles from "./ImageUploader.module.scss";

// USE APIS
import useStory from "../../api/useStory";

const ImageUploader = ({ onImageUpload }) => {
  const inputRef = useRef(null);
  const { uploadImage, testApi } = useStory();

  const handleImageClick = () => {
    // Trigger the hidden input element when the area is clicked
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    // Handle the selected file when it changes
    const selectedFile = event.target.files[0];

    // You can perform validation on the selected file here if needed

    // Pass the selected file to the parent component for further processing
    if (selectedFile) {
      onImageUpload(selectedFile);
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
