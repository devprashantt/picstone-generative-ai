// REACT IMPORTS
import { useRef } from "react";
import PropTypes from "prop-types";

import styles from "./ImageUploader.module.scss";

const ImageUploader = ({ handleFileChange, className, children }) => {
  // REF
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  return (
    <div
      onClick={handleImageClick}
      className={`${className} ${styles.uploader}`}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
      />
      {children}
    </div>
  );
};

ImageUploader.propTypes = {
  handleFileChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default ImageUploader;
