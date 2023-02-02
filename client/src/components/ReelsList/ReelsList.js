import Reel from "../Reel/Reel";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./reelsList.scss";

const ReelsList = () => {
  return (
    <div className="reelsList">
      <span style={{ paddingLeft: "15px" }}></span>
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel /> <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <Reel />
      <div className="reelsList_btn">
        <div className="reelsList_back">
          <div className="arrow_btn">
            <ArrowBackIosIcon />
          </div>
        </div>
        <div className="reelsList_forvard">
          <div className="arrow_btn">
            <ArrowForwardIosIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelsList;
