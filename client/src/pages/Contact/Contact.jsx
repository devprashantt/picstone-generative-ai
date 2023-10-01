import styles from "./Contact.module.scss";

import { Hero, Input, Textarea, Button } from "../../components";
import { images } from "../../constant";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <Hero
        heading={"Get in touch"}
        subHeading={"Get in Touch with Our Team"}
        description={
          "We highly value your feedback and inquiries, as they play a crucial role in enhancing our services. You can easily reach out to us through our user-friendly contact form or by using the provided contact details. Our dedicated team is always ready to assist you promptly and effectively. Your input is vital to our continuous improvement, and we eagerly await your messages and insights."
        }
        img_btn={false}
        btn_text={"Get Started"}
      />
      <div className={styles.body}>
        <div className={styles.details}>
          <div className={styles.info}>
            <div className={styles.detail}>
              <img src={images.call} alt="" className={styles.icon} />
              <a href="tel:+91 8009396321" className={styles.text}>
                +91 8009396321
              </a>
            </div>
            <div className={styles.detail}>
              <img src={images.mail} alt="" className={styles.icon} />
              <a
                className={styles.text}
                href="mailto:prashantkumarsingh.work@gmail.com"
              >
                prashantkumarsingh.work@gmail.com
              </a>
            </div>
            <div className={styles.detail}>
              <img src={images.location} alt="" className={styles.icon} />
              <p className={styles.text}>New Delhi, India</p>
            </div>
          </div>
          <div className={styles.map}>
            <img src={images.map} alt="map" />
          </div>
        </div>
        <div className={styles.form}>
          <h2 className={styles.heading}>Send us a message</h2>
          <Input type="text" placeholder="Enter your name" />
          <Input type="email" placeholder="Enter your email" />
          <Textarea placeholder="Enter your message here..." rows={12} />
          <Button
            className={styles.button}
            buttonText="Service will be activated soon..."
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
