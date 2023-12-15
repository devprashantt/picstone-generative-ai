import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Signup.module.scss";

// TOAST
import { toast } from "react-toastify";

import { Input, Button } from "../../components";
import { images } from "../../constant";

// API
import useUser from "../../api/useUser";

// REACT ROUTER
import { useNavigate } from "react-router-dom";

// REDUX
// import { useDispatch } from "react-redux";
// import { setUser } from "../../store/reducers/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { registerUser, loading } = useUser();

  const handleSubmit = (e) => {
    // PREVENT DEFAULT BEHAVIOUR OF FORM
    e.preventDefault();

    // CHECK IF BOTH PASSWORD IS ACTIVE AND MATCH
    if (
      formData.password !== formData.confirmPassword ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      toast.error("Password does not match");
      return;
    }

    // CHECK IF EMAIL IS VALID
    if (!formData.email.includes("@")) {
      toast.error("Invalid email");
      return;
    }

    // CHECK IF NAME IS VALID
    if (formData.name === "") {
      toast.error("Name is required");
      return;
    }

    // CHECK IF PASSWORD IS VALID
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // CHECK IF CONFIRM PASSWORD IS VALID
    if (formData.confirmPassword.length < 6) {
      toast.error("Confirm Password must be at least 6 characters");
      return;
    }

    // REGISTER USER
    registerUser(formData, () => {
      navigate("/signin");

      // TOAST
      toast.success("Registered Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    });
  };
  return (
    <div className={styles.signup}>
      <div className={styles.image}>
        <img src={images.signup_img} alt="story" />
      </div>
      <div className={styles.right}>
        <Link to={"/"}>
          <img src={images.picstone} alt="logo" className={styles.logo} />
        </Link>

        <form className={styles.form}>
          <Input
            type="text"
            placeholder="Enter your name.."
            label={"Name"}
            name={"name"}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Enter email.."
            label={"Email"}
            name={"email"}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Enter password here.."
            label={"Password"}
            name={"password"}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Input
            type="password"
            placeholder="Confirm your password.."
            label={"Confirm Password"}
            name={"confirmPassword"}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
          />
          <Button
            isLoading={loading}
            type="submit"
            buttonText="Sign Up"
            onClick={handleSubmit}
          />
        </form>

        <p className={styles.link}>
          Already have an account?{"  "}
          <span
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
