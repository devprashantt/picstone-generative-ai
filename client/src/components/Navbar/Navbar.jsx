// CONSTANTS
import styles from "./Navbar.module.scss";
import { images } from "../../constant";

// ROUTER
import { Link } from "react-router-dom";

// COMPONENTS
import { Button } from "./../index";

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
          {/* <Link to={"/contact"} className={styles.menu}>
            Contact
          </Link> */}
        </div>

        {/* <Button buttonText="Sign In" /> */}
        {/* ADD PEER-LIST PROFILE */}
        <a
          href="https://peerlist.io/prashantkumar"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0.6rem 0",
          }}
        >
          <img
            src={
              "https://github-readme-badge.peerlist.io/api/prashantkumar?style=social"
            }
            alt="peer-list"
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
