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
import { logoutUser } from "../../store/reducers/userSlice";

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

  const { getUserData, loading } = useUser();

  const handleEditProfile = () => {};

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully");
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
          <p className={styles.bio}>
            {loading ? (
              <Skeleton type="text" width={"30rem"} />
            ) : userData?.bio ? (
              userData?.bio
            ) : (
              "Story Creator"
            )}
          </p>
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
