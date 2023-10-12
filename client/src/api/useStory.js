import { useState } from "react";

const useStory = () => {
    const [loading, setLoading] = useState(false);
    // UPLOAD IMAGE
    const uploadImage = async (payload, cb) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-story`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Some error occurred, please try again');
            }

            const data = await response.json();

            if (cb && typeof cb === 'function') {
                cb(data);
            }

            console.log(data);
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-story`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Some error occurred, please try again');
            }

            const data = await response.json();

            if (cb && typeof cb === 'function') {
                cb(data);
            }

            console.log(data);
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
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-story/${story_id}`);

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Some error occurred, please try again');
            }

            const data = await response.json();

            if (cb && typeof cb === 'function') {
                cb(data);
            }

            console.log(data);
        } catch (err) {
            console.error(err);
            // Handle errors if necessary
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        uploadImage,
        getAllStories,
        getStoryById
    };
};

export default useStory;
