// REACT IMPORTS
import { useRef } from "react";
import PropTypes from "prop-types";

// STYLES
import styles from "./ImageUploader.module.scss";

const ImageUploader = ({
  handleFileChange,
  isUploading,
  className,
  children,
}) => {
  // REF
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div onClick={handleImageClick} className={`${className}`}>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleFileChange}
      />
      {children}
      <p className={styles.button}>
        {isUploading ? "Uploading..." : "Upload an image"}
      </p>
    </div>
  );
};

ImageUploader.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  isUploading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ImageUploader;
