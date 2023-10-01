import axios from "axios";

import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

// CONSTANTS
import { Navbar, Story, Footer } from "./components";
import { About, Explore, Landing, StoryPage } from "./pages";

const App = () => {
  // SET BASE URL
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  // SET CONTENT TYPE
  axios.defaults.headers.post["Content-Type"] = "application/json";

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component render
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/story" element={<Story />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/story/:id" element={<StoryPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
