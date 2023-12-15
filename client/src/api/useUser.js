import { useState } from "react";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [publicLoading, setPublicLoading] = useState(false);

  // REGISTER
  const registerUser = async (user, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        console.log(data.error);

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

  // LOGIN
  const loginUser = async (user, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/signin`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
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

  // GET USER DATA
  const getUserData = async (cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user-data`,
        {
          method: "GET",
          credentials: "include",
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

  const getUserPublicData = async (story_id, cb) => {
    try {
      setPublicLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user-stories/public/${story_id}`,
        {
          method: "GET",
          credentials: "include",
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
      setPublicLoading(false);
    }
  };

  return {
    loading,
    publicLoading,
    registerUser,
    loginUser,
    getUserData,
    getUserPublicData,
  };
};

export default useUser;
