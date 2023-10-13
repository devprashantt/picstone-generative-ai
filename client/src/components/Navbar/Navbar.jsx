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
        <Link to={"signup"} className={styles.link}>
          Signup
        </Link>
        <Link to={"/signin"}>
          <Button buttonText="Sign In" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
