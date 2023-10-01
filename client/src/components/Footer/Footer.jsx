// CONSTANTS
import { images } from "../../constant";
import styles from "./Footer.module.scss";

// REACT ROUTER IMPORTS
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className={styles.footer}>
      {/* LOGO+INTRO */}
      <div className={styles.footer_intro_box}>
        <div className={styles.footer_intro}>
          <img src={images.picstone_white} />
          <p className={styles.footer_intro_text}>
            PromptSpot: Ignite Your Creativity. Inspiring prompts and challenges
            for artists and writers to unleash their artistic potential and
            foster collaborative creativity.
          </p>
        </div>
        <p className={styles.footer_intro_text}>
          Copyright © 2023 PromptSpot . All rights reserved.
        </p>
      </div>
      {/* LINKS */}
      <div className={styles.links}>
        <div className={styles.link_box}>
          <h3 className={styles.link_box_heading}>Contact</h3>
          <a href="#" className={styles.link_box_text}>
            Phone
          </a>
          <a href="#" className={styles.link_box_text}>
            E-mail
          </a>
          <a href="#" className={styles.link_box_text}>
            Address
          </a>
        </div>
        <div className={styles.link_box}>
          <h3 className={styles.link_box_heading}>Social Links</h3>
          <a href="#" className={styles.link_box_text}>
            Facebook
          </a>
          <a href="#" className={styles.link_box_text}>
            Twitter
          </a>
          <a href="#" className={styles.link_box_text}>
            Instagram
          </a>
          <a href="#" className={styles.link_box_text}>
            Linkedin
          </a>
        </div>
        <div className={styles.link_box}>
          <h3 className={styles.link_box_heading}>Quick Links</h3>
          <Link className={styles.link_box_text}>Terms of services</Link>
          <Link className={styles.link_box_text}>Privacy policy</Link>
          <Link className={styles.link_box_text}>FAQ</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
