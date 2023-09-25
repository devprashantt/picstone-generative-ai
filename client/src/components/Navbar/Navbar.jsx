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

      <Button buttonText="Sign In" />
    </div>
  );
};

export default Navbar;
