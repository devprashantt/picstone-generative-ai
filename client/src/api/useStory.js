import { useState } from "react";

const useStory = () => {
  const [loading, setLoading] = useState(false);

  // UPLOAD IMAGE
  const uploadImage = async (payload, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/generate-story`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
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
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
    } finally {
      setLoading(false);
    }
  };

  // GET ALL STORIES
  const getAllStories = async (cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/generate-story`
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
      setLoading(false);
    }
  };

  // GET STORIES BY PAGE
  const getStoriesByPage = async (page, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/generate-story/${page}`
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
      setLoading(false);
    }
  };

  // SEARCH STORY
  const searchStory = async (search_term, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/generate-story/search/${search_term}`
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
      setLoading(false);
    }
  };

  // GET STORY BY ID
  const getStoryById = async (story_id, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/generate-story/story/${story_id}`
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
      setLoading(false);
    }
  };

  // GET USER STORIES
  const getUserStories = async (cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user-stories`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploadImage,
    getAllStories,
    getStoryById,
    getUserStories,
    getStoriesByPage,
    searchStory,
  };
};

export default useStory;
