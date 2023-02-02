import ReelsList from "../ReelsList/ReelsList";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import QueuePlayNextIcon from "@mui/icons-material/QueuePlayNext";
import "./reels.scss";

const Reels = () => {
  const handleClick = (e) => {
    //console.log(e.target);
  };
  return (
    <div className="reels">
      <div className="reels_navbar">
        <div className="reels_btn">
          <button className="reels_stories activ" onClick={handleClick}>
            <AutoStoriesIcon /> <span>Розповіді</span>
          </button>
          <button className="reels_reels" onClick={handleClick}>
            <SmartDisplayIcon /> <span> Reels</span>
          </button>
          <button className="reels-rooms" onClick={handleClick}>
            <QueuePlayNextIcon /> <span>Кімнати</span>
          </button>
        </div>
      </div>
      <ReelsList />
    </div>
  );
};

export default Reels;
