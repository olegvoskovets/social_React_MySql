import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DarkModeContaxt } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { toogle_darkMode } from "../../store/darkModeSlice";
import { logout, setCurrentUser, login } from "../../store/auth";

const Navbar = () => {
  // const { toggle, darkMode } = useContext(DarkModeContaxt);
  //const { currentUser } = useContext(AuthContext);
  const { currentUser } = useSelector((state) => state.authReducer.authSlice);
  const navigate = useNavigate();
  //console.log("currentUser ", currentUser);
  const dispatch = useDispatch();

  //redux tolkit
  const { darkMode } = useSelector(
    (state) => state.darkModeReducer.darkModeSlice
  );

  const handleDarkMode = () => {
    dispatch(toogle_darkMode());
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(login()); //треба переробити  це оновлення
    //dispatch(setCurrentUser(currentUser));
  };
  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="left">
        {/* <div className="logo">
          <img src="images/logo.png" alt="" />
        </div> */}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>Snake social</span>
        </Link>
        <HomeOutlinedIcon />
        {darkMode ? (
          //<WbSunnyOutlinedIcon onClick={toggle} />
          <WbSunnyOutlinedIcon onClick={handleDarkMode} />
        ) : (
          // <DarkModeOutlinedIcon onClick={toggle} />
          <DarkModeOutlinedIcon onClick={handleDarkMode} />
        )}

        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search ..." />
        </div>
      </div>
      <div className="right">
        <Link to="/game" style={{ textDecoration: "none" }}>
          <span className="game">Грати в SNAKE</span>
        </Link>
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          {currentUser ? (
            <>
              {currentUser.profilePic === null ? (
                <img src="./images/no_avatar_57.jpg" alt="" />
              ) : (
                <img src={"/upload/" + currentUser.profilePic} alt="" />
              )}

              <span>{currentUser?.name}</span>

              <button className="auth" onClick={handleLogOut}>
                <Link to={"/"}>
                  {" "}
                  <span className="auth_text">Вийти</span>
                </Link>
              </button>
            </>
          ) : (
            <>
              <img src="/images/no_avatar_57.jpg" alt="" />
              <span>Гість</span>
              <button className="auth " onClick={handleSignIn}>
                Ввійдіть
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
