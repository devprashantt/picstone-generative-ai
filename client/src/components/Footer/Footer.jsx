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
            {`Picstone is an innovative platform designed to revolutionize the way
            you interact with images and stories. With Picstone, your photos
            come to life with captivating narratives. Whether you're a
            photography enthusiast, a storyteller, or simply looking to add an
            extra layer of magic to your images, Picstone has you covered.`}
          </p>
        </div>
        <p className={styles.footer_intro_text}>
          Copyright © 2023 Picstone . All rights reserved.
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
