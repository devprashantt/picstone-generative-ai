import { Landing } from "./pages";

import axios from "axios";

const App = () => {
  // SET BASE URL
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

  // SET CONTENT TYPE
  axios.defaults.headers.post["Content-Type"] = "application/json";

  return (
    <div>
      <Landing />
    </div>
  );
};

export default App;
