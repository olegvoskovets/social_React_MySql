import { configureStore, combineReducers } from "@reduxjs/toolkit";

import darkModeSlice from "./darkModeSlice";

import usersSlice from "./Users";
import authSlice from "./auth";
import { userApi } from "./services/UsersService";
import postsSlice from "./Posts.js";
import commentsSlice from "./Comments.js";
import friendsSlice from "./Friends.js";

const darkModeReducer = combineReducers({ darkModeSlice });
const usersReducer = combineReducers({
  usersSlice,
});
const authReducer = combineReducers({ authSlice });
const postsReducer = combineReducers({ postsSlice });
const commentsReducer = combineReducers({ commentsSlice });
const friendsReducer = combineReducers({ friendsSlice });

export const store = configureStore({
  reducer: {
    darkModeReducer,
    usersReducer,
    authReducer,
    [userApi.reducerPath]: userApi.reducer,
    postsReducer,
    commentsReducer,
    friendsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
