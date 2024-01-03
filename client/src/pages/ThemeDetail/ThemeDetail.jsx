import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// CONSTANTS
import { theme } from "./../../constant";
import styles from "./ThemeDetail.module.scss";

// API
import useTheme from "../../api/useTheme";
import useUnsplash from "../../api/useUnsplash";

const ThemeDetail = () => {
  console.log("ThemeDetail");
  const [images, setImages] = useState([]);
  const [themeData, setThemeData] = useState({});

  const { getThemeImages, loadingImg } = useUnsplash();
  const { getAllStoryByTheme, themeLoading } = useTheme();
  const { themeName } = useParams();

  const fetchImages = async () => {
    // CREATE A PAYLOAD
    const payload = {
      theme: themeName ? themeName : "",
    };
    await getThemeImages(payload, (responseData) => {
      console.log(responseData);
      setImages(responseData ? responseData : []);
    });
  };

  // FETCH ALL STORIES BY THEME
  const fetchAllStoriesByTheme = async () => {
    const payload = {
      theme: themeName ? themeName : "",
    };
    await getAllStoryByTheme(payload, (responseData) => {
      console.log(responseData);
      setThemeData(responseData ? responseData : {});
    });
  };

  useEffect(() => {
    fetchImages();
    fetchAllStoriesByTheme();
  }, [themeName]);

  return (
    <div className={styles.theme}>
      {/* HERO */}
      {/* IMAGES SECTION */}
      {/* PREVIOUS STORIES */}
    </div>
  );
};

export default ThemeDetail;
