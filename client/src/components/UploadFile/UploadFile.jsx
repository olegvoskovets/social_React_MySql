import "./uploadFile.scss";
import { useState, useRef } from "react";
import axios from "axios";
import InputFile from "./InputFile";

const UploadFile = ({ user, setFileCover }) => {
  const filePickerCover = useRef(null);
  const filePickerProfile = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploaded, setUploaded] = useState(null);

  //....................

  // const [fileCover, setFileCover] = useState("");
  const [imagePreviewUrlCover, setImagePreviewUrlCover] = useState("");

  //....................
  const [fileProfile, setFileProfile] = useState("");
  const [imagePreviewUrlProfile, setImagePreviewUrlProfile] = useState("");

  //.....................
  const handleChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
    //handleUpload();
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Будь ласка, виберіть файл");
    }

    try {
      let formData = new FormData();
      formData.append("file", selectedFile);
      const res = await axios.post(
        `http://localhost:8800/api/upload`,
        formData
      );
      setUploaded(res.data);
      return res.data;
    } catch (error) {}
  };

  const handlePic = (e) => {
    e.preventDefault();
    //filePicker.current.click();
  };

  //==========================
  const handleClicCover = (e) => {
    e.preventDefault();
    filePickerCover.current.click();
  };
  const handleClicProfile = (e) => {
    e.preventDefault();
    filePickerProfile.current.click();
  };
  //=====================
  const handleChangeCover = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFileCover(file);
      //setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }
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

  return (
    <div className="cover__pic">
      <div className="hidden">
        <input
          // id="fileInputCover"
          className="hidden"
          type="file"
          ref={filePickerCover}
          onChange={handleChangeCover}
          accept="image/*,.png,.jpg,.gif,.web,"
        />
        <input
          // id="fileInputProfile"
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
            <img src={user && user.coverPic} alt="" />
          )}
        </div>
        <div className="profile">
          {imagePreviewUrlProfile ? (
            <img src={imagePreviewUrlProfile} alt="" />
          ) : (
            <img src={user && user.profilePic} alt="" />
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
  );
};

export default UploadFile;
