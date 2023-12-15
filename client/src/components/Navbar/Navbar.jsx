// USE STATE
import { useState } from "react";

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

  const [active, setActive] = useState(false);

  return (
    <div className={styles.navbar}>
      {/* FOR PHONE OR MOBILE */}
      <div className={styles.mobile}>
        <div
          className={styles.hamburger}
          onClick={() => {
            setActive(!active);
          }}
        >
          <img src={images.menu} alt="menu" />
          {
            // IF ACTIVE IS TRUE
            active && (
              <div className={styles.mobile_menu}>
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
              </div>
            )
          }
        </div>
        <Link to={"/"} className={styles.logo}>
          <img src={images.picstone} alt="picstone" />
        </Link>
      </div>

      {/* LOGO */}
      <Link to={"/"} className={styles.logo}>
        <img src={images.picstone} alt="picstone" />
      </Link>

      <div className={styles.action}>
        <Link to={"/explore"} className={styles.menu}>
          Explore
        </Link>
        <Link to={"/theme"} className={styles.menu}>
          <p className={styles.name}>Theme</p>
          <p className={styles.new}>New</p>
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
            <>
              {" "}
              {/* <Link to={"/generate-story"} className={styles.profile}>
                Create
              </Link> */}
              <Link to={"/profile"} className={styles.profile}>
                {/* <img src={images.profile} alt="profile" /> */}
                Profile
              </Link>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Navbar;
