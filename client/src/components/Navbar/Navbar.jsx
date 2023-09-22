// CONSTANTS
import styles from "./Navbar.module.scss";
import { images } from "../../constant";

// COMPONENTS
import { Button } from "./../index";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      {/* LOGO */}
      <img src={images.picstone} alt="picstone" />

      <Button buttonText="Sign In" />
    </div>
  );
};

export default Navbar;
