import { useState } from "react";
import { toast } from "react-toastify";

const useTheme = () => {
  const [loading, setLoading] = useState(false);
  const [generateLoading, setGeneratingLoading] = useState(false);

  // UPLOAD IMAGE
  const getAllStoryByTheme = async (payload, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${payload.theme}`,
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

      toast.success(
        `Successfully fetched all stories for ${payload.theme} theme`
      );
    } catch (err) {
      console.error(err);
      // Handle errors if necessary
      toast.error("Some error occurred, please try again later");
    } finally {
      setLoading(false);
    }
  };

  // THEMED STORY
  const themedStory = async (payload, cb) => {
    try {
      setGeneratingLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/stories/${payload.theme}`,
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
      setGeneratingLoading(false);
    }
  };

  return {
    themeLoading: loading,
    generateLoading: generateLoading,
    getAllStoryByTheme,
    themedStory,
  };
};

export default useTheme;
