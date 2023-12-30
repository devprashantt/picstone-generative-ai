import { useState } from "react";

const useTags = () => {
  const [tagLoading, setTagLoading] = useState(false);
  // GET ALL TAGS
  const getAllTags = async (cb) => {
    try {
      setTagLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/tags`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.json();

      if (cb && typeof cb === "function") {
        cb(data);
      }
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
    } finally {
      setTagLoading(false);
    }
  };

  // GET STORY BY TAG
  const getStoryByTag = async (tag, cb) => {
    try {
      setTagLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tags/${tag}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.json();

      if (cb && typeof cb === "function") {
        cb(data);
      }
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
    } finally {
      setTagLoading(false);
    }
  };

  // GET SEARCHED TAGS
  const getSearchedTags = async (tag, cb) => {
    try {
      setTagLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/tags/search/${tag}`
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Some error occurred, please try again");
      }

      const data = await response.json();

      if (cb && typeof cb === "function") {
        cb(data);
      }
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
    } finally {
      setTagLoading(false);
    }
  };

  return {
    tagLoading,
    getAllTags,
    getStoryByTag,
    getSearchedTags,
  };
};

export default useTags;
