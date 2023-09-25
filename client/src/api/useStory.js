const useStory = () => {
    // UPLOAD IMAGE
    const uploadImage = async (payload, cb) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate-story`, {
                method: 'POST',
                body: payload,
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
        }
    };

    return {
        uploadImage,
    };
};

export default useStory;
