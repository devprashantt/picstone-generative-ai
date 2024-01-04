import { combineReducers } from "redux";
import storyReducer from "./reducers/storySlice";
import userReducer from "./reducers/userSlice";
import themeReducer from "./reducers/themeSlice";

const rootReducer = combineReducers({
  story: storyReducer,
  user: userReducer,
  theme: themeReducer,
});

export default rootReducer;
