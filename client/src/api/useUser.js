import { useState } from "react";

const useUser = () => {
    const [loading, setLoading] = useState(false);

    // REGISTER
    const registerUser = async (user, cb) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
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

    // LOGIN
    const loginUser = async (user, cb) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
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

    return {
        loading,
        registerUser,
        loginUser
    };
};

export default useUser;
