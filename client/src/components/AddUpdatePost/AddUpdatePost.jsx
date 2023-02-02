import { Form } from "antd";
import ReactTextareaAutosize from "react-textarea-autosize";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import "./addPost.scss";
import { useRef, useState } from "react";
import {
  addPost,
  updatePost,
  getUserPosts,
  getPostsFetch,
} from "../../store/Posts";
//import { useDispatch } from "react-redux";
import axios from "axios";

const AddUpdatePost = ( props) => {
 
  const {
    setOpenModal,
    currentUser,
    setTextPost,
    textPost,
    text,
    userProfile,
    dispatch,
    textContent,
    image,
    postId,
  } = props;
  // console.log("userProfile = ", userProfile);
  // console.log(
  //   "props ",
  //   "setOpenModal ",
  //   setOpenModal,
  //   "currentUser ",
  //   currentUser,
  //   "setTextPost ",
  //   setTextPost,
  //   "textPost ",
  //   textPost,
  //   "text ",
  //   text,
  //   "userProfile ",
  //   userProfile,
  //   "getUserPosts ",
  //   getUserPosts,
  //   "textContent ",
  //   textContent,
  //   "image ",
  //   image,
  //   "postId ",
  //   postId
  // );

  const filePickerCover = useRef(null);
  const [fileCover, setFileCover] = useState();
  const [imagePreviewUrlCover, setImagePreviewUrlCover] = useState();
  const [updateTextPost, setUpdateTextPost] = useState(text);
  const [updateImage, setUpdateImage] = useState(image);
  const [newPost, setNewPost] = useState({
    userId: currentUser.id,
    post_on_the_user_page: userProfile.id,
    title: textPost,
    image: "",
  });
  // const dispatch = useDispatch();

  const handleChangeTextPost = (e) => {
    textContent === "Редагувати пост"
      ? setUpdateTextPost(e.target.value)
      : setTextPost(e.target.value);
  };

  const handleChangeCover = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFileCover(file);
      setImagePreviewUrlCover(reader.result);
      setUpdateImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleClickCover = (e) => {
    e.preventDefault();
    filePickerCover.current.click();
  };

  // const getUserPosts = async (userId) => {
  //   try {
  //     const res = await axios.get("http://localhost:8800/api/posts/" + userId);

  //     setUserPosts(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const SavePost = async () => {
    let cover_url;

    cover_url = fileCover
      ? await updateFile(fileCover)
      : currentUser && currentUser.image;

    let text = textContent === "Редагувати пост" ? updateTextPost : textPost;
    let url =
      textContent === "Редагувати пост" && updateImage === image
        ? image
        : cover_url;

    try {
      dispatch(
        textContent === "Редагувати пост"
          ? updatePost([{ ...newPost, title: text, image: url }, postId])
          : addPost({ ...newPost, title: text, image: cover_url })
      );

      textContent !== "Редагувати пост" && setTextPost("");
      setFileCover();
      // getUserPosts(userProfile.id);
      dispatch(getUserPosts(userProfile.id));
      dispatch(getPostsFetch());

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  const updateFile = async (file) => {
    //console.log('file: ',file)
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

  const what_dasabled = () => {
    if (
      textContent === "Редагувати пост" ? updateTextPost : textPost || fileCover
    ) {
      return false;
    } else {
      return true;
    }
  };
  const CloseModalForm = () => {
    !textContent === "Редагувати пост" && setTextPost("");

    setOpenModal(false);
  };

  return (
    <div className="addPost">
      <div className="hidden">
        <input
          className="hidden"
          type="file"
          ref={filePickerCover}
          onChange={handleChangeCover}
          accept="image/*,.png,.jpg,.gif,.web,"
        />
      </div>
      <Form className="addPostForm">
        <div className="header_modal">
          <p className="text">
            {textContent}
            <span className="close_btn" onClick={CloseModalForm}>
              X
            </span>
          </p>
        </div>
        <div className="body_context">
          <div className="body_context_header">
            {currentUser.profilePic ? (
              <img
                className="user_profilePic"
                src={"/upload/" + currentUser.profilePic}
                alt=""
              />
            ) : (
              <img
                className="user_profilePic"
                src="/images/no_avatar_57.jpg"
                alt=""
              />
            )}

            <span className="user_name">{currentUser.name}</span>
          </div>
          <div className="body_context_border">
            <ReactTextareaAutosize
              className="body_context_textarea"
              placeholder={`Що у Вас на думці ${currentUser.name}`}
              onChange={handleChangeTextPost}
              value={
                textContent === "Редагувати пост" ? updateTextPost : textPost
              }
            />
            <div
              className={
                textContent === "Редагувати пост"
                  ? updateImage
                    ? "body_context_image"
                    : "body_context_image  body_context_image_no-visible"
                  : !fileCover
                  ? "body_context_image  body_context_image_no-visible"
                  : "body_context_image"
              }
            >
              <div className="image">
                <div className="cover">
                  {imagePreviewUrlCover ? (
                    <img src={imagePreviewUrlCover} alt="" />
                  ) : (
                    <img src={"/upload/" + image} alt="" />
                  )}
                </div>
                <span
                  className="close_btn_image"
                  onClick={() => setFileCover()}
                >
                  X
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer_addImg">
            <div className="footer_addImg_left">
              <span>Додайте щось у допис</span>
            </div>
            <div className="footer_addImg_right">
              <div className="item_border">
                <AddPhotoAlternateIcon
                  className="item"
                  onClick={handleClickCover}
                  style={{ color: "Highlight" }}
                />
              </div>
              <div className="item_border">
                <PersonIcon className="item" style={{ color: "blueviolet" }} />
              </div>
              <div className="item_border">
                <LocationOnIcon
                  className="item"
                  style={{ color: "firebrick" }}
                />
              </div>
              <div className="item_border">
                <InsertEmoticonIcon
                  className="item"
                  style={{ color: "lightpink" }}
                />
              </div>
              <div className="item_border">
                <FlagCircleIcon
                  className="item"
                  style={{ color: "lightsalmon" }}
                />
              </div>
            </div>
          </div>
          <button
            className="add_post_btn"
            disabled={what_dasabled()}
            onClick={SavePost}
          >
            {textContent === "Редагувати пост"
              ? "Редагувати пост"
              : "Опублікувати"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AddUpdatePost;
