import axios from 'axios';

const useStory = () => {
    // UPLOAD IMAGE
    const uploadImage = async (payload, cb) => {
        try {
            const res = await axios.post(`/v1/story/upload`, payload);
            if (res.statusText !== 'OK')
                throw new Error(res.msg || 'Some error occured, please try again');
            if (cb && typeof cb === 'function') cb(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // TEST API
    const testApi = async (cb) => {
        try {
            const res = await axios.get(`/v1/story/test`);
            if (res.statusText !== 'OK')
                throw new Error(res.msg || 'Some error occured, please try again');
            if (cb && typeof cb === 'function') cb(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return {
        uploadImage,
        testApi
    }
}

export default useStory