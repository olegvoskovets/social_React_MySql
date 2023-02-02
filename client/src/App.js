import React, { useContext } from "react";
//import Game from "./components/Game/Game";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "./style.scss";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import LeftBar from "./components/LeftBar/LeftBar";
import RightBar from "./components/RightBar/RightBar";
import Profile from "./pages/Profile/Profile";
import { DarkModeContaxt } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { useSelector } from "react-redux";
import GamePage from "./pages/GamePage/GamePage";
import Friends from "./components/Friends/Friends";

const App = () => {
  //const{darkMode}=useContext(DarkModeContaxt)
  const darkMode = useSelector(
    (state) => state.darkModeReducer.darkModeSlice.darkMode
  );
  // const { currentUser } = useContext(AuthContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <LeftBar />

          <div style={{ width: "57%" }}>
            <Outlet />
          </div>

          <RightBar />
        </div>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/game",
          element: <GamePage />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "*",
          element: <div>Помилка</div>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
