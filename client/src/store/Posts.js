import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPostsFetch = createAsyncThunk(
  "posts/getPostsFetch",
  async (_, thuncApi) => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts");
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити post");
    }
  }
);
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (values, thuncApi) => {
    try {
      const res = await axios.post("http://localhost:8800/api/posts", values);
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити post");
    }
  }
);
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ([values, postId], thuncApi) => {
    //console.log("postId API ", postId);
    try {
      const res = await axios.put(
        "http://localhost:8800/api/posts/" + postId,
        values
      );
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не змінити posts");
    }
  }
);
export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId, thuncApi) => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts/" + userId);

      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не змогли одержати пости");
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    userPosts: [],
    postMassege: "",
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsFetch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostsFetch.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(getPostsFetch.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(addPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.postMassege = action.payload;
        state.loading = false;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(updatePost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.postMassege = action.payload;
        state.loading = false;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserPosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
        state.loading = false;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = postsSlice.actions;
export default postsSlice.reducer;
