import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsersFetch = createAsyncThunk(
  "users/getUsersFetch",
  async (_, thuncApi) => {
    try {
      const res = await axios.get("http://localhost:8800/api/users");
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити users");
    }
  }
);
export const getUser = createAsyncThunk(
  "users/getUser",
  async (id, thuncApi) => {
    try {
      const res = await axios.get("http://localhost:8800/api/users/" + id);
      // if (!res.statusText === "ok") throw new Error("Server Error!");
      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue("Не вдалось загрузити usera");
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (userId) => {
    try {
      const res = await axios.get(
        "http://localhost:8800/api/users/profile/" + userId
      );

      const data = res.data[0];

      return data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const fetchGameCount = createAsyncThunk(
  "gameCountWinner/fetchGameCount",
  async (_, thuncApi) => {
    try {
      const res = await axios.get("http://localhost:8800/api/games");
      // if (!res.ok) throw new Error("Server Error!");

      return await res.data;
    } catch (error) {
      return thuncApi.rejectWithValue(error.message);
    }
  }
);
export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  try {
    //console.log("user:-- ", user);
    const res = await axios.put("http://localhost:8800/api/users", user);
    return await res.data;
  } catch (error) {
    console.log(error);
  }
});
export const updateFile = createAsyncThunk(
  "users/updateFile",
  async (fileCover) => {
    if (fileCover) {
      try {
        let formData = new FormData();
        formData.append("file", fileCover);
        const res = await axios.post(
          `http://localhost:8800/api/upload`,
          formData
        );

        return res.data;
      } catch (error) {
        console.log("error: ", error);
      }
    }
  }
);

// const User = {
//   username: "",
//   email: "",
//   password: "",
//   name: "",
//   coverPic: "",
//   profilePic: "",
//   city: "",
//   website: "",
// };

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: null,
    file: null,
    gameCountWinner: [],
    userProfile: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersFetch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsersFetch.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getUsersFetch.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchGameCount.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGameCount.fulfilled, (state, action) => {
        state.gameCountWinner = action.payload;
        state.loading = false;
      })
      .addCase(fetchGameCount.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getUserProfile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // state.User = action.meta.arg;
        if (action.meta.arg) {
          localStorage.setItem("user", JSON.stringify(action.meta.arg));
        }

        state.loading = false;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(updateFile.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFile.fulfilled, (state, action) => {
        state.file = action.payload;
        state.loading = false;
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log("ap= ", action.payload);
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
