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
  const user = useSelector((state) => state.user.user);

  if (user) {
    console.log("user", user);
  } else {
    console.log("user not found");
  }

  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <Link to={"/"} className={styles.logo}>
        <img src={images.picstone} alt="picstone" />
      </Link>

      <div className={styles.action}>
        <div className={styles.menus}>
          <Link to={"/explore"} className={styles.menu}>
            Explore
          </Link>
          <Link to={"/about"} className={styles.menu}>
            About
          </Link>
          <Link to={"/contact"} className={styles.menu}>
            Contact
          </Link>
        </div>
      </div>

      <div className={styles.auth}>
        {
          // IF USER IS NOT LOGGED IN
          !user ? (
            <>
              <Link to={"signup"} className={styles.link}>
                Signup
              </Link>
              <Link to={"/signin"}>
                <Button buttonText="Sign In" />
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
