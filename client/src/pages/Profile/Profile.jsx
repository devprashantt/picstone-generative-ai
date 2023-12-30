import styles from "./Profile.module.scss";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// COMPONENTS
import { Button, Input, Skeleton } from "./../../components";

import ProfileOption from "./components/ProfileOption/ProfileOption";
import ProfileView from "./components/ProfileView/ProfileView";

// API
import useUser from "../../api/useUser";

// REDUX STATE
import { useDispatch } from "react-redux";
import { logoutUserState } from "../../store/reducers/userSlice";

import { images } from "../../constant";

const profileTabOption = {
  work: "Stories",
  collections: "Collections",
  about: "About",
};

const Profile = () => {
  const dispatch = useDispatch();
  const [activeOption, setActiveOption] = useState(profileTabOption.work);
  const [userData, setUserData] = useState({});

  const { getUserData, loading, logoutUser } = useUser();

  const handleEditProfile = () => {};

  const handleLogout = () => {
    // CALL API
    logoutUser((response) => {
      console.log("response->", response);
      toast.success(response?.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // REMOVE USER FROM REDUX STATE
      dispatch(logoutUserState());

      // REDIRECT TO HOME PAGE
      // window.location.href = "/explore";
    });
  };

  useEffect(() => {
    getUserData((userResponse) => {
      toast.success(userResponse.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setUserData(userResponse.user);
    });
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile_info}>
        <img src={images.profile} className={styles.profile_img} alt="" />
        <div className={styles.detail}>
          <h1 className={styles.name}>
            {loading ? (
              <Skeleton type="text" width={"10rem"} />
            ) : (
              userData?.name
            )}
          </h1>
          <div className={styles.bio}>
            {loading ? (
              <Skeleton type="text" width={"30rem"} />
            ) : userData?.bio ? (
              userData?.bio
            ) : (
              "Story Creator"
            )}
          </div>
        </div>
        <div className={styles.action}>
          <Button
            onClick={handleEditProfile}
            className={styles.follow}
            buttonText="Follow"
          />
          <Button
            onClick={handleLogout}
            className={styles.edit}
            buttonText="Logout"
          />
        </div>
      </div>
      <div className={styles.profile_body}>
        <div className={styles.profile_body_nav}>
          <div className={styles.nav_items}>
            {Object.values(profileTabOption).map((option) => (
              <ProfileOption
                key={option}
                option={option}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
              />
            ))}
          </div>
          <div className={styles.filter}>
            <Input placeholder="Search" className={styles.search} />
          </div>
        </div>
        <div className={styles.profile_body_view}>
          <ProfileView option={activeOption} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
