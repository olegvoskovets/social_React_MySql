import TextareaAutosize from "react-textarea-autosize";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CurtainsIcon from "@mui/icons-material/Curtains";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AppsIcon from "@mui/icons-material/Apps";
import "./postProfile.scss";
import axios from "axios";
import { useState } from "react";
import Post from "../Post/Post";
import { useEffect } from "react";
import AddUpdatePost from "../AddUpdatePost/AddUpdatePost";
import { getUserPosts } from "../../store/Posts.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PostProfile = ({ userProfile }) => {
  // const [userPosts, setUserPosts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [textPost, setTextPost] = useState("");
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const [delete_post, setDelete_post] = useState();
  const [textContent, setTextContent] = useState("Створити допис");
  const dispatch = useDispatch();
  const { userPosts } = useSelector((state) => state.postsReducer.postsSlice);
  // const getUserPosts = async (userId) => {
  //   try {
  //     const res = await axios.get("http://localhost:8800/api/posts/" + userId);

  //     setUserPosts(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    //getUserPosts(userProfile.id);
    dispatch(getUserPosts(userProfile.id));
  }, [userProfile, openModal, delete_post, getUserPosts]);

  const handleClick = () => {
    currentUser && setOpenModal(true);
  };

  const deletePost = async (id) => {
    try {
      await axios.delete("http://localhost:8800/api/posts/" + id);
      setDelete_post(id);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {openModal && (
        <AddUpdatePost
          textContent={textContent}
          setOpenModal={setOpenModal}
          currentUser={currentUser}
          userProfile={userProfile}
          setTextPost={setTextPost}
          textPost={textPost}
          getUserPosts={getUserPosts}
          dispatch={dispatch}
        />
      )}

      <div className="myPage">
        <div className="myPage_left">
          <div className="about_myself">about_myself</div>
          <div className="photos">photos</div>
          <div className="friendss">friends</div>
        </div>
        <div className="myPage_rigth">
          <div className="create_post">
            <div className="myPage_rigth_header">
              <div className="rigth_profile_img">
                {currentUser?.profilePic ? (
                  <img
                    src={"/upload/" + currentUser.profilePic}
                    alt=""
                    className="header_avatar"
                  />
                ) : (
                  <img
                    src="/images/no_avatar_57.jpg"
                    alt=""
                    className="header_avatar"
                  />
                )}
              </div>
              <div className="rigth_TextareaAutosize">
                <TextareaAutosize
                  className="add_post_text"
                  onClick={handleClick}
                  value={textPost}
                  placeholder={
                    currentUser
                      ? currentUser.name + " добавте пост"
                      : " добавте пост"
                  }
                />
              </div>
            </div>

            <div className="myPage_rigth_btn">
              <span>
                <VideoChatIcon />
                Ефір
              </span>
              <span>
                <AddPhotoAlternateIcon />
                Світлина / Відео
              </span>
              <span>
                <CurtainsIcon />
                Життєва подія
              </span>
            </div>
          </div>
          <div className="posts_filter">
            <div className="posts_filter_header">
              <div className="posts_filter_text">Дописи</div>
              <div className="posts_filter_context">
                <span>
                  <FilterAltIcon />
                  Фільтри
                </span>
                <span>
                  <SettingsApplicationsIcon />
                  Керування дописами
                </span>
              </div>
            </div>
            <div className="posts_filter_footer">
              <span>
                <ListAltIcon />
                Список
              </span>
              <span>
                <AppsIcon />
                Сітка
              </span>
            </div>
          </div>
          {/* <div className="my_posts"> */}
          {userPosts?.length > 0
            ? userPosts.map((post) => (
                <Post
                  post={post}
                  deletePost={deletePost}
                  key={post.id}
                  setOpenModal={setOpenModal}
                  // setTextContent={setTextContent}
                  // textContent={textContent}
                  dispatch={dispatch}
                  userProfile={userProfile}
                  setTextPost={setTextPost}
                  //textPost={textPost}
                  getUserPosts={getUserPosts}
                  image=""
                />
              ))
            : `У пользователя ${userProfile.name} поки відсутні пости.`}
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PostProfile;
