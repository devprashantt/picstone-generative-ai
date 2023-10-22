import { useState } from "react";

const useStory = () => {
  const [loading, setLoading] = useState(false);
  // SEND SMS
  const sendMessage = async (payload, cb) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/send-message`,
        {
          method: "POST",
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

  return {
    loading,
    sendMessage,
  };
};

export default useStory;
