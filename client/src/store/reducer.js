// store/reducers.js

import { combineReducers } from 'redux';
import storyReducer from './reducers/storySlice';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
    story: storyReducer,
    user: userReducer,
    // Add other reducers here
});

export default rootReducer;
