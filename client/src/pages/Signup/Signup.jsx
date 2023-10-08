import { useState } from "react";

import styles from "./Signup.module.scss";

import { Input, Button } from "../../components";
import { images } from "../../constant";

// API
import useUser from "../../api/useUser";

// REDUX
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { registerUser, loading } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    // CHECK IF BOTH PASSWORD IS ACTIVE AND MATCH
    if (
      formData.password !== formData.confirmPassword ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      alert("Password does not match");
      return;
    }

    // CHECK IF EMAIL IS VALID
    if (!formData.email.includes("@")) {
      alert("Invalid email");
      return;
    }

    // CHECK IF NAME IS VALID
    if (formData.name === "") {
      alert("Invalid name");
      return;
    }

    // CHECK IF PASSWORD IS VALID
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // CHECK IF CONFIRM PASSWORD IS VALID
    if (formData.confirmPassword.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // REGISTER USER
    registerUser(formData, (responseData) => {
      console.log("responseData-->", responseData);
      // UPDATE USER IN STATE
      dispatch(setUser(responseData.user));
    });
  };
  return (
    <div className={styles.signup}>
      <div>
        <img src={images.story} alt="story" />
      </div>
      <div>
        <img src={images.picstone} alt="logo" />
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            type="text"
            placeholder="Enter your name.."
            label={"Name"}
            isRequired="true"
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
            type="text"
            placeholder="Enter password here.."
            label={"Password"}
            name={"password"}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Input
            type="text"
            placeholder="Confirm your password.."
            label={"Confirm Password"}
            name={"confirmPassword"}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
          />
          <Button isLoading={loading} type="submit" buttonText="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default Signup;
