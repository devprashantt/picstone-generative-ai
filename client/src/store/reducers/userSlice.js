import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth_data: {
        email: JSON.parse(localStorage.getItem('email')) || null,
        session_token: JSON.parse(localStorage.getItem('session_token')) || null,
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user
        setUser: (state, action) => {
            // Set user session token from payload
            state.auth_data.session_token = action.payload.session_token;
            state.auth_data.email = action.payload.email;

            // Save user to local storage
            localStorage.setItem('session_token', JSON.stringify(action.payload.session_token));
            localStorage.setItem('email', JSON.stringify(action.payload.email));
        },

        // Logout user
        logoutUser: (state) => {
            state.user = {};
            localStorage.removeItem('user');
        },
        // Add other reducers here
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
