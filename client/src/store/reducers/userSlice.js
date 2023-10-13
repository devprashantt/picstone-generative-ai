import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user
        setUser: (state, action) => {
            state.user = action.payload;

            // Save user to local storage
            localStorage.setItem('user', JSON.stringify(action.payload));
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
