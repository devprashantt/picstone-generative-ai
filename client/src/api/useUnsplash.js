import { useState } from "react";
import { toast } from "react-toastify";

const useUnsplash = () => {
  const [loadingImg, setLoadingImg] = useState(false);

  // UPLOAD IMAGE
  const getThemeImages = async (payload, cb) => {
    try {
      setLoadingImg(true);
      const response = await fetch(
        `https://api.unsplash.com/photos/random?${
          payload ? `&count=${payload.count}` : ""
        }${payload ? `&query=${payload.theme}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Client-ID ${
              import.meta.env.VITE_UNSPLASH_ACCESS_KEY
            }`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.json();

      if (cb && typeof cb === "function") {
        cb(data);
      }

      toast.success(
        `Successfully fetched all images for ${payload.theme} theme`
      );
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
      toast.error("Some error occurred, please try again later");
    } finally {
      setLoadingImg(false);
    }
  };

  return {
    loadingImg,
    getThemeImages,
  };
};

export default useUnsplash;
