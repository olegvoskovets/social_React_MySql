import "./home.scss";
import Reels from "../../components/Reels/Reels";
import Posts from "../../components/Posts/Posts";

const Home = () => {
  return (
    <div className="home">
      <div className="container_home">
        <Reels />
        <Posts />
      </div>
    </div>
  );
};

export default Home;
