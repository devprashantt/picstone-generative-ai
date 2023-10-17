// CONSTANTS
import styles from "./Navbar.module.scss";
import { images } from "../../constant";

// ROUTER
import { Link } from "react-router-dom";

// COMPONENTS
import { Button } from "./../index";

// REDUX
import { useSelector } from "react-redux";

const Navbar = () => {
  // REDUX GET USER
  const { auth_data } = useSelector((state) => state.user);

  console.log("user", auth_data);

  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <Link to={"/"} className={styles.logo}>
        <img src={images.picstone} alt="picstone" />
      </Link>

      <div className={styles.action}>
        <Link to={"/explore"} className={styles.menu}>
          Explore
        </Link>
        <Link to={"/theme"} className={styles.menu}>
          Theme
        </Link>
        <Link to={"/about"} className={styles.menu}>
          About
        </Link>
        <Link to={"/contact"} className={styles.menu}>
          Contact
        </Link>
      </div>

      <div className={styles.auth}>
        {
          // IF USER IS NOT LOGGED IN
          !auth_data?.session_token ? (
            <>
              <Link to={"signup"} className={styles.link}>
                Signup
              </Link>
              <Link
                to={"/signin"}
                style={{
                  textDecoration: "none",
                }}
              >
                <Button buttonText="Login" />
              </Link>
            </>
          ) : (
            // IF USER IS LOGGED IN
            <Link to={"/profile"} className={styles.profile}>
              Profile
            </Link>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
