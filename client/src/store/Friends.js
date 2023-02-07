import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//=============друзі currentUsera
export const getAllFriendsUserId = createAsyncThunk(
  "friends/getAllFriendsUserId",
  async (userId, thuncApi) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/friends/list/" + userId
      );

      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити друзів");
    }
  }
);
//===========запити на друзів currentUsera
export const getAllFriendsUserIdRequests = createAsyncThunk(
  "friends/getAllFriendsUserIdRequests",
  async (userId, thuncApi) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/friends/requests/" + userId
      );

      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити запити на друзів");
    }
  }
);
export const getCommonFriends = createAsyncThunk(
  "friends/getCommonFriends",
  async (values) => {
    // console.log("value_getCommonFriends: ", { ...values });
    try {
      const res = await axios.post("http://localhost:8800/api/friends", values);

      return await res.data;
    } catch (error) {
      return console.log("Не вдалось загрузити спільних  друзів");
    }
  }
);
export const orFriends = createAsyncThunk(
  "friends/orFriends",
  async (values) => {
    // console.log("value_getCommonFriends: ", { ...values });
    try {
      const res = await axios.post(
        "http://localhost:8800/api/friends/or_friends",
        values
      );

      return await res.data;
    } catch (error) {
      return console.log("Не вдалось загрузити данні");
    }
  }
);

const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
    requests_friends: [],
    commonFriends: [],
    friend: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllFriendsUserId.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFriendsUserId.fulfilled, (state, action) => {
        state.friends = action.payload;
        state.loading = false;
      })
      .addCase(getAllFriendsUserId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllFriendsUserIdRequests.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFriendsUserIdRequests.fulfilled, (state, action) => {
        state.requests_friends = action.payload;
        state.loading = false;
      })
      .addCase(getAllFriendsUserIdRequests.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCommonFriends.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommonFriends.fulfilled, (state, action) => {
        // console.log("action payload typeof: ", typeof action.payload);
        typeof action.payload === "object"
          ? (state.commonFriends = action.payload)
          : (state.commonFriends = []);

        state.loading = false;
      })
      .addCase(getCommonFriends.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(orFriends.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orFriends.fulfilled, (state, action) => {
        // console.log("action payload typeof: ", typeof action.payload);
        state.friend = action.payload;
        state.loading = false;
      })
      .addCase(orFriends.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = friendsSlice.actions;
export default friendsSlice.reducer;
