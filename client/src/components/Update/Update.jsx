import { useRef, useState } from "react";
import "./update.scss";
import { fetchGameCount, updateUser } from "../../store/Users";
import { useDispatch } from "react-redux";
import { login, setCurrentUser } from "../../store/auth";
import { getUserProfile } from "../../store/Users";
//import { updateFile } from "../../store/Users";
import UploadFile from "../UploadFile/UploadFile";
import axios from "axios";

const Update = ({ setOpenUpdate, user, setNewCurrentUser }) => {
  const filePickerCover = useRef(null);
  const filePickerProfile = useRef(null);

  const [fileCover, setFileCover] = useState();
  const [fileProfile, setFileProfile] = useState();
  const [imagePreviewUrlProfile, setImagePreviewUrlProfile] = useState();
  const [imagePreviewUrlCover, setImagePreviewUrlCover] = useState();

  const [texts, setTexts] = useState({
    name: user.name,
    email: user.email,
    city: user.city,
    website: user.website,
    id: user.id,
    profilePic: user.profilePic,
    coverPic: user.coverPic,
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeCover = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFileCover(file);
      setImagePreviewUrlCover(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleChangeProfile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFileProfile(file);
      setImagePreviewUrlProfile(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const handleClicCover = (e) => {
    e.preventDefault();
    filePickerCover.current.click();
  };
  const handleClicProfile = (e) => {
    e.preventDefault();
    filePickerProfile.current.click();
  };

  const updateFile = async (file) => {
    if (file) {
      try {
        let formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `http://localhost:8800/api/upload`,
          formData
        );

        return res.data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    let cover_url;
    let profile_url;

    cover_url = fileCover ? await updateFile(fileCover) : user && user.coverPic;
    profile_url = fileProfile
      ? await updateFile(fileProfile)
      : user && user.profilePic;

    dispatch(
      updateUser({ ...texts, coverPic: cover_url, profilePic: profile_url })
    );

    dispatch(getUserProfile(user.id));
    dispatch(fetchGameCount());

    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <div className="updateClose">
        <h5>Змінити свої данні</h5>{" "}
        <span onClick={() => setOpenUpdate(false)}>x close</span>
      </div>

      <div className="cover__pic">
        <div className="hidden">
          <input
            className="hidden"
            type="file"
            ref={filePickerCover}
            onChange={handleChangeCover}
            accept="image/*,.png,.jpg,.gif,.web,"
          />
          <input
            className="hidden"
            type="file"
            ref={filePickerProfile}
            onChange={handleChangeProfile}
            accept="image/*,.png,.jpg,.gif,.web,"
          />
        </div>
        <div className="image">
          <div className="cover">
            {imagePreviewUrlCover ? (
              <img src={imagePreviewUrlCover} alt="" />
            ) : (
              <img src={"/upload/" + user.coverPic} alt="" />
            )}
          </div>
          <div className="profile">
            {imagePreviewUrlProfile ? (
              <img src={imagePreviewUrlProfile} alt="" />
            ) : (
              <img src={"/upload/" + user.profilePic} alt="" />
            )}
          </div>
        </div>
        <div className="button">
          <button onClick={handleClicCover}>
            {user?.coverPic ? "Змінити фото" : "Добавити фото"}
          </button>
          <button onClick={handleClicProfile}>
            {user?.profilePic ? "Змінити avatar" : "Добавити avatar"}
          </button>
        </div>
      </div>

      <form className="form">
        <div className="info">
          <span>Їм'я</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={texts.name}
          />
        </div>
        <div className="info">
          <span>Email</span>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={texts.email}
          />
        </div>
        <div className="info">
          <span>Місто</span>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={texts.city}
          />
        </div>
        <div className="info">
          <span>Web site</span>
          <input
            type="text"
            name="website"
            onChange={handleChange}
            value={texts.website}
          />
        </div>
      </form>
      <div className="upload">
        <button onClick={handleClick}>Зберегти</button>
      </div>
    </div>
  );
};

export default Update;
