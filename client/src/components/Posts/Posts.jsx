import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsFetch } from "../../store/Posts";
import Post from "../Post/Post";
import "./posts.scss";

const Posts = () => {
  const { posts } = useSelector((state) => state.postsReducer.postsSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsFetch());
  }, [dispatch]);

  const deletePost = async (id) => {
    try {
      await axios.delete("http://localhost:8800/api/posts/" + id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="posts">
      {posts?.map((post) => (
        <Post
          post={post}
          deletePost={deletePost}
          key={post.id}
          dispatch={dispatch}
          getPostsFetch={getPostsFetch}
        />
      ))}
    </div>
  );
};

export default Posts;
