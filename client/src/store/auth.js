import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (inputs) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    return console.log(error);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axios.post("http://localhost:8800/api/auth/logout");
    return res.data;
  } catch (error) {
    return console.log("ERROR: ", error);
  }
});

export const register = createAsyncThunk("auth/register", async (inputs) => {
  try {
    const res = await axios.post(
      "http://localhost:8800/api/auth/register",
      inputs
    );
    return res.data;
  } catch (error) {
    return console.log(error);
  }
});

const user = {
  username: "",
  email: "",
  password: "",
  name: "",
  coverPic: "",
  profilePic: "",
  city: "",
  website: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user,
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
  },
  reducers: {
    setCurrentUser(state, action) {
      if (action.payload === undefined) {
        state.currentUser = null;
      } else state.currentUser = action.payload;
      //localStorage.setItem("user", JSON.stringify(state.currentUser) || null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        action.payload
          ? localStorage.setItem("user", JSON.stringify(state.currentUser))
          : localStorage.removeItem("user");

        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {})
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        localStorage.removeItem("user");
        state.loading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {})
      .addCase(register.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {});
  },
});
export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
