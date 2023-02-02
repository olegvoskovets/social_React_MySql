import "./post.scss";
import CloseIcon from "@mui/icons-material/Close";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getCommentsPostFetch,
  getCommentsParams,
} from "../../store/Comments.js";
import CommentList from "../Comment/CommentsList/CommentList";
import AddUpdatePost from "../AddUpdatePost/AddUpdatePost";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InformUserPost from "../InformUserPost/InformUserPost";

const Post = ({
  post,
  deletePost,
  setTextContent,
  textContent,
  setOpenModal,
  userProfile,
  setTextPost,
  textPost,
  getUserPosts,
  dispatch,
  getPostsFetch,
}) => {
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [comments, setComments] = useState([]);
  const [visibleComment, setVisibleComment] = useState(false);
  const [likesPost, setLikesPost] = useState([]);
  const [loadingLikesPost, setLoadingLikesPost] = useState(false);
  const [visibleLikesPostProfile, setVisibleLikesPostProfile] = useState(false);
  const [updateComment, setUpdateComment] = useState(false);
  const [updateCommentText, setUpdateCommentText] = useState({
    comment: "",
    id: null,
  });
  const [visibleDeleteUpdatePost, setVisibleDeleteUpdatePost] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [textsComment, setTextsComment] = useState("");
  const [visible_Page_profilePic, setvisible_Page_profilePic] = useState(false);
  const [visible_Post_user_page, setvisible_Post_user_page] = useState(false);

  const [newComment, setNewComment] = useState({
    comment: textsComment,
    userId: currentUser?.id,
    postId: post?.id,
  });

  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    getCommentPostid(post.id);
    getLikesPostId(post.id);
  }, [newComment]);

  const [row, setRow] = useState(1);
  const handleChange = (e) => {
    setTextsComment((prev) => e.target.value);
  };

  const nandleAddComment = () => {
    setOpenComment(!openComment);
  };

  const addCommentFetch = async (comment) => {
    try {
      const res = await axios.post(
        "http://localhost:8800/api/comments",
        comment
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateCommentIdFetch = async () => {
    try {
      const res = await axios.put(
        "http://localhost:8800/api/comments/" + updateCommentText.id,
        { comment: textsComment }
      );

      setUpdateCommentText({
        comment: "",
        id: null,
      });
      setUpdateComment(false);
      setTextsComment("");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = () => {
    if (textsComment.length > 0) {
      {
        updateComment
          ? UpdateCommentIdFetch() //змінюємо сомент
          : addCommentFetch({ ...newComment, comment: textsComment }); // робимо новий комент
      }

      setTextsComment("");
      // setRow(1);
      setNewComment({
        comment: textsComment,
        userId: currentUser.id,
        postId: post.id,
      });
      // getCommentPostid(post.id);
    }
  };

  const getCommentPostid = async (id) => {
    try {
      setLoadingFetch(true);
      const res = await axios.get("http://localhost:8800/api/comments/" + id);

      setComments(res.data);

      setLoadingFetch(false);
      //return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getLikesPostId = async (id) => {
    try {
      //setLoadingLikesPost(true);
      const res = await axios.get(
        "http://localhost:8800/api/likes/postLikes/" + id
      );
      setLikesPost(res.data);
      // setLoadingLikesPost(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikesPost = async () => {
    if (currentUser) {
      const value = { postId: post.id, userId: currentUser.id };
      try {
        const res = await axios.post(
          "http://localhost:8800/api/likes/postLikes",
          value
        );
        getLikesPostId(post.id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const nadleMouseEnterComment = () => {
    setVisibleComment(true);
  };
  const nandleMouseLeaveComment = () => {
    setVisibleComment(false);
  };

  const handleClickDeleteComment = async (id) => {
    try {
      const res = await axios.delete(
        "http://localhost:8800/api/comments/" + id
      );
      // getCommentPostid(post.id);
      setComments(comments.filter((com) => com.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickUpdateComment = (comment, id) => {
    setUpdateComment(true);
    setTextsComment(comment);
    setUpdateCommentText({
      comment,
      id,
    });
  };

  const nadleMouseEnterLikesPost = () => {
    setVisibleLikesPostProfile(true);
  };
  const nandleMouseLeaveLikesPost = () => {
    setVisibleLikesPostProfile(false);
  };

  const handleClickClose = () => {
    currentUser && setVisibleDeleteUpdatePost(true);
  };

  const handleDeletePost = () => {
    deletePost(post.id);

    setVisibleDeleteUpdatePost(false);
  };
  const handleUpdatePost = () => {
    setUpdatePost(true);
    //=========================

    setVisibleDeleteUpdatePost(false);
  };
  const nandleMouseLeaveDeliteUpdate = () => {
    setVisibleDeleteUpdatePost(false);
  };
  const nadleMouseEnterPost_user_page = (e) => {
    e.preventDefault();
    setvisible_Post_user_page(true);
  };
  const nandleMouseLeavePost_user_page = () => {
    setvisible_Post_user_page(false);
  };
  const nadleMouseEnterPage_profilePic = (e) => {
    e.preventDefault();
    setvisible_Page_profilePic(true);
  };
  const nandleMouseLeavePage_profilePic = () => {
    setvisible_Page_profilePic(false);
  };

  return (
    <div className="post">
      {updatePost && (
        <AddUpdatePost
          setOpenModal={setUpdatePost}
          currentUser={currentUser}
          userProfile={{ id: post.post_on_the_user_page }}
          textContent="Редагувати пост"
          setTextPost={setTextPost}
          text={post.title}
          getUserPosts={getUserPosts}
          image={post.image}
          postId={post.id}
          dispatch={dispatch}
          getPostsFetch={getPostsFetch}
        />
      )}
      <div className="post_header">
        <div className="header_left">
          <div className="header_left_img">
            {post.post_on_the_user_page_profilePic ? (
              <div
                onMouseEnter={nadleMouseEnterPost_user_page}
                onMouseLeave={nandleMouseLeavePost_user_page}
              >
                <img
                  src={"/upload/" + post.post_on_the_user_page_profilePic}
                  alt=""
                  className="header_img_group"
                />
              </div>
            ) : (
              <img
                src="/images/no_avatar_57.jpg"
                alt=""
                className="header_img_group"
              />
            )}
            {post.post_on_the_user_page_profilePic !== post.profilePic ? (
              <div
                onMouseEnter={nadleMouseEnterPage_profilePic}
                onMouseLeave={nandleMouseLeavePage_profilePic}
              >
                <img
                  src={"/upload/" + post.profilePic}
                  alt=""
                  className="header_avatar"
                />
              </div>
            ) : null}
            {visible_Post_user_page && (
              <InformUserPost id={post.post_on_the_user_page} />
            )}
            {visible_Page_profilePic && <InformUserPost id={post.userId} />}
          </div>
          <div className="header-left_info">
            <div className="header_group">
              {post.name_post_on_the_user_page}
            </div>
            <div className="header_speaker">
              <span className="post_name">{post.name}</span>
              <p>{moment(post.creation_post).fromNow()}</p>

              {post.last_update && <p>Відреаговано</p>}
            </div>
          </div>
        </div>
        <div className="header_right">
          <span>
            <MoreHorizIcon
              className="btn_span"
              onClick={handleClickClose}
              fontSize="small"
            />
          </span>
          {visibleDeleteUpdatePost && (
            <div
              className="header_right_content"
              onMouseLeave={nandleMouseLeaveDeliteUpdate}
            >
              <div className="header_right_deletePost">
                <div className="header_right_deletePost_border">
                  <span onClick={handleDeletePost}>Видалити пост</span>
                </div>
                {currentUser.id === post.userId && (
                  <div
                    className="header_right_deletePost_border"
                    onClick={handleUpdatePost}
                  >
                    <span>Змінити пост</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="post_info">
        <div className="post_text">
          <p>{post.title}</p>

          <label for="button">
            Показати більше...
            <input type="checkbox" id="button"></input>
          </label>
        </div>

        <div className="post_image">
          {post.image && <img src={"/upload/" + post.image} alt="post" />}
        </div>
      </div>

      <div className="post_footer">
        <div className="post_footer_info">
          <div
            className="footer_info_left"
            onMouseEnter={nadleMouseEnterLikesPost}
            onMouseLeave={nandleMouseLeaveLikesPost}
          >
            {likesPost.length > 0 && (
              <span className="footer_info_left_likesPost">
                {likesPost.length} like
              </span>
            )}

            {visibleLikesPostProfile && (
              <div className="visiblePostProfile">
                {likesPost.length > 0 &&
                  likesPost.map((profile) => (
                    <div className="like_post_name">{profile.name}</div>
                  ))}
              </div>
            )}
          </div>

          <div className="footer_info_right">
            <span
              className="footer_info_right_comments"
              onMouseEnter={nadleMouseEnterComment}
              onMouseLeave={nandleMouseLeaveComment}
            >
              {comments?.length} коментарів
              {visibleComment && (
                <div className="footer_info_right_visible">
                  {comments.map((item) => (
                    <div className="commentProfile" key={item.id}>
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </span>
            <span>25 поширень</span>
          </div>
        </div>
        <div className="post_footer_btn">
          <button onClick={handleLikesPost}>
            <ThumbUpOffAltIcon />
            Подобається
          </button>
          <button onClick={nandleAddComment}>
            <ChatBubbleOutlineIcon />
            Коментувати
          </button>
          <button>
            <ScreenShareIcon />
            Поширити
          </button>
        </div>

        {openComment && (
          <div className="add_comment">
            <div className="add_comment_post">
              <div className="add_comment-left">
                <img
                  className="avatar"
                  src={
                    currentUser
                      ? "/upload/" + currentUser.profilePic
                      : "/images/no_avatar_57.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="add_comment-right">
                <div className="add_comment_text">
                  {/* <label for="w3review"></label> */}
                  <TextareaAutosize
                    className="add_comment_area_text"
                    onChange={(e) => handleChange(e)}
                    value={textsComment}
                  />

                  <div
                    className={
                      row > 1
                        ? "add_commetn_giv add_commetn_giv_pading"
                        : "add_commetn_giv"
                    }
                  >
                    <div className="item_giv">
                      <PostAddIcon
                        className="item_giv_hover"
                        onClick={handleComment}
                        color={textsComment.length > 0 ? "primary" : ""}
                      />
                    </div>

                    <div className="item_giv">
                      <PsychologyAltIcon className="item_giv_hover" />
                    </div>
                    <div className="item_giv">
                      <SentimentSatisfiedIcon className="item_giv_hover" />
                    </div>
                    <div className="item_giv">
                      <CameraAltIcon className="item_giv_hover" />
                    </div>
                    <div className="item_giv">
                      <StickyNote2Icon className="item_giv_hover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loadingFetch ? (
              <h3>Идет загрузка ...</h3>
            ) : (
              comments.length > 0 && (
                <CommentList
                  comments={comments}
                  handleClickDeleteComment={handleClickDeleteComment}
                  handleClickUpdateComment={handleClickUpdateComment}
                />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
