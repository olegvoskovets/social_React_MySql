import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentsPostFetch = createAsyncThunk(
  "comments/getCommentsPostFetch",
  async (post) => {
   // console.log("post : ", post);
    try {
      const res = await axios.get("http://localhost:8800/api/comments", post);
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return console.log(error);
    }
  }
);
export const getCommentsParams = createAsyncThunk(
  "comments/getCommentsParams",
  async (userId) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/comments/" + userId
      );

      const data = res.data;

      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: {},

    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsPostFetch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsPostFetch.fulfilled, (state, action) => {
        console.log("action: ", action);
        state.comments.action.payload.id = action.payload;
        state.loading = false;
      })
      .addCase(getCommentsPostFetch.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCommentsParams.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsParams.fulfilled, (state, action) => {
        console.log("action: ", action);
        // const postId = action.payload[0].postId;
        // console.log("POST ID: ", postId);
        state.comments = action.payload;
        state.loading = false;
      })
      .addCase(getCommentsParams.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;
