import { images } from "../../constant";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles["footer-intro-box"]}>
        <div className={styles["footer-intro"]}>
          <img src={images.picstone_white} />
          <p className={styles["footer-intro-text"]}>
            PromptSpot: Ignite Your Creativity. Inspiring prompts and challenges
            for artists and writers to unleash their artistic potential and
            foster collaborative creativity.
          </p>
        </div>
        <p className={styles["footer-intro-text"]}>
          Copyright © 2023 PromptSpot . All rights reserved.
        </p>
      </div>
      <div className={styles.links}>
        <div className={styles["link-box"]}>
          <h3 className={styles["link-box-heading"]}>Contact</h3>
          <p>Phone</p>
          <p>E-mail</p>
          <p>Address</p>
        </div>
        <div className={styles["link-box"]}>
          <h3 className={styles["link-box-heading"]}>Social Links</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
          <p>Linkedin</p>
        </div>
        <div className={styles["link-box"]}>
          <h3 className={styles["link-box-heading"]}>Quick Links</h3>
          <p>Terms of services</p>
          <p>Privacy policy</p>
          <p>FAQ</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
