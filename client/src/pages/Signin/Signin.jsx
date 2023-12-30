import styles from "./Signin.module.scss";

// REACT IMPORTS
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// REACT ROUTER
import { useNavigate } from "react-router-dom";

import { Input, Button } from "./../../components";
import { images } from "../../constant";

// TOAST
import { toast } from "react-toastify";
import axios from "axios";
// REACT REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

// API
import useUser from "./../../api/useUser";

import axios from "axios"

axios.defaults.withCredentials = true;

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loginUser, loading } = useUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [gLoading, setGLoading] = useState(false);

  // Function to handle the callback from Google after redirection
  const handleGoogleCallback = async () => {
    try {
      setGLoading(true);

      // Capture the authorization code from the URL
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get("code");

      // Send the authorization code to your server
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/get_google_oauth_link`,
        { code: code }
      );

      // Handle the response from your server (optional)
      console.log(response.data);

      // You may redirect the user to another page or handle the session on the frontend
    } catch (error) {
      console.error("Error handling Google callback:", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGLoading(true);

      // Call your backend to initiate the OAuth flow
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get_google_oauth_link`
      );

      // Redirect the user to the Google OAuth authorization URL
      window.location.href = response.data.authorization_url;

      // After redirection, handle the callback
      handleGoogleCallback();
    } catch (error) {
      console.error("Error initiating Google login:", error);
    } finally {
      setGLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    loginUser(formData, (responseData) => {
      if (responseData?.session_token) {
        dispatch(setUser(responseData));
        navigate("/");
      } else {
        toast.error(responseData?.msg);
      }
    });
  };

  const redirectGoogle = () =>{
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/get_google_oauth_link`).then((response)=>{
      window.location.href = response.data
    }).catch((error)=>{
      toast.error("There was an issue communicating with server");
    })
  }

  return (
    <div className={styles.signin}>
      <div className={styles.left}>
        <Link to={"/"}>
          <img src={images.picstone} alt="logo" className={styles.logo} />
        </Link>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="Email"
            label={"Email"}
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            label={"Password"}
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Button
            buttonText={loading ? "Loading..." : "Sign In"}
            type={"submit"}
          />
        </form>

        <Button 
        buttonText={"Login with Google"}
        onClick={redirectGoogle}
        />

        <p className={styles.link}>
          {`Don't have an account?`}
          <span
            onClick={() => {
              setFormData({
                ...formData,
                email: "",
                password: "",
              });

              navigate("/signup");
            }}
          >
            Sign Up
          </span>
        </p>

        <button onClick={handleGoogleLogin}>Google</button>
      </div>
      <div className={styles.image}>
        <img
          src={
            "https://res.cloudinary.com/dixoiunbw/image/upload/v1702846196/picstone/landing-page/gbvqtkri7cbtuyotxwfn.jpg"
          }
          alt="story"
        />
      </div>
    </div>
  );
};

export default Signin;
