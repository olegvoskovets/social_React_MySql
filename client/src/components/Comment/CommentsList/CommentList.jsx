import Comment from "./Comment";
import "./commentList.scss";

const CommentList = ({
  comments,
  handleClickDeleteComment,
  handleClickUpdateComment,
}) => {
  return (
    <div className="commentList">
      {comments?.length > 0 &&
        comments.map((item) => (
          <Comment
            comment={item}
            key={item.id}
            handleClickDeleteComment={handleClickDeleteComment}
            handleClickUpdateComment={handleClickUpdateComment}
          />
        ))}
    </div>
  );
};

export default CommentList;
