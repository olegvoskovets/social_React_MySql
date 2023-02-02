import moment from "moment";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./comment.scss";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Comment = ({
  comment,
  handleClickDeleteComment,
  handleClickUpdateComment,
}) => {
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const [likesComment, setLikesComment] = useState([]);
  const [loadingFatch, setLoadingFetch] = useState(false);

  const [visibleBtn, setVisibleBtn] = useState(false);
  const [visibleCountLikes, setVisibleCountLikes] = useState(false);
  const [visibleUsersProfile, setvisibleUsersProfile] = useState(false);
  const [visibleDeleteComment, setVisibleDeleteComment] = useState(false);

  const nadleMouseEnter = (e) => {
    setVisibleBtn(true);
  };
  const nandleMouseLeave = (e) => {
    setVisibleBtn(false);
    setVisibleDeleteComment(false);
  };

  const getLikesCommentId = async (id) => {
    try {
      setLoadingFetch(true);
      const res = await axios.get(
        "http://localhost:8800/api/likes/comment/" + id
      );

      setLikesComment(res.data);

      setLoadingFetch(false);
      //return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikesCommentId(comment.id);
  }, []);

  const handleLikes = async () => {
    if (currentUser) {
      const value = { commentId: comment.id, userId: currentUser.id };
      try {
        const res = await axios.post(
          "http://localhost:8800/api/likes/comment/",
          value
        );
        getLikesCommentId(comment.id);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const nadleMouseEnterLikes = () => {
    setvisibleUsersProfile(true);
  };
  const nandleMouseLeaveLikes = () => {
    setvisibleUsersProfile(false);
  };

  const handleClickBtn = () => {
    setVisibleDeleteComment(!visibleDeleteComment);
  };

  const handleClickDelete = () => {
    handleClickDeleteComment(comment.id);
    setVisibleDeleteComment(false);
  };
  const handleClickUpdate = () => {
   
    handleClickUpdateComment(comment.comment, comment.id);
  };

  return (
    <div
      className="comment"
      onMouseEnter={nadleMouseEnter}
      onMouseLeave={nandleMouseLeave}
    >
      <div className="comment_left">
        {!comment.profilePic ? (
          <img src="/images/no_avatar_57.jpg" alt="" />
        ) : (
          <img src={"/upload/" + comment.profilePic} alt="" />
        )}
      </div>

      <div className="comment_right">
        <div className="comment_right_block">
          <div className="comment_right_context">
            <Link
              to={`/profile/${comment.userId}`}
              style={{ textDecoration: "none" }}
            >
              <span className="comment_right_avtor_name">{comment.name}</span>
            </Link>

            <div className="comment_right_comment">{comment.comment}</div>
            {likesComment.length > 0 && (
              <div
                className="likes"
                onMouseEnter={nadleMouseEnterLikes}
                onMouseLeave={nandleMouseLeaveLikes}
              >
                <span className="img">
                  <ThumbUpAltIcon className="icon" fontSize="small" />

                  {visibleUsersProfile && (
                    <div className="visibleProfile">
                      <div className="visibleProfile_navbar">
                        <span className="img">
                          <ThumbUpAltIcon className="icon" fontSize="small" />
                        </span>
                        <span className="count">{likesComment.length}</span>
                      </div>

                      {likesComment?.map((item, i) => (
                        <div className=" visibleProfile_item" key={i}>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}
                </span>
                {likesComment.length > 1 && (
                  <span className="count">{likesComment.length}</span>
                )}
              </div>
            )}
          </div>

          <div className="comment_right_block_btn">
            {visibleBtn && (
              <span className="btn_span" onClick={handleClickBtn}>
                <MoreHorizIcon fontSize="small" />
              </span>
            )}
            {visibleDeleteComment && (
              <div className="delete_comment">
                <span onClick={handleClickDelete}>Видалити коментарій</span>
                <span onClick={handleClickUpdate}>Відреагувати коментарій</span>
              </div>
            )}
          </div>
        </div>

        <div className="comment_btn">
          <span onClick={handleLikes}>Подобається</span>
          <span>Відповісти</span>
          <span>Поширити</span>
          <span>{moment(comment.creation_date).fromNow()}</span>
          {comment.last_updated && <p>Відреаговано</p>}
        </div>
      </div>
    </div>
  );
};

export default Comment;
