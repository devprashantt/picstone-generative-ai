import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cloudinaryData: {},
    story: '',
};

const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setCloudinaryData: (state, action) => {
            state.cloudinaryData = action.payload;
        },
        setStory: (state, action) => {
            state.story = action.payload;
        },
    },
});

export const { setCloudinaryData, setStory } = storySlice.actions;

export default storySlice.reducer;
