// store/reducers.js

import { combineReducers } from 'redux';
import storyReducer from './reducers/storySlice';

const rootReducer = combineReducers({
    story: storyReducer,
    // Add other reducers here
});

export default rootReducer;
