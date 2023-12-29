import styles from "./Signin.module.scss";

// REACT IMPORTS
import { useState } from "react";
import { Link } from "react-router-dom";

// REACT ROUTER
import { useNavigate } from "react-router-dom";

import { Input, Button } from "./../../components";
import { images } from "../../constant";

// TOAST
import { toast } from "react-toastify";

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
