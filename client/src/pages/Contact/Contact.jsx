import { useState } from "react";
import { toast } from "react-toastify";

import styles from "./Contact.module.scss";

import { Hero, Input, Textarea, Button } from "../../components";
import { images } from "../../constant";

// APIS
import useMessage from "../../api/useMessage";

const Contact = () => {
  const { sendMessage, loading } = useMessage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async () => {
    console.log("formData", formData);

    // CHECK IF NOT EMPTY
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all fields");
      return;
    }

    // SEND MESSAGE
    await sendMessage(formData, (responseData) => {
      console.log("responseData", responseData);
    });
  };

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
          <Input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Textarea
            placeholder="Enter your message here..."
            rows={12}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          <Button
            className={styles.button}
            buttonText="Send message"
            disabled={false}
            type={"submit"}
            isLoading={loading}
            isLoadingText={"Sending message..."}
            onClick={() => {
              console.log("formData", formData);
              handleSubmit();

              toast.success("Message sent successfully");

              // RESET FORM
              setFormData({
                name: "",
                email: "",
                message: "",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
