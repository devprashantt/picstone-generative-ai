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
} from "./pages";
import { Navbar, Story, Footer } from "./components";

const App = () => {
  // REDUCERS SELECTORS
  const { user } = useSelector((state) => state.user);

  console.log("user", user);

  // USE LOCATION
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function getSessionToken() {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === "session_token") {
        return decodeURIComponent(cookieValue); // Decode the cookie value if needed
      }
    }
    return null; // Cookie not found
  }

  const sessionToken = getSessionToken();

  if (sessionToken) {
    console.log("Session Token: " + sessionToken);
  } else {
    console.log("Session Token cookie not found.");
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
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
        <Route
          path="/theme"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              Coming soon
            </div>
          }
        />

        {/* TAG */}
        <Route
          path="/tags/:tag"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              Coming soon
            </div>
          }
        />

        {/* ABOUT AND CONTACT */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* SIGNIN AND SIGNUP */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* AUTH ROUTES */}
        {user && (
          <>
            <Route
              path="/profile"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  {user}
                </div>
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
