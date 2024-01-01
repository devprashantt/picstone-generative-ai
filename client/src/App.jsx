// REDUCERS SELECTORS
import { useSelector } from "react-redux";

import { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

// TOAST
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CONSTANTS
import {
  About,
  Contact,
  Explore,
  Landing,
  StoryPage,
  Signin,
  Signup,
  GenerateStory,
  StoryByTag,
  Profile,
  ThemePage,
  TagsPage,
} from "./pages";
import { Navbar, Story, Footer } from "./components";

const App = () => {
  // REDUCERS SELECTORS
  const { auth_data } = useSelector((state) => state.user);

  // STORY STATE
  const storyData = useSelector((state) => state.story);

  // USE LOCATION
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <ToastContainer />
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* STORY */}
        <Route path="/story" element={<Story />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/generate-story" element={<GenerateStory />} />

        {/* THEME */}
        <Route path="/theme" element={<ThemePage />} />

        {/* TAG */}
        <Route path="tags" element={<TagsPage />} />
        <Route path="/tags/:tag" element={<StoryByTag />} />

        {/* ABOUT AND CONTACT */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* SIGNIN AND SIGNUP */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* AUTH ROUTES */}
        {auth_data?.session_token && (
          <>
            <Route
              path="/profile"
              element={
                <Profile
                  user_id={auth_data?.user_id}
                  session_token={auth_data?.session_token}
                />
              }
            />
            <Route path="/profile/:id" element={<Landing />} />
          </>
        )}

        <Route path="*" element={<Landing />} />
      </Routes>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </div>
  );
};

export default App;
