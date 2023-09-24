import axios from 'axios';

const useStory = () => {
    // UPLOAD IMAGE
    const uploadImage = async (payload, cb) => {
        try {
            // Make sure the URL is correct
            const res = await axios.post(`/generate-story`, payload);

            if (res.status !== 200) {
                throw new Error(res.data.error || 'Some error occurred, please try again');
            }

            if (cb && typeof cb === 'function') {
                cb(res.data);
            }

            console.log(res.data);
        } catch (err) {
            console.error(err);
            // Handle errors if necessary
        }
    };

    return {
        uploadImage
    }
}

export default useStory;
