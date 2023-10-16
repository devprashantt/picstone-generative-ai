import { useNavigate } from "react-router-dom";

import styles from "./Theme.module.scss";
import Button from "./../Button/Button";
import { images } from "../../constant";

const Theme = () => {
  const navigate = useNavigate();

  const handleTheme = () => {
    navigate("/theme");
  };

  return (
    <div className={styles.theme}>
      <h1 className={styles.heading}>
        Fresh & Relevant: <br /> Themed Story for Every Occasion
      </h1>
      <div className={styles.img_container}>
        <img
          src={
            "https://res.cloudinary.com/dixoiunbw/image/upload/v1697297413/picstone/season/ux5vrsotrgyuneve7ntn.svg"
          }
          alt="picstone"
        />
        <img
          src={
            "https://res.cloudinary.com/dixoiunbw/image/upload/v1697297413/picstone/season/dfzow8yomxtolpq6ex9k.svg"
          }
          alt="picstone"
        />
        <img
          src={
            "https://res.cloudinary.com/dixoiunbw/image/upload/v1697297414/picstone/season/b2ic2fyvxsvsfdxtg43e.svg"
          }
          alt="picstone"
        />
      </div>

      <div className={styles.content}>
        <img src={images.triangle_2} className={styles.shape1} alt="" />
        <img src={images.ellipse_2} className={styles.shape2} alt="" />
        <h1 className={styles.theme_name}>Winter Wonders</h1>
        <p
          className={styles.theme_desc}
        >{`Embrace the enchantment of the winter season with our "Winter Wonders" themed story. Capture the essence of snowy landscapes, cozy moments by the fireplace, or the magic of holiday festivities. Write a poem, paint a wintry scene, or create any form of art that celebrates the beauty and emotions of winter. Let the chill in the air inspire your creativity and transport you to a world of winter wonders.`}</p>
        <Button
          className={styles.theme_btn}
          buttonText="Explore"
          onClick={handleTheme}
        />
      </div>
    </div>
  );
};

export default Theme;
