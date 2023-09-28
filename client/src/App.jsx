import axios from "axios";

import { useEffect } from "react";

import { Routes, Route } from "react-router-dom";

// CONSTANTS
import { Navbar } from "./components";
import { About, Explore, Landing, Story } from "./pages";

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
        <Route path="/explore/:id" element={<Story />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
